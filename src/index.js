/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color here
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color here
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Customize your font family here
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
);
