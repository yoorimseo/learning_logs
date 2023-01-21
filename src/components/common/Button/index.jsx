import React from 'react';
import styled, { css } from 'styled-components';

const SBtn = styled.button`
  width: 100%;
  height: 6.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.HALF_BASE};
  background-color: ${({ theme }) => theme.color.GREEN};
  color: ${({ theme }) => theme.color.WHITE};
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.2rem;

  :hover {
    background-color: #1b9539;
  }

  :disabled {
    background-color: ${({ theme }) => theme.color.LIGHT_GRAY};
    cursor: default;
  }

  ${({ darkBtn }) =>
    darkBtn &&
    css`
      background-color: ${({ theme }) => theme.color.GRAY};

      :hover {
        background-color: #5a5a5a;
      }
    `}

  ${({ whiteBtn }) =>
    whiteBtn &&
    css`
      background-color: ${({ theme }) => theme.color.WHITE};
      border: 0.1rem solid ${({ theme }) => theme.color.LIGHT_GRAY};
      color: ${({ theme }) => theme.color.GRAY};

      :hover {
        background-color: ${({ theme }) => theme.color.WHITE};
        border-color: ${({ theme }) => theme.color.GRAY};
        color: ${({ theme }) => theme.color.BLACK};
      }
    `}

    ${({ tabBtn }) =>
    tabBtn &&
    css`
      border: none;
      border-bottom: 0.6rem solid ${({ theme }) => theme.color.GREEN};
      border-radius: 0%;
      background-color: ${({ theme }) => theme.color.WHITE};
      color: ${({ theme }) => theme.color.GREEN};

      :hover {
        border-color: #1b9539;
        background-color: ${({ theme }) => theme.color.WHITE};
        color: #1b9539;
      }

      :disabled {
        border-color: #e0e0e0;
        background-color: ${({ theme }) => theme.color.WHITE};
        color: ${({ theme }) => theme.color.GRAY};
        cursor: default;
      }
    `}
`;

const SImg = styled.img`
  width: 3.2rem;
`;

function Button({ text, disabled, darkBtn, whiteBtn, tabBtn, imgSrc }) {
  return (
    <SBtn
      type='button'
      disabled={disabled}
      darkBtn={darkBtn}
      whiteBtn={whiteBtn}
      tabBtn={tabBtn}
    >
      <SImg
        src={imgSrc}
        alt=''
      />
      {text}
    </SBtn>
  );
}

export default Button;
