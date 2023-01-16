import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import Router from './routes/Router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/Theme';

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Reset />
        <Router />
        <GlobalStyle />
      </ThemeProvider>
    </div>
  );
}

export default App;
