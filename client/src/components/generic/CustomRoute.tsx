import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import roles, { role } from '../../config/roles';
import useUser from '../../hooks/system/useUser';
interface CustomRouteProps {
  allowedRoles: Array<role>;
  component: any;
  [key: string]: any;
}

const CustomRoute: React.FC<CustomRouteProps> = ({ allowedRoles, component: Component, ...rest }) => {
  const { user } = useUser();
  const isAllowedToAccess = (!user && allowedRoles.includes(roles.GUEST)) || allowedRoles.includes(user?.role);
  return (
    <Route
      {...rest}
      render={(props: any) => {
        return isAllowedToAccess ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
};
export default CustomRoute;
