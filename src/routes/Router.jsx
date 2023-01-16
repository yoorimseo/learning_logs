import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Splash from '../pages/SplashPage';
import SignUp from '../pages/SignUpPage';
import Login from '../pages/LoginPage';
import Home from '../pages/HomePage';
import Cart from '../pages/CartPage';
import ProductList from '../pages/ProductListPage';
import ProductDetail from '../pages/ProductDetailPage';
import NotFound from '../pages/NotFoundPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Splash />}
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/home'
          element={<Home />}
        />
        <Route
          path='/products'
          element={<ProductList />}
        />
        <Route
          path='/detail'
          element={<ProductDetail />}
        />
        <Route
          path='/cart'
          element={<Cart />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
