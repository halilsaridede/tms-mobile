import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView, 
  DrawerItemList,
} from '@react-navigation/drawer';
import {useAuth} from '../../AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {
  const [user, setUser] = useAuth();
  const logoutHandle = async () => {
    try {
      await axios
        .post(`${}/api/logout`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then(async response => {
          console.log(response);
        })
        .catch(function (error) {
          console.error(error.message);
        });
      await AsyncStorage.removeItem('@user');
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{padding: 50, marginLeft: -30}}>
        <TouchableOpacity onPress={logoutHandle}>
          <Text>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
