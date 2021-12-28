import { Box } from '@mui/material';
import React from 'react';
import { Switch } from 'react-router-dom';
import CustomRoute from '../components/generic/CustomRoute';
import GenericModal from '../components/generic/GenericModal';
import Navbar from '../components/generic/Navbar';
import Notification from '../components/generic/Notification';
import routes from '../config/routes';
import useGenericModal from '../hooks/popup/useGenericModal';
import useNotification from '../hooks/popup/useNotification';
import { navbarHeight } from '../styles/mui/constants';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const { isGenericModalOpen, modalBody, modalWidth } = useGenericModal();

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
      <GenericModal open={isGenericModalOpen} body={modalBody} preferableWidth={modalWidth} />
      <Notification open={showNotification} message={notificationMessage} type={notificationType} />
    </React.Fragment>
  );
};
export default Layout;
