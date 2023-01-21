import React from 'react';
import styled, { css } from 'styled-components';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { IR } from '../../styles/Util';

import mainLogo from '../../assets/logo-hodu.png';

const SContainer = styled.div`
  margin: 0 auto;
  padding-top: 10rem;
  width: fit-content;
  text-align: center;
`;

const SLogo = styled.img`
  width: 23.8rem;
  height: 7.4rem;
  margin-bottom: 7rem;
`;

const SBtnTab = styled.button`
  padding: 2rem 7.75rem 3.8rem;
  border: 0.1rem solid ${({ theme }) => theme.color.LIGHT_GRAY};
  border-radius: ${({ theme }) => theme.borderRadius.BASE};
  background-color: ${({ theme }) => theme.color.LIGHT_GRAY};
  font-size: 18px;
  line-height: 22px;

  ${({ tabActive }) =>
    tabActive &&
    css`
      position: relative;
      border-right: 0;
      border-bottom: 0;
      border-radius: ${({ theme }) => theme.borderRadius.BASE} ${({ theme }) => theme.borderRadius.BASE} 0 0;
      background-color: ${({ theme }) => theme.color.WHITE};
      z-index: 4;
    `}
`;

const SContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 3.4rem 3.5rem 3.6rem;
  margin-top: -1.8rem;
  background-color: ${({ theme }) => theme.color.WHITE};
  border: 0.1rem solid ${({ theme }) => theme.color.LIGHT_GRAY};
  border-radius: ${({ theme }) => theme.borderRadius.BASE};
  z-index: 2;

  label {
    ${IR}
  }
`;

const SInput = styled(Input)`
  margin-top: 0.6rem;
`;

const SBtnLogin = styled(Button)`
  margin-top: 3.6rem;
`;

const SLinkCont = styled.div`
  margin-top: 3rem;
  color: ${({ theme }) => theme.color.DARK_GRAY};
  font-size: 1.6rem;
  line-height: 2rem;

  a:nth-child(2)::before {
    content: '|';
    margin: 0 1.4rem;
    cursor: default;
  }
`;

function Login({ tabActive }) {
  return (
    <SContainer>
      <SLogo
        src={mainLogo}
        alt='HODU'
      />
      <div>
        <SBtnTab tabActive>구매회원 로그인</SBtnTab>
        <SBtnTab>판매회원 로그인</SBtnTab>
      </div>
      <SContent>
        <label htmlFor='userId'>아이디</label>
        <Input
          type='text'
          id='userId'
          placeholder='아이디'
          noneBorder
        />
        <label htmlFor='userId'>비밀번호</label>
        <SInput
          type='text'
          id='password'
          placeholder='비밀번호'
          noneBorder
        />
        <SBtnLogin text='로그인' />
      </SContent>
      <SLinkCont>
        <a href='/'>회원가입</a>
        <a href='/'>비밀번호 찾기</a>
      </SLinkCont>
    </SContainer>
  );
}

export default Login;
