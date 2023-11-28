import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import StyledButton from '../UI/StyledButton';
import StyledModal from '../UI/StyledModal';
import useAuth from '../../hooks/useAuth';

const UserProfile = () => {
  const navigation = useNavigation();
  const {isAuthenticated} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const {logoutUser} = useAuth();

  const userProfileHandler = useCallback(() => {
    if (isAuthenticated) {
      setModalVisible(true);
    } else {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  const cancelLogoutHandler = () => {
    setModalVisible(currState => !currState);
  };

  const logoutHandler = () => {
    setModalVisible(currState => !currState);
    logoutUser();
  };

  // useEffect(() => {
  //   if (!isAuthenticated && !modalVisible) {
  //     navigation.replace('Login');
  //   }
  // }, [isAuthenticated, modalVisible, navigation]);

  const modalContent = (
    <View style={styles.modalText}>
      <Text style={styles.title}>Cerrar sesión</Text>
      <Text style={styles.description}>
        ¿Está seguro de que desea cerrar sesión? Deberá iniciar sesión
        nuevamente para usar la aplicación.
      </Text>
    </View>
  );

  const modalActionButtons = (
    <View style={styles.modalActions}>
      <StyledButton
        type="secondary"
        label="Cancelar"
        onPress={cancelLogoutHandler}
      />
      <StyledButton
        type="primary"
        label="Cerrar sesión"
        onPress={logoutHandler}
      />
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <StyledButton
          icon="person"
          iconSize={32}
          iconColor="#B3DAFF"
          onPress={userProfileHandler}
        />
        <StyledModal
          isVisible={modalVisible}
          onCancel={cancelLogoutHandler}
          content={modalContent}
          actions={modalActionButtons}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,

    justifyContent: 'center',
    alignItems: 'center',

    padding: 8,

    borderRadius: 16,

    backgroundColor: '#EAF2FF',
  },
  modalText: {
    gap: 12,

    marginTop: 12,
    marginHorizontal: 12,

    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    textAlign: 'center',
    fontSize: 12,

    color: '#71727A',
  },
  modalActions: {
    gap: 20,
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 12,
    marginHorizontal: 12,
  },
});

export default UserProfile;
