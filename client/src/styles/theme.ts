import { createTheme, responsiveFontSizes } from '@mui/material';
import { red } from '@mui/material/colors';

export const getAppTheme = () => {
  let theme = createTheme({
    palette: {
      primary: {
        main: red[700],
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 300,
            maxWidth: '90%',
          },
        },
      },
      MuiIcon: {
        styleOverrides: {
          root: {
            verticalAlign: 'middle',
          },
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};
