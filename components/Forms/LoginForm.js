import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import StyledButton from '../UI/StyledButton';
import FormItem from './FormItem';

const LoginForm = ({onSubmit}) => {
  const [inputs, setInputs] = useState({
    username: {value: '', isValid: true},
    password: {value: '', isValid: true},
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs(currInputValues => {
      return {
        ...currInputValues,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const submitHandler = () => {
    const loginData = {
      username: inputs.username.value,
      password: inputs.password.value,
    };

    const usernameIsValid = !!String(loginData.username);

    const passwordIsValid = loginData.password.length > 0;

    if (!usernameIsValid || !passwordIsValid) {
      setInputs(currInputs => {
        return {
          username: {
            value: currInputs.username.value,
            isValid: usernameIsValid,
          },
          password: {
            value: currInputs.password.value,
            isValid: passwordIsValid,
          },
        };
      });
      return;
    }

    onSubmit(loginData);
  };

  return (
    <View style={styles.container}>
      <FormItem
        identifier="username"
        value={inputs.username.value}
        invalid={!inputs.username.isValid}
        placeholder="Nombre de usuario"
        type="shortText"
        onChange={inputChangeHandler}
      />
      <FormItem
        identifier="password"
        value={inputs.password.value}
        invalid={!inputs.password.isValid}
        placeholder="Contraseña"
        type="password"
        onChange={inputChangeHandler}
      />

      <StyledButton
        label="Iniciar sesión"
        type="primary"
        styles={styles.loginButton}
        onPress={submitHandler}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  loginButton: {
    marginTop: 12,
  },
});
