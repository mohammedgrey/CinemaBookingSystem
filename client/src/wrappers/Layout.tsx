import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../config/routes';
import useNotification from '../hooks/popup/useNotification';
import GenericModal from '../components/generic/GenericModal';
import Notification from '../components/generic/Notification';
import useGenericModal from '../hooks/popup/useGenericModal';
import CustomRoute from '../components/generic/CustomRoute';
import Navbar from '../components/generic/Navbar';
import { Box, Typography } from '@mui/material';
import { navbarHeight } from '../styles/mui/constants';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const { isGenericModalOpen, modalBody } = useGenericModal();
  const { showNotification, notificationMessage, notificationType } = useNotification();
  const addRoute = (route: any) => (
    <CustomRoute allowedRoles={route.roles} key={route.path} path={route.path} component={route.component} exact />
  );

  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ marginBlockStart: navbarHeight }}>
        <Switch>{routes.map((route: any) => addRoute(route))}</Switch>
      </Box>
      <GenericModal open={isGenericModalOpen} body={modalBody} />
      <Notification open={showNotification} message={notificationMessage} type={notificationType} />
    </React.Fragment>
  );
};
export default Layout;
