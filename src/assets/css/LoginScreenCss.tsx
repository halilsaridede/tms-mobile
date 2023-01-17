'use strict';
import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const LoginScreenCss = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212223',
  },
  containerOne: {
    flex: 1,
  },
  containerTwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerOneInsideContainerOne: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: windowWidth / 2.1,
    height: windowHeight / 21,
  },
  textStyle: {
    color: 'white',
    fontWeight: '500',
    fontSize: windowWidth / 22,
  },
  containerThree: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  master: {
    width: 150,
    height: 300,
  },
});
