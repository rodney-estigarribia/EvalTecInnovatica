import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import ScreenLayout from '../../components/UI/ScreenLayout';
import StyledButton from '../../components/UI/StyledButton';
import EditProductForm from '../../components/Forms/EditProductForm';
import useProducts from '../../hooks/useProducts';

const EditProduct = ({navigation}) => {
  const {categoriesList, statusList} = useProducts();
  const {selectedProduct, isLoading, updateProductList, removeProductFromList} =
    useProducts();

  const backButtonHandler = () => {
    navigation.goBack();
  };

  const saveProductHandler = async updatedProduct => {
    await updateProductList({...selectedProduct, ...updatedProduct});
    navigation.goBack();
  };

  const deleteProductHandler = async id => {
    await removeProductFromList(id);
    navigation.navigate('Products');
  };

  return (
    <ScreenLayout isLoading={isLoading}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <StyledButton
            icon="chevron-back"
            iconSize={28}
            styles={styles.backButton}
            onPress={backButtonHandler}
          />
          <Text style={styles.heading}>Editar producto</Text>
        </View>

        <View style={styles.formContainer}>
          <EditProductForm
            initialValues={selectedProduct}
            categoriesList={categoriesList}
            statusList={statusList}
            onSubmit={saveProductHandler}
            onDelete={deleteProductHandler}
          />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 12,
  },
  backButton: {
    padding: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    flex: 1,
  },
});

export default EditProduct;
