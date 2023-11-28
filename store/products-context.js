import React, {createContext, useCallback, useState} from 'react';

export const ProductsContext = createContext({
  products: [],
  categories: [],
  selectedProduct: null,

  updateProducts: products => {},
  updateCategories: categories => {},
  updateUserSelectedProduct: (id, title, status, category, images) => {},
  updateUserProductList: (id, title, status, category, images) => {},
  removeUserProductFromList: id => {},
});

const ProductsContextProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();

  const updateProducts = useCallback(productsList => {
    setProducts(productsList);
  }, []);

  const updateCategories = useCallback(categoriesList => {
    setCategories(categoriesList);
  }, []);

  const updateUserSelectedProduct = useCallback(
    (id, title, status, category, images) => {
      setSelectedProduct({
        id,
        title,
        status,
        category,
        images,
      });
    },
    [],
  );

  const updateUserProductList = useCallback(
    (id, title, status, category, images) => {
      updateUserSelectedProduct(id, title, status, category, images);

      setProducts(currState => {
        let updatedProductList = [...currState];

        const productIndex = currState.findIndex(product => product.id === id);

        const updatedProduct = {
          ...currState[productIndex],
          title,
          status,
          category,
          images,
        };

        updatedProductList[productIndex] = {...updatedProduct};

        return updatedProductList;
      });
    },
    [updateUserSelectedProduct],
  );

  const removeUserProductFromList = useCallback(id => {
    setProducts(currState => {
      let updatedProductList = [...currState];

      updatedProductList = currState.filter(product => product.id !== id);

      return updatedProductList;
    });
  }, []);

  const value = {
    productsList: products,
    categoriesList: categories,
    selectedProduct,

    updateProducts,
    updateCategories,
    updateUserSelectedProduct,
    updateUserProductList,
    removeUserProductFromList,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
