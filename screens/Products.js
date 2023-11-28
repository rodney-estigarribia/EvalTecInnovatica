import React, {useCallback, useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import ScreenLayout from '../components/UI/ScreenLayout';
import ProductsList from '../components/Products/ProductsList';
import SearchProductsForm from '../components/Forms/SearchProductsForm';
import UserProfile from '../components/Authentication/UserProfile';

import useProducts from '../hooks/useProducts';

const Products = () => {
  const {
    productsList,
    categoriesList,
    statusList,
    isLoading,
    getProducts,
    getCategories,
  } = useProducts();

  const filterHandler = useCallback(
    searchTerms => {
      getProducts(searchTerms);
    },
    [getProducts],
  );

  const refreshProductsList = useCallback(() => {
    getProducts();
  }, [getProducts]);

  const refreshCategoriesList = useCallback(() => {
    getCategories();
  }, [getCategories]);

  useLayoutEffect(() => {
    refreshProductsList();
    refreshCategoriesList();
  }, [refreshProductsList, refreshCategoriesList]);

  return (
    <ScreenLayout>
      <View style={styles.screen}>
        <View style={styles.header}>
          <UserProfile />
        </View>

        <SearchProductsForm
          onSubmit={filterHandler}
          categoriesList={categoriesList}
          statusList={statusList}
        />

        <ProductsList productsList={productsList} isLoading={isLoading} />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 18,
  },
  header: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default Products;
