import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import StyledButton from '../UI/StyledButton';
import FormItem from './FormItem';

const SignupForm = ({onSubmit}) => {
  const [inputs, setInputs] = useState({
    name: {value: '', isValid: true},
    email: {value: '', isValid: true},
    username: {value: '', isValid: true},
    password1: {value: '', isValid: true},
    password2: {value: '', isValid: true},
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
    // Extract form data
    const signupData = {
      name: inputs.name.value,
      email: inputs.email.value,
      username: inputs.username.value,
      password1: inputs.password1.value,
      password2: inputs.password2.value,
    };

    // Validate form data
    const nameIsValid = !!String(signupData.name);

    const emailIsValid = !!String(signupData.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    const usernameIsValid = !!String(signupData.name);

    const password1IsValid = signupData.password1.length > 0;
    const password2IsValid =
      signupData.password2.length > 0 &&
      signupData.password1 === signupData.password2;

    if (
      !nameIsValid ||
      !emailIsValid ||
      !usernameIsValid ||
      !password1IsValid ||
      !password2IsValid
    ) {
      setInputs(currInputs => {
        return {
          name: {
            value: currInputs.name.value,
            isValid: nameIsValid,
          },
          email: {
            value: currInputs.email.value,
            isValid: emailIsValid,
          },
          username: {
            value: currInputs.username.value,
            isValid: usernameIsValid,
          },
          password1: {
            value: currInputs.password1.value,
            isValid: password1IsValid,
          },
          password2: {
            value: currInputs.password2.value,
            isValid: password2IsValid,
          },
        };
      });
      return;
    }

    // Forward validated data
    onSubmit(signupData);
  };

  return (
    <View style={styles.container}>
      <FormItem
        identifier="name"
        value={inputs.name.value}
        invalid={!inputs.name.isValid}
        label="Nombre"
        placeholder="Tu nombre"
        type="shortText"
        onChange={inputChangeHandler}
      />
      <FormItem
        identifier="email"
        value={inputs.email.value}
        invalid={!inputs.email.isValid}
        label="Correo"
        placeholder="nombre@correo.com"
        type="email"
        onChange={inputChangeHandler}
      />
      <FormItem
        identifier="username"
        value={inputs.username.value}
        invalid={!inputs.username.isValid}
        label="Nombre de usuario"
        placeholder="nombreApellido"
        type="shortText"
        onChange={inputChangeHandler}
      />
      <FormItem
        identifier="password1"
        value={inputs.password1.value}
        invalid={!inputs.password1.isValid}
        label="Contraseña"
        placeholder="Crea una contraseña"
        type="password"
        onChange={inputChangeHandler}
      />
      <FormItem
        identifier="password2"
        value={inputs.password2.value}
        invalid={!inputs.password2.isValid}
        type="password"
        placeholder="Confirma la contraseña"
        onChange={inputChangeHandler}
      />

      <StyledButton
        label="Registrarme"
        type="primary"
        onPress={submitHandler}
      />
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
