import {ActivityIndicator, Dimensions, Image, View} from 'react-native';
import React from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Logo from '../../assets/images/logosplash.png';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#041e3f',
      }}>
      <Image
        style={{
          width: windowWidth / 2,
          height: windowHeight / 18,
        }}
        source={Logo}
      />
    </View>
  );
};

export default SplashScreen;
