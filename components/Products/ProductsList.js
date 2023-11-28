import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ProductCard from './ProductCard';
import LoadingOverlay from '../UI/LoadingOverlay';
import useProducts from '../../hooks/useProducts';

const ProductsList = ({productsList, isLoading}) => {
  const navigation = useNavigation();
  const {updateSelectedProduct} = useProducts();

  const productClickHandler = product => {
    updateSelectedProduct(product);
    navigation.navigate('ProductDetails');
  };

  const renderProductCards = ({item}) => (
    <ProductCard product={item} onPress={() => productClickHandler(item)} />
  );

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={productsList}
        renderItem={renderProductCards}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ProductsList;
