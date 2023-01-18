import React from 'react';
import styled from 'styled-components';

import mainLogo from '../assets/logo-hodu.png';
import searchIcon from '../assets/icon-search.png';
import cartIcon from '../assets/icon-shopping-cart.svg';
import userIcon from '../assets/icon-user.svg';

const SNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.6rem 3.2rem;
`;

const SLeftCont = styled.div`
  display: flex;
  align-items: center;
`;

const SLogo = styled.img`
  width: 12.4rem;
  height: 3.8rem;
  margin-right: 3rem;
`;

const SSearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40rem;
  height: 4.6rem;
  padding: 1.3rem 2.2rem;
  border-radius: 5rem;
  border: 0.2rem solid ${({ theme }) => theme.color.GREEN};
  background-color: ${({ theme }) => theme.color.WHITE};
`;

const SInput = styled.input`
  width: 85%;
  border: none;
`;

const SBtnSearch = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  background: url(${searchIcon});
  background-size: contain;
`;

const SRightCont = styled.div`
  display: flex;
  gap: 2.6rem;
`;

const SBtns = styled.button`
  text-align: center;
`;

const SIcon = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  margin-bottom: 0.4rem;
`;

const SText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.X_SMALL};
  color: ${({ theme }) => theme.color.GRAY};
`;

function Navigation() {
  return (
    <>
      <SNav>
        <SLeftCont>
          <SLogo
            src={mainLogo}
            alt='HODU'
          />
          <SSearchBar>
            <SInput
              type='text'
              placeholder='상품을 검색해보세요!'
            />
            <SBtnSearch type='submit'></SBtnSearch>
          </SSearchBar>
        </SLeftCont>
        <SRightCont>
          <SBtns>
            <SIcon
              src={cartIcon}
              alt='장바구니'
            />
            <SText>장바구니</SText>
          </SBtns>
          <SBtns>
            <SIcon
              src={userIcon}
              alt='로그인'
            />
            <SText>로그인</SText>
          </SBtns>
        </SRightCont>
      </SNav>
    </>
  );
}

export default Navigation;
