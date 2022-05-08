import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      contrastText: '#FFF',
      main: '#F50057',
      dark: '#db004c',
    },
  },
  typography: {
    h3: {
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '40px',
      letterSpacing: '-1.5px',
    },
    h4: {
      fontSize: '28px',
      fontWeight: 600,
      letterSpacing: '0.15px',
    },
    h5: {
      fontSize: '14px',
      textAlign: 'center',
      fontWeight: 600,
      letterSpacing: '-1.5px',
    },
    subtitle2: {
      fontSize: '10px',
    },
  },
});

export default defaultTheme;
