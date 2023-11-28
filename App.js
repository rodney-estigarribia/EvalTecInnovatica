import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthContextProvider from './store/auth-context';
import ProductsContextProvider from './store/products-context';

import useAuth from './hooks/useAuth';

import Products from './screens/Products';
import ProductDetails from './screens/Products/ProductDetails';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import EditProduct from './screens/Products/EditProduct';

const NativeStack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  const {isAuthenticated} = useAuth();

  const authStack = (
    <>
      <NativeStack.Screen component={Login} name="Login" />
      <NativeStack.Screen component={SignUp} name="SignUp" />
    </>
  );

  const baseAppStack = (
    <>
      <NativeStack.Screen component={Products} name="Products" />
      <NativeStack.Screen component={ProductDetails} name="ProductDetails" />
    </>
  );

  const authenticatedAppStack = (
    <>
      <NativeStack.Screen component={EditProduct} name="EditProduct" />
    </>
  );

  const unauthenticatedStack = (
    <>
      {authStack}
      {baseAppStack}
    </>
  );

  const authenticatedStack = (
    <>
      {baseAppStack}
      {authenticatedAppStack}
    </>
  );

  let navigationStack = unauthenticatedStack;
  if (isAuthenticated) {
    navigationStack = authenticatedStack;
  }

  return (
    <NavigationContainer>
      <NativeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {navigationStack}
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthContextProvider>
      <ProductsContextProvider>
        <AuthenticatedStack />
      </ProductsContextProvider>
    </AuthContextProvider>
  );
};

export default App;
