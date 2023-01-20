import React from 'react';
import styled from 'styled-components';

import Navigation from '../../components/common/Navigation';
import Banner from '../../components/Banner';
import ProductList from '../../components/Product/ProductList';
import Footer from '../../components/common/Footer';

const SContainer = styled.div`
  min-height: calc(100% - 31.2rem);
`;

function Home() {
  return (
    <SContainer>
      <Navigation />
      <Banner />
      <ProductList />
      <Footer />
    </SContainer>
  );
}

export default Home;
