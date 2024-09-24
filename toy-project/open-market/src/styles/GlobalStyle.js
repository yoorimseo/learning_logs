const { createGlobalStyle } = require('styled-components');

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  
  * {
    box-sizing: border-box;
    font-family: 'SpoqaHanSansNeo-Regular';
  }

  html{
    font-size: 10px;
  }

  body {
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: inherit;
  }

  img {
    width: 100%;
    height: auto;
    vertical-align: top;
  }

  button {
    border: none;
    cursor: pointer;
    padding: 0;
    background-color: inherit;
  }
`;

export default GlobalStyle;
