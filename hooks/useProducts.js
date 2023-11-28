import {useCallback, useContext, useState} from 'react';

import {AuthContext} from '../store/auth-context';

import {
  getProductList,
  getCategoriesList,
  updateProductApi,
  removeProductApi,
} from '../util/http';
import {ProductsContext} from '../store/products-context';

const statusList = ['DISPONIBLE', 'SIN STOCK'];

const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useContext(AuthContext);

  const {
    productsList,
    categoriesList,
    selectedProduct,
    updateProducts,
    updateCategories,
    updateUserSelectedProduct,
    updateUserProductList,
    removeUserProductFromList,
  } = useContext(ProductsContext);

  const getProducts = useCallback(
    async searchTerms => {
      setIsLoading(true);
      const productsListRsp = await getProductList(token, searchTerms);
      setIsLoading(false);

      updateProducts(productsListRsp);
    },
    [token, updateProducts],
  );

  const getCategories = useCallback(async () => {
    if (!categoriesList?.length) {
      setIsLoading(true);
      const categoriesListRsp = await getCategoriesList(token);
      setIsLoading(false);

      updateCategories(categoriesListRsp);
    }
  }, [token, categoriesList, updateCategories]);

  const updateSelectedProduct = userUpdatedProduct => {
    updateUserSelectedProduct(
      userUpdatedProduct.id,
      userUpdatedProduct.title,
      userUpdatedProduct.status,
      userUpdatedProduct.category,
      userUpdatedProduct.images,
    );
  };

  const updateProductList = async userUpdatedProduct => {
    setIsLoading(true);
    await updateProductApi(token, userUpdatedProduct);
    setIsLoading(false);

    updateUserProductList(
      userUpdatedProduct.id,
      userUpdatedProduct.title,
      userUpdatedProduct.status,
      userUpdatedProduct.category,
      userUpdatedProduct.images,
    );
  };

  const removeProductFromList = async id => {
    setIsLoading(true);
    await removeProductApi(token, id);
    setIsLoading(false);

    removeUserProductFromList(id);
  };

  return {
    isLoading,
    productsList,
    categoriesList,
    statusList,
    selectedProduct,

    getProducts,
    getCategories,
    updateSelectedProduct,
    updateProductList,
    removeProductFromList,
  };
};

export default useProducts;
