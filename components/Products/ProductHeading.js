import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StyledChip from '../UI/StyledChip';

const ProductHeading = ({title, status, smallHeading}) => {
  return (
    <View style={styles.headingContainer}>
      <Text
        textBreakStrategy="simple"
        lineBreakStrategyIOS="standard"
        style={[styles.heading, smallHeading && styles.smallHeading]}>
        {title || '-'}
      </Text>
      <View style={styles.statusContainer}>
        <StyledChip type={status === 'DISPONIBLE' ? 'primary' : 'secondary'}>
          {status}
        </StyledChip>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',

    flex: 1,
  },
  smallHeading: {
    fontSize: 16,
  },
  statusContainer: {
    width: 100,
  },
});

export default ProductHeading;
