import {Dimensions, Text, View} from 'react-native';
import React from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HelpScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          marginLeft: windowWidth / 10,
          marginRight: windowWidth / 10,
        }}>
        <Text style={{fontWeight: 'bold'}}>
          Sipariş listesinde sipariş sırasını nasıl
        </Text>
        <Text style={{fontWeight: 'bold'}}>değiştirebilirim ?</Text>
        <Text style={{marginTop: 10}}>
          Sipariş sırasını değiştirmek için sipariş listesindeki siparişin
          üzerine basılı tutun ve istediğiniz yere sürükleyin.
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          marginLeft: windowWidth / 10,
          marginRight: windowWidth / 10,
        }}>
        <Text style={{fontWeight: 'bold'}}>Siparişi nasıl silebilirim ?</Text>
        <Text style={{marginTop: 10}}>
          Sipariş listesi ekranındaki siparişi sil butonuna tıkladığınızda size
          siparişi silmek istediğinize dair bir uyarı gelecektir. Sil butonuna
          tıkladığınızda sipariş silinir.
        </Text>
      </View>
    </View>
  );
};

export default HelpScreen;
