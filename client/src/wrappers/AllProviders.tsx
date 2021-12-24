import { GenericModalProvider } from '../contexts/GenericModalContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { UserProvider } from '../contexts/UserContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getAppTheme } from '../styles/theme';
import React, { useMemo } from 'react';
import QueryProvider from '../requests/provider/QueryProvider';

interface AllProvidersProps {
  children: React.ReactNode;
}

const AllProviders: React.FC<AllProvidersProps> = ({ children }) => {
  const theme = useMemo(() => getAppTheme(), []);

  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <GenericModalProvider>
            <UserProvider>{children}</UserProvider>
          </GenericModalProvider>
        </NotificationProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};
export default AllProviders;
