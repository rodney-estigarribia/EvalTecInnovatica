import React from 'react';
import {StyleSheet, Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingOverlay from './LoadingOverlay';

const ScreenLayout = ({children, styles: customStyles, isLoading}) => {
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={[styles.container, customStyles]}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 16,
    backgroundColor: '#FFF',
  },
});
