import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';

import { Icon } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface InputProps {
  placeholderText: string;
  keyboardTypeDefinition: string | undefined;
  secureTextEntryDefinition: boolean;
  passwordTextControl: boolean;
  onChangeTextHandle: any;
  valueText: string;
}

const Input: React.FC<InputProps> = ({
  placeholderText,
  keyboardTypeDefinition,
  secureTextEntryDefinition,
  passwordTextControl,
  onChangeTextHandle,
  valueText,
}: InputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={valueText}
        onChangeText={onChangeTextHandle}
        placeholder={placeholderText}
        keyboardType={keyboardTypeDefinition}
        secureTextEntry={secureTextEntryDefinition ? passwordVisible : null}
        autoCapitalize="none"
      />
      {passwordTextControl === true ? (
        <Icon
          name={passwordVisible ? "visibility" : "visibility-off"}
          color="gray"
          onPress={() => setPasswordVisible(!passwordVisible)}
          tvParallaxProperties={undefined}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 1.1,
    height: windowHeight / 22,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'gray',
    paddingLeft: 10,
    paddingRight: 5,
    backgroundColor: 'white',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    width: windowWidth / 1.2,
    height: windowHeight / 22,
  },
});

export default Input;
