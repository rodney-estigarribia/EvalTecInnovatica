import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import InputItem from './Items/InputItem';
import SelectItem from './Items/SelectItem';

const FormItem = ({
  label,
  placeholder,
  type,
  identifier,
  value,
  onChange,
  options,
  required,
  hideRequired,
  onKeyPress,
  invalid,
  data,
  disabled,
}) => {
  let inputConfig = {
    value: value,
    placeholder,
    onChangeText: text => {
      onChange(identifier, text);
    },
    onKeyPress,
  };
  let inputComponent = <></>;

  switch (type) {
    case 'password': {
      inputConfig = {
        ...inputConfig,
        secureTextEntry: true,
      };
      inputComponent = (
        <InputItem textInputConfig={inputConfig} isInvalid={invalid} />
      );

      break;
    }

    case 'email': {
      inputConfig = {
        ...inputConfig,
        textContentType: 'emailAddress',
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        autoComplete: 'email',
      };
      inputComponent = (
        <InputItem textInputConfig={inputConfig} isInvalid={invalid} />
      );

      break;
    }

    case 'shortText': {
      inputConfig = {
        ...inputConfig,
      };
      inputComponent = (
        <InputItem textInputConfig={inputConfig} isInvalid={invalid} />
      );

      break;
    }

    case 'select': {
      inputConfig = {
        ...inputConfig,
      };
      inputComponent = (
        <SelectItem data={data} {...inputConfig} disabled={disabled} />
      );
      break;
    }

    default:
      break;
  }

  const labelStyles = [styles.label];

  if (invalid) {
    labelStyles.push(styles.labelInvalid);
  }

  if (disabled) {
    inputConfig = {
      ...inputConfig,
      editable: false,
    };
  }

  return (
    <View style={styles.container}>
      {label && (
        <Text style={labelStyles}>
          {label}
          {required && (
            <Text>
              <Text style={styles.required}> *</Text>
            </Text>
          )}
        </Text>
      )}
      {inputComponent}
    </View>
  );
};

export default FormItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
  },
  labelInvalid: {
    color: 'red',
  },
  required: {
    color: 'red',
  },
});
