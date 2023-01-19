import React from 'react';
import styled from 'styled-components';

import notFoundIcon from '../../assets/icon-404.png';

const SContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin: auto;
`;

const SIcon = styled.img`
  width: 27.6rem;
  height: 23.6rem;
  margin-right: 5rem;
`;

const SContent = styled.div`
  h2 {
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
  }

  p {
    margin-top: 2rem;
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }) => theme.color.GRAY};
  }
`;

const SButtons = styled.div`
  display: flex;
  gap: 0 1.4rem;
  margin-top: 4rem;

  button {
    width: 20rem;
    height: 6rem;
    border-radius: ${({ theme }) => theme.borderRadius.BASE};
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
  }

  button:nth-child(1) {
    background-color: ${({ theme }) => theme.color.GREEN};
    color: ${({ theme }) => theme.color.WHITE};
  }

  button:nth-child(2) {
    background-color: ${({ theme }) => theme.color.WHITE};
    border: 0.1rem solid ${({ theme }) => theme.color.LIGHT_GRAY};
    color: ${({ theme }) => theme.color.GRAY};
  }
`;

function NotFound() {
  return (
    <SContainer>
      <SIcon
        src={notFoundIcon}
        alt=''
      />
      <SContent>
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
          <br />웹 주소가 올바른지 확인해 주세요.
        </p>
        <SButtons>
          <button>메인으로</button>
          <button>이전 페이지</button>
        </SButtons>
      </SContent>
    </SContainer>
  );
}

export default NotFound;
