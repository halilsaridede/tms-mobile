import {Dimensions, Text, View} from 'react-native';
import React from 'react';
import HelpScreen from '../screens/VehicleScreens/HelpScreen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HelpView = ({content}) => {
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
            {content}
      </View>
    </View>
  );
};

export default HelpView;
