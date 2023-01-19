import React from 'react';
import styled from 'styled-components';

import ProductItem from '../ProductItem';
import dummyData from './dummyData';

const SContainer = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 8rem 32rem;
  gap: 7.8rem 7rem;
`;

function ProductList() {
  return (
    <SContainer>
      {dummyData.map((item) => (
        <ProductItem
          key={item.product_id}
          img={item.img}
          theme={item.theme}
          title={item.title}
          price={item.price}
        />
      ))}
    </SContainer>
  );
}

export default ProductList;
