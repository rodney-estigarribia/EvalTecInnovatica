import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StyledChip from '../UI/StyledChip';

const CategorySection = ({hideHeading, category}) => {
  if (!category) {
    return null;
  }

  const heading = !hideHeading && (
    <Text style={styles.categoryHeading}>Categoría</Text>
  );

  return (
    <View style={styles.categoryContainer}>
      {heading}
      <StyledChip type="secondary" small={!!hideHeading}>
        {category}
      </StyledChip>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    gap: 8,

    alignItems: 'flex-start',
  },
  categoryHeading: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default CategorySection;
