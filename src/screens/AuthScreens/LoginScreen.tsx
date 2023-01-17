import React, { useState } from 'react';
import { Text, View, Image, Dimensions, Alert } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Input from '../../components/Input';
import CustomizeButton from '../../components/CustomizeButton';
import Logo from '../../assets/images/logo.png';
import Master from '../../assets/images/master.png';
import { useAuth } from '../../../AuthContext';

import { LoginScreenCss } from '../../assets/css/LoginScreenCss';
import { loginHandler } from '../../utils/FunctionForAxios';
import { Icon } from 'react-native-elements';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [_, setUser] = useAuth();
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [userType, setUserType] = useState();

  const loginHandle = async () => {
    if (userType == undefined) {
      Alert.alert('Uyarı', 'Kullanıcı türü seçiniz', [{ text: 'Tamam' }]);
      return;
    } else if (email == '' || password == '') {
      Alert.alert('Uyarı', 'Email ve şifre alanlarını doldurunuz', [{ text: 'Tamam' }]);
      return;
    } else {
      loginHandler({ email, password, setIsLoading, setUser, userType });
      setIsLoading(true);
    }
  };

  const checkBoxHandler = () => {
    if (checked == false) {
      setChecked(true);
      setChecked2(false);
      setUserType('Driver');
    } else {
      setChecked(false);
    }
  };

  const checkBoxHandler2 = () => {
    if (checked2 == false) {
      setChecked2(true);
      setChecked(false);
      setUserType('Dealer');
    } else {
      setChecked2(false);
    }
  };

  return (
    <View style={LoginScreenCss.container}>
      <View style={LoginScreenCss.containerOne}>
        <View style={{ flex: 1 }} />
        <View style={LoginScreenCss.containerOneInsideContainerOne}>
          <Image style={LoginScreenCss.logo} source={Logo} />
          <Text style={LoginScreenCss.textStyle}>TMS</Text>
          <Text style={LoginScreenCss.textStyle}>Otomasyon Uygulaması</Text>
        </View>
      </View>
      <View style={LoginScreenCss.containerTwo}>
        <Input
          placeholderText={'Email'}
          keyboardTypeDefinition={'email-address'}
          secureTextEntryDefinition={false}
          passwordTextControl={false}
          onChangeTextHandle={setEmail}
          valueText={email}
        />
        <Input
          placeholderText={'Şifre'}
          secureTextEntryDefinition={true}
          keyboardTypeDefinition={undefined}
          passwordTextControl={true}
          onChangeTextHandle={setPassword}
          valueText={password}
        />
        <View
          style={{
            flex: 1,
            width: windowWidth / 1.2,
            height: windowHeight / 2,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
            Kullanıcı Türü :{' '}
          </Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              marginRight: 10,
            }}>Sürücü</Text>
            <Icon 
              name={checked ? "radio-button-checked" : "radio-button-unchecked"}
              color={checked ? "#FFD700" : "white"}
              size={20}
              onPress={checkBoxHandler} 
              tvParallaxProperties={undefined}            
            />
          </View>
          <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              marginRight: 10,
              marginLeft: 10,
            }}>Bayi</Text>
            <Icon
              name={checked2 ? "radio-button-checked" : "radio-button-unchecked"}
              color={checked2 ? "#FFD700" : "white"}
              size={20}
              onPress={checkBoxHandler2}
              tvParallaxProperties={undefined}
            />
          </View>
          </View>
        </View>
        <CustomizeButton
          insideText={'Giriş Yap'}
          onPressHandle={loginHandle}
        />
      </View>
      <View style={LoginScreenCss.containerThree}>
        <Image style={LoginScreenCss.master} source={Master} />
      </View>
    </View>
  );
};

export default LoginScreen;
