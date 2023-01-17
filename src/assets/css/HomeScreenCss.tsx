'use strict';
import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const HomeScreenCss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: windowWidth / 2,
    height: windowHeight / 22,
  },
  containerList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: windowWidth / 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    width: windowWidth / 1.2,
    height: windowHeight / 2.8,
    marginTop: windowHeight / 30,
    flexDirection: 'column',
    borderRadius: windowHeight / 50,
  },
  orderIdPrintPlaceText: {
    fontWeight: 'bold',
    color: 'black',
  },
  orderDetailsPlace: {
    marginTop: windowHeight / 30,
    paddingBottom: windowHeight / 30,
  },
  orderDetailsOrderDateAndButtonsPlace: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: 'gray',
    padding: windowHeight / 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowHeight / 120,
    marginTop: windowHeight / 120,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonsText: {
    color: 'black',
    fontWeight: 'bold',
  },
  topRegionSize: {
    width: windowWidth,
  },
  bottomRegion: {
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRegionStyle: {
    width: windowWidth,
    height: windowHeight / 3,
    backgroundColor: '#b8cc1c',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  topRegionTextStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: windowHeight / 30,
  },
  topRegionTextPlace: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insideScrollViewParent: {
    backgroundColor: 'white',
    marginTop: -windowHeight / 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: windowHeight,
  },
  scrollViewContentContainer: {
    flex: 1,
    height: windowHeight,
    width: windowWidth / 1.1,
    zIndex: 3,
  },
  scrollViewContentContainerSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight,
    width: windowWidth / 1.1,
    zIndex: 3,
    marginBottom: windowHeight / 3,
  },
  scrollViewContentContainerNoOrder: {
    flex: 1,
    height: windowHeight,
    width: windowWidth / 1.1,
    zIndex: 3,
    marginBottom: windowHeight / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
