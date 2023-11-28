import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StyledChip = ({type = 'primary', small, children}) => {
  let containerStyles = styles.chipPrimary;
  let contentStyles = styles.contentPrimary;

  if (type !== 'primary') {
    containerStyles = styles.chipSecondary;
    contentStyles = styles.contentSecondary;
  }

  return (
    <View style={[styles.chipContainer, containerStyles]}>
      <Text style={[styles.baseText, contentStyles, small && styles.smallText]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    alignItems: 'center',

    paddingVertical: 6,
    paddingHorizontal: 8,

    borderRadius: 12,
  },
  chipPrimary: {
    backgroundColor: '#006FFD',
  },
  chipSecondary: {
    backgroundColor: '#EAF2FF',
  },
  contentPrimary: {
    color: '#FFFFFF',
  },
  contentSecondary: {
    color: '#006FFD',
  },
  baseText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 10,
  },
});

export default StyledChip;
