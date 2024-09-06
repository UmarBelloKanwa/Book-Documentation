import { createTheme } from '@mui/material/styles';

// Light Theme
const lightTheme = createTheme({
  palette: {
    background: {
      default: '#ffffdd',
      paper: '#f0f0f0',
    },
    primary: {
      main: '#a6aadd',
    },
    secondary: {
      main: '#5837ec',
    },
    text: {
      primary: '#0b071e',
    },
    divider: '#d0d0d0',
  },
  shadows: [
    'none',
    '0px 6px 12px -2px rgba(0, 0, 0, 0.2), 0px 3px 7px -3px rgba(0, 0, 0, 0.1)',
  ],
});

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#2b2b2b',
      paper: '#1e1e1e',
    },
    primary: {
      main: '#a6aadd',
    },
    secondary: {
      main: '#9a7bff',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
    },
    divider: '#6c53dc2b',
  },
  shadows: [
    'none',
    '0px 6px 12px -2px rgba(0, 0, 0, 0.7), 0px 3px 7px -3px rgba(0, 0, 0, 0.5)',
  ],
});

export { lightTheme, darkTheme };
