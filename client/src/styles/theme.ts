import { createTheme, responsiveFontSizes } from '@mui/material';

export const getAppTheme = () => {
  let theme = createTheme({});
  theme = responsiveFontSizes(theme);
  return theme;
};
