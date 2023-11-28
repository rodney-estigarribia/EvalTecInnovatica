import axios from 'axios';

const BACKEND_URL = 'https://dummyjson.com/';

const parseErrorMessage = (origin, error, alternativeMessage) => {
  const parsedError =
    error?.message ||
    error ||
    alternativeMessage ||
    'Disculpe las molestias, si el problema persiste por favor contacte con nosotros.';
  return {
    error: `${origin}. ${parsedError}`,
  };
};

export const loginUserApi = async loginData => {
  try {
    const response = await axios.post(BACKEND_URL + 'auth/login', loginData);

    const responseData = response.data;
    if (!responseData?.token) {
      throw Error('Hubo un problema al iniciar sesión');
    }

    const userToken = responseData.token;

    return userToken;
  } catch (error) {
    const parsedError = parseErrorMessage(
      'Hubo un problema al iniciar su sesión. Verifique sus datos e intente de nuevo.',
      error,
    );

    console.error('error loginUserApi', error);
    return parsedError;
  }
};

export const addUserApi = async signupData => {
  try {
    const response = await axios.post(BACKEND_URL + 'users/add', signupData);

    const userData = response.data;

    if (!userData?.id) {
      throw Error('Hubo un problema al crear tu cuenta');
    }

    return null;
  } catch (error) {
    const parsedError = parseErrorMessage(
      'Hubo un problema al registrar su cuenta. Verifique sus datos e intente de nuevo.',
      error,
    );

    console.error('error addUserApi', error);
    return parsedError;
  }
};

export const getProductList = async (token, searchTerms) => {
  const isAuthenticatedUser = !!token;

  let url = 'products';
  const searchParams = {limit: 100};
  if (searchTerms?.search) {
    url += '/search';
    searchParams.q = searchTerms.search.toLowerCase();
  }

  if (searchTerms?.category) {
    url = 'products/category/' + searchTerms.category.toLowerCase();
  }

  try {
    const response = await axios({
      method: 'GET',
      baseURL: BACKEND_URL,
      headers: {Authorization: `Bearer ${token}`},
      params: searchParams,
      url: url,
    });

    const rawProductsList = response.data?.products;

    if (!rawProductsList) {
      throw null;
    }

    let productList = rawProductsList.map(rawProduct => {
      const product = {
        id: rawProduct.id,
        status: rawProduct?.stock > 50 ? 'DISPONIBLE' : 'SIN STOCK',
        title: rawProduct.title,
      };

      if (isAuthenticatedUser) {
        product.category = rawProduct.category.toUpperCase();
        product.images = rawProduct.images;
      }
      return product;
    });

    if (searchTerms?.status) {
      productList = productList.filter(
        product => product.status === searchTerms.status,
      );
    }

    return productList;
  } catch (error) {
    const parsedError = parseErrorMessage(
      'Hubo un problema al obtener los datos de su perfil',
      error,
    );

    return parsedError;
  }
};

export const getCategoriesList = async token => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: BACKEND_URL,
      headers: {Authorization: `Bearer ${token}`},
      url: 'products/categories',
    });

    const rawProductsList = response.data;

    if (!rawProductsList?.length) {
      throw null;
    }

    return rawProductsList;
  } catch (error) {
    const parsedError = parseErrorMessage(
      'Hubo un problema al obtener la lista de categories',
      error,
    );

    return parsedError;
  }
};

export const updateProductApi = async (token, updatedProduct) => {
  try {
    const response = await axios({
      method: 'PUT',
      baseURL: BACKEND_URL,
      headers: {Authorization: `Bearer ${token}`},
      data: {...updatedProduct},
      url: `products/${updatedProduct.id}`,
    });

    const rawProduct = response.data;

    return rawProduct;
  } catch (error) {
    const parsedError = parseErrorMessage(
      'Hubo un problema al actualizar el producto',
      error,
    );

    return parsedError;
  }
};

export const removeProductApi = async (token, updatedProduct) => {
  try {
    const response = await axios({
      method: 'DELETE',
      baseURL: BACKEND_URL,
      headers: {Authorization: `Bearer ${token}`},
      url: `products/${updatedProduct.id}`,
    });

    const rawProduct = response.data;

    return rawProduct;
  } catch (error) {
    const parsedError = parseErrorMessage(
      'Hubo un problema al eliminar el producto',
      error,
    );

    return parsedError;
  }
};
