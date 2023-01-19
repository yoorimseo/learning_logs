import React from 'react';

import Navigation from '../../components/common/Navigation';
import Banner from '../../components/Banner';
import ProductList from '../../components/Product/ProductList';

function Home() {
  return (
    <div>
      <Navigation />
      <Banner />
      <ProductList />
      Home
    </div>
  );
}

export default Home;
