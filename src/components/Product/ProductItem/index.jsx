import React from 'react';
import styled from 'styled-components';

const SProductItem = styled.li`
  text-align: left;
  cursor: pointer;
`;

const SProductImg = styled.img`
  border: 0.1rem solid ${({ theme }) => theme.color.LIGHT_GRAY};
  border-radius: ${({ theme }) => theme.borderRadius.BASE};
`;

const SThemeTitle = styled.p`
  color: ${({ theme }) => theme.color.GRAY};
  font-size: 1.6rem;
  line-height: 2.2rem;
  margin-top: 1.6rem;
`;

const SProductTitle = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  font-size: 1.8rem;
  line-height: 2.2rem;
  margin-top: 1rem;
`;

const SPrice = styled.p`
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 3rem;
  margin-top: 1rem;
`;

const SMonetaryUnit = styled.span`
  margin-left: 0.2rem;
  font-size: 1.6rem;
  line-height: 2rem;
`;

function ProductItem({ img, theme, title, price }) {
  return (
    <SProductItem>
      <SProductImg
        src={img}
        alt={title}
      />
      <SThemeTitle>{theme}</SThemeTitle>
      <SProductTitle>{title}</SProductTitle>
      <SPrice>
        {price.toLocaleString()}
        <SMonetaryUnit>원</SMonetaryUnit>
      </SPrice>
    </SProductItem>
  );
}

export default ProductItem;
