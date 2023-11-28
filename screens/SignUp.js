import React from 'react';
import ScreenLayout from '../components/UI/ScreenLayout';
import {StyleSheet, Text, View} from 'react-native';
import SignupForm from '../components/Forms/SignupForm';
import useAuth from '../hooks/useAuth';

const SignUp = ({navigation}) => {
  const {createUser, isAuthenticating} = useAuth();

  const signupFormHandler = async userData => {
    await createUser(
      userData.name,
      userData.email,
      userData.username,
      userData.password1,
    );

    navigation.navigate('Login');
  };

  return (
    <ScreenLayout isLoading={isAuthenticating}>
      <View style={styles.screen}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Registrarse</Text>
          <Text style={styles.subHeading}>Crea una cuenta para iniciar</Text>
        </View>
        <View style={styles.formContainer}>
          <SignupForm onSubmit={signupFormHandler} />
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 18,
  },
  headingContainer: {
    gap: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subHeading: {
    fontSize: 16,
    color: 'gray',
  },
});

export default SignUp;
