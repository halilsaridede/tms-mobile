'use strict';
import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const OrderUpdateScreenCss = StyleSheet.create({
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
  logo: {
    width: windowWidth / 2,
    height: windowHeight / 22,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },
  detailBox: {
    width: windowWidth / 2,
    height: windowHeight / 8,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  sideBox: {
    width: windowWidth / 2,
    height: windowHeight / 8,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
  },
  imageForCameraIconPhoto: {
    width: windowWidth / 6,
    height: windowHeight / 14,
  },
  imageForRealPhoto: {
    width: windowWidth / 2,
    height: windowHeight / 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    width: windowWidth / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOpen: {
    backgroundColor: '#b8cc1c',
  },
  buttonClose: {
    backgroundColor: '#b8cc1c',
  },
  modalText: {
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});
