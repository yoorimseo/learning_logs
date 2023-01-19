import React from 'react';
import styled from 'styled-components';

import instaIcon from '../../../assets/icon-insta.svg';
import fbIcon from '../../../assets/icon-fb.svg';
import ytIcon from '../../../assets/icon-yt.svg';

const SContainer = styled.article`
  background-color: #f2f2f2;
`;

const SWebInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 32rem 3rem;
  padding: 6rem 0 3rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.LIGHT_GRAY};

  ul {
    display: flex;
    font-size: 14px;
    line-height: 18px;
  }

  li {
    cursor: pointer;
  }

  li:not(:first-of-type)::before {
    content: '|';
    margin: 0 1.4rem;
  }

  li:nth-child(3) {
    font-weight: 700;
  }

  img {
    width: 3.2rem;
    height: 3.2rem;
    cursor: pointer;
  }

  img:not(:first-of-type) {
    margin-left: 1.4rem;
  }
`;

const SCompanyInfo = styled.ul`
  margin: 0 32rem;
  padding-bottom: 6.3rem;
  color: ${({ theme }) => theme.color.GRAY};
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
`;

function Footer() {
  return (
    <SContainer>
      <SWebInfo>
        <ul>
          <li>호두샵 소개</li>
          <li>이용약관</li>
          <li>개인정보처리방침</li>
          <li>전자금융거래약관</li>
          <li>청소년보호정책</li>
          <li>제휴문의</li>
        </ul>
        <div>
          <img
            src={instaIcon}
            alt='인스타그램'
          />
          <img
            src={fbIcon}
            alt='페이스북'
          />
          <img
            src={ytIcon}
            alt='유튜브'
          />
        </div>
      </SWebInfo>
      <SCompanyInfo>
        <li>(주)HODU SHOP</li>
        <li>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</li>
        <li>사업자 번호 : 000-0000-0000 | 통신판매업</li>
        <li>대표 : 김호두</li>
      </SCompanyInfo>
    </SContainer>
  );
}

export default Footer;
