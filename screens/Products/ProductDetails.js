import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

const productPlaceholder = require('../../assets/images/product-placeholder.png');

import ScreenLayout from '../../components/UI/ScreenLayout';
import StyledButton from '../../components/UI/StyledButton';
import ProductHeading from '../../components/Products/ProductHeading';
import CategorySection from '../../components/Products/CategorySection';
import useProducts from '../../hooks/useProducts';
import useAuth from '../../hooks/useAuth';

const ProductDetails = ({navigation}) => {
  const [imageSliderWidth, setImageSliderWidth] = useState();
  const {selectedProduct} = useProducts();
  const {isAuthenticated} = useAuth();

  const backButtonHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const sliderLayoutHandler = event => {
    const parentWidth = event?.nativeEvent?.layout?.width;
    setImageSliderWidth(parentWidth);
  };

  const editProductButtonHandler = useCallback(() => {
    navigation.navigate('EditProduct');
  }, [navigation]);

  const imageSection = selectedProduct?.images?.length ? (
    <SliderBox
      parentWidth={imageSliderWidth}
      sliderBoxHeight={300}
      images={selectedProduct.images}
    />
  ) : (
    <Image
      source={productPlaceholder}
      style={styles.placeholder}
      resizeMode="cover"
    />
  );

  const editProductSection = isAuthenticated && (
    <View>
      <StyledButton
        label="Editar producto"
        type="primary"
        onPress={editProductButtonHandler}
      />
    </View>
  );

  return (
    <ScreenLayout styles={styles.screen}>
      <View style={styles.header}>
        <StyledButton
          icon="chevron-back"
          iconSize={28}
          styles={styles.backButton}
          onPress={backButtonHandler}
        />
      </View>
      <View style={styles.imageContainer} onLayout={sliderLayoutHandler}>
        {imageSection}
      </View>
      <View style={styles.content}>
        <View style={styles.main}>
          <ProductHeading
            title={selectedProduct?.title}
            status={selectedProduct?.status}
          />

          <CategorySection category={selectedProduct?.category} />
        </View>

        {editProductSection}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 12,
    width: '100%',
    alignItems: 'flex-start',

    zIndex: 1,
  },
  backButton: {
    padding: 12,
  },
  imageContainer: {
    marginTop: -52,
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  placeholder: {
    width: '100%',
    height: 300,
  },
  content: {
    flex: 1,

    marginTop: 20,

    justifyContent: 'space-between',
  },
  main: {
    gap: 20,
  },
});

export default ProductDetails;
