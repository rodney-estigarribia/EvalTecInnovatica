import React from 'react';
import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const SelectItem = ({data, value, onChangeText, placeholder, disabled}) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={selectedItem => {
        onChangeText(selectedItem);
      }}
      defaultValue={value}
      defaultButtonText={placeholder}
      disabled={disabled}
      buttonStyle={styles.buttonStyle}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
  },
});

export default SelectItem;
