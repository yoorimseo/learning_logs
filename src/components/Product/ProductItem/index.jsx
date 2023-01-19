import React from 'react';
import styled from 'styled-components';

const SProductItem = styled.button`
  text-align: left;
`;

const SProductImg = styled.img`
  width: 38rem;
  height: 38rem;
  border: 1px solid ${({ theme }) => theme.color.LIGHT_GRAY};
  border-radius: ${({ theme }) => theme.borderRadius.BASE};
`;

const SThemeTitle = styled.p`
  color: ${({ theme }) => theme.color.GRAY};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin-top: 1.6rem;
`;

const SProductTitle = styled.p`
  font-family: 'SpoqaHanSansNeo-Regular';
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  margin-top: 1rem;
`;

const SPrice = styled.p`
  font-family: 'SpoqaHanSansNeo-Regular';
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  margin-top: 1rem;
`;

const SMonetaryUnit = styled.span`
  font-family: 'SpoqaHanSansNeo-Regular';
  margin-left: 0.2rem;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
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
