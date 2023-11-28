import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';

import ProductHeading from './ProductHeading';
import CategorySection from './CategorySection';

const productPlaceholder = require('../../assets/images/product-placeholder.png');

const ProductCard = ({product, onPress}) => {
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    const productImageSource = product?.images?.length
      ? {uri: product.images[0]}
      : productPlaceholder;

    setImageSource(productImageSource);
  }, [product]);

  const imageErrorHandler = () => {
    setImageSource(productPlaceholder);
  };

  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.image}
            onError={imageErrorHandler}
          />
        </View>

        <View style={styles.detailsContainer}>
          <ProductHeading
            title={product.title}
            status={product?.status}
            smallHeading
          />

          <CategorySection hideHeading category={product?.category} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,

    marginVertical: 5,

    paddingVertical: 20,

    borderBottomColor: '#D4D6DD',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  content: {
    flex: 1,
    flexDirection: 'row',

    backgroundColor: '#FFF',
    borderRadius: 16,
  },
  imageContainer: {
    width: 100,

    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  image: {
    width: 100,
    height: 100,

    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  detailsContainer: {
    flex: 1,
    gap: 14,

    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default ProductCard;
