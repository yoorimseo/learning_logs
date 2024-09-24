import React from 'react';
import styled from 'styled-components';

import { IR } from '../../styles/Util';

import leftSwiperIcon from '../../assets/icon-swiper-1.svg';
import rightSwiperIcon from '../../assets/icon-swiper-2.svg';

const SContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50rem;
  background-color: lightgray;

  h2 {
    ${IR}
  }
`;

const SIcon = styled.img`
  width: 6rem;
  height: 12.4rem;
  cursor: pointer;
`;

function Banner() {
  return (
    <SContainer>
      <h2>배너</h2>
      <SIcon
        src={leftSwiperIcon}
        alt='왼쪽 화살표 버튼'
      />
      <SIcon
        src={rightSwiperIcon}
        alt='오른쪽 화살표 버튼'
      />
    </SContainer>
  );
}

export default Banner;
