import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomizeModal = ({
  inputText,
  onChangeTextInput,
  isModalVisible,
  setModalVisible,
  verificationCodeHandler,
}) => {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(249, 246, 245, 0.8)',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Doğrulama Kodu
          </Text>
          <TextInput
            style={{
              width: windowWidth * 0.7,
              height: windowHeight * 0.05,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'gray',
              marginBottom: 5,
              paddingLeft: 5,
            }}
            keyboardType="numeric"
            maxLength={6}
            placeholder="Doğrulama kodu giriniz"
            value={inputText}
            onChangeText={onChangeTextInput}
          />
          <TouchableOpacity
            onPress={verificationCodeHandler}
            style={{
              width: windowWidth * 0.2,
              height: windowHeight * 0.03,
              backgroundColor: '#b8cc1c',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginBottom: 5,
            }}>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
              Doğrula
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleModal}
            style={{
              width: windowWidth * 0.2,
              height: windowHeight * 0.03,
              backgroundColor: '#b8cc1c',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
              Kapat
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212223',
  },
  containerOne: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTwo: {
    flex: 10,
  },
});

export default CustomizeModal;
