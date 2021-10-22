import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    backgroundPrimary: {
      main: '#f2f5fa'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 767,
      lg: 1200,
      xl: 1536
    }
  }
});

export default theme;
