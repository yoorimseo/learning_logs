import React from 'react';
import styled, { css } from 'styled-components';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

import mainLogo from '../../assets/logo-hodu.png';
import checkboxIcon from '../../assets/check-box.svg';
import checFillkboxIcon from '../../assets/check-fill-box.svg';

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

const SContant = styled.div`
  max-width: 55.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 3.4rem 3.5rem 3.6rem;
  margin-top: -1.8rem;
  background-color: ${({ theme }) => theme.color.WHITE};
  border: 0.1rem solid ${({ theme }) => theme.color.LIGHT_GRAY};
  border-radius: ${({ theme }) => theme.borderRadius.BASE};
  text-align: left;
  z-index: 4;
`;

const SContId = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const SInput = styled(Input)`
  margin-bottom: 1.2rem;
`;

const SBtnCheck = styled(Button)`
  width: 40%;
  height: 5.53rem;
  margin: 0 0 1.2rem 1.2rem;
`;

const SInfoUser = styled.div`
  margin-top: 3.8rem;
`;

const SInputPhone = styled.div`
  display: flex;
  align-items: flex-end;

  div {
    label {
      font-size: 1.6rem;
      line-height: 2rem;
      color: ${({ theme }) => theme.color.GRAY};
    }

    select {
      width: 15.2rem;
      padding: 1.6rem 1.6rem;
      margin: 1rem 0 1.2rem 0;
      border: 0.1rem solid ${({ theme }) => theme.color.LIGHT_GRAY};
      border-radius: ${({ theme }) => theme.borderRadius.HALF_BASE};
      font-size: 1.6rem;
      line-height: 2rem;
      text-align: center;
    }
  }

  div:not(:last-child) {
    margin-right: 1.2rem;
  }
`;

const SInputEmail = styled.div`
  display: flex;
  align-items: flex-end;

  span {
    display: inline-block;
    margin: 0 1.1rem 2.8rem;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.MEDIUM};
    line-height: 2rem;
    color: ${({ theme }) => theme.color.GRAY};
  }
`;

const SAgreeToJoin = styled.div`
  margin-top: 3.4rem;

  img {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 1rem;
  }

  p {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSize.MEDIUM};
    color: ${({ theme }) => theme.color.GRAY};

    span {
      font-weight: 700;
      text-decoration: underline;
    }
  }
`;

const SBtnJoin = styled(Button)`
  margin-top: 3.4rem;
`;

function SignUp({ tabActive }) {
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
      <SContant>
        <SContId>
          <SInput
            labelText='아이디'
            id='userId'
          />
          <SBtnCheck text='중복확인' />
        </SContId>

        <SInput
          labelText='비밀번호'
          id='password'
        />

        <SInput
          labelText='비밀번호 재확인'
          id='confirmPassword'
        />

        <SInfoUser>
          <SInput
            labelText='이름'
            id='userName'
          />
          <SInputPhone>
            <div>
              <label htmlFor=''>휴대폰번호</label>
              <select
                id='phoneNumFirst'
                type='tel'
              >
                <option value='010'>010</option>
                <option value='011'>011</option>
                <option value='012'>012</option>
                <option value='013'>013</option>
                <option value='014'>014</option>
                <option value='015'>015</option>
                <option value='016'>016</option>
                <option value='017'>017</option>
                <option value='018'>018</option>
                <option value='019'>019</option>
              </select>
            </div>

            <SInput
              id='phoneNumMid'
              type='tel'
            />
            <SInput
              id='phoneNumlast'
              type='tel'
            />
          </SInputPhone>

          <SInputEmail>
            <SInput
              labelText='이메일'
              type='email'
              id='emailId'
            />
            <span>@</span>
            <SInput
              type='email'
              id='emailAddress'
            />
          </SInputEmail>
        </SInfoUser>
      </SContant>

      <SAgreeToJoin>
        <img
          src={checkboxIcon}
          alt=''
        />
        <p>
          호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에 대한 내용을 확인하였고 동의합니다.
        </p>
      </SAgreeToJoin>

      <SBtnJoin
        text='가입하기'
        disabled
      />
    </SContainer>
  );
}

export default SignUp;
