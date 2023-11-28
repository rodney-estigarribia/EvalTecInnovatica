import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const InputItem = ({textInputConfig, isInvalid}) => {
  const inputStyles = [styles.input];

  if (isInvalid) {
    inputStyles.push(styles.inputInvalid);
  }

  return <TextInput style={inputStyles} {...textInputConfig} />;
};

export default InputItem;

const styles = StyleSheet.create({
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,

    color: '#000',
    fontSize: 14,

    width: '100%',

    borderRadius: 12,

    borderColor: '#C5C6CC',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  inputInvalid: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
