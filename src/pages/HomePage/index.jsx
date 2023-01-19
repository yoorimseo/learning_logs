import React from 'react';

import Navigation from '../../components/common/Navigation';
import Banner from '../../components/Banner';
import ProductList from '../../components/Product/ProductList';
import Footer from '../../components/common/Footer';

function Home() {
  return (
    <div>
      <Navigation />
      <Banner />
      <ProductList />
      <Footer />
    </div>
  );
}

export default Home;
