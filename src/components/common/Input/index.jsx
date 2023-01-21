import React from 'react';
import styled, { css } from 'styled-components';

import { IR } from '../../../styles/Util';

const SLabel = styled.label`
  margin-bottom: 1rem;
  font-size: 1.6rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.color.GRAY};

  ${({ noneBorder }) =>
    noneBorder &&
    css`
      ${IR}
    `}
`;

const SInput = styled.input`
  width: 100%;
  padding: 1.7rem 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.color.LIGHT_GRAY};
  border-radius: ${({ theme }) => theme.borderRadius.HALF_BASE};
  font-size: 1.6rem;
  line-height: 2rem;

  ${({ noneBorder }) =>
    noneBorder &&
    css`
      padding-left: 0;
      border: none;
      border-bottom: 0.1rem solid ${({ theme }) => theme.color.LIGHT_GRAY};
      border-radius: 0;

      ::placeholder {
        font-size: 1.6rem;
        line-height: 2rem;
        color: ${({ theme }) => theme.color.GRAY};
      }
    `}
`;

function Input({ id, labelText, noneBorder, placeholder, ...rest }) {
  return (
    <>
      <SLabel
        htmlFor={id}
        noneBorder={noneBorder}
      >
        {labelText}
      </SLabel>
      <SInput
        id={id}
        type='text'
        noneBorder={noneBorder}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
}

export default Input;
