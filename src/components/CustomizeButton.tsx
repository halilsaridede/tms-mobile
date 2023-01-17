import React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Text} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface CustomizeButtonProps {
  insideText: string;
  onPressHandle: any;
}

const CustomizeButton: React.FC<CustomizeButtonProps> = ({
  insideText,
  onPressHandle,
}: CustomizeButtonProps) => {
  return (
    <TouchableOpacity onPress={onPressHandle} style={styles.container}>
      <Text style={styles.textStyle}>{insideText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 2,
    height: windowHeight / 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'gray',
    paddingLeft: 10,
    backgroundColor: '#b8cc1c',
    margin: 10,
  },
  textStyle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#212223',
  },
});

export default CustomizeButton;
