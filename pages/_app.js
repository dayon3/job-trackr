import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider } from '@/lib/auth';
import '@/styles/globals.css';
import theme from '@/styles/theme';

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
