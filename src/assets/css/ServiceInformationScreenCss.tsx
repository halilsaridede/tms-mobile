'use strict';
import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ServiceInformationScreenCss = StyleSheet.create({
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    width: windowWidth / 1.2,
    height: windowHeight / 3,
    marginTop: 5,
    padding: 20,
    flexDirection: 'column',
  },
  orderIdPrintPlace: {
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  orderIdPrintPlaceText: {
    fontWeight: 'bold',
    color: 'black',
  },
  orderDetailsPlace: {
    marginTop: 5,
    paddingBottom: 20,
  },
  orderDetailsOrderDateAndButtonsPlace: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: 'gray',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 5,
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
    height: windowHeight / 20,
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
    paddingLeft: 20,
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
  },
  scrollViewContentContainer: {
    flex: 1,
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
