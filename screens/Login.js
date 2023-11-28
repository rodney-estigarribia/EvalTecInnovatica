import React from 'react';
import ScreenLayout from '../components/UI/ScreenLayout';
import {Image, StyleSheet, Text, View} from 'react-native';
import StyledButton from '../components/UI/StyledButton';
import LoginForm from '../components/Forms/LoginForm';
import useAuth from '../hooks/useAuth';

const HeroImage = require('../assets/images/innovatica.png');

const Login = ({navigation}) => {
  const {loginUser, isAuthenticating} = useAuth();

  const loginHandler = loginData => {
    loginUser(loginData.username, loginData.password);
  };

  const exploreAppButtonHandler = () => {
    navigation.navigate('Products');
  };

  const signUpButtonHandler = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScreenLayout isLoading={isAuthenticating}>
      <View style={styles.imageContainer}>
        <Image source={HeroImage} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.loginFormContainer}>
        <Text style={styles.heading}>Bienvenido!</Text>

        <LoginForm onSubmit={loginHandler} />

        <View style={styles.signupContainer}>
          <Text>Todavia no formas parte?</Text>
          <StyledButton
            label="Registrate ahora"
            type="link"
            onPress={signUpButtonHandler}
          />
        </View>
      </View>

      <View style={styles.exploreButton}>
        <StyledButton
          label="Explorar sin cuenta de usuario"
          type="secondary"
          onPress={exploreAppButtonHandler}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 300,
  },
  loginFormContainer: {
    marginVertical: 20,
    gap: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
    gap: 5,
  },
  exploreButton: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Login;
