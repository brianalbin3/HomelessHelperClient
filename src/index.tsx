import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';

import { AuthContextProvider } from "./contexts/authContext";

import theme from './theme';

ReactDOM.render(
  //<React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>,
  //</React.StrictMode>

  document.getElementById('root')
);