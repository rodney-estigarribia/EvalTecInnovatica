import React from 'react';
import {StyleSheet, ActivityIndicator, View, Text} from 'react-native';

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cargando contenido...</Text>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    padding: 24,

    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 16,

    color: '#000',

    marginBottom: 12,
  },
});
