import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {
  IconButton,
  CardMedia,
  Button,
  Typography,
  Toolbar,
  Box,
  Hidden,
  Avatar,
  SwipeableDrawer,
  List,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoSVG from '../../logo.svg';
import useUser from '../../hooks/system/useUser';
import { NavLink, useHistory } from 'react-router-dom';
import routes from '../../config/routes';
import roles from '../../config/roles';
import { navbarHeight } from '../../styles/mui/constants';

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  const { user, logoutUser } = useUser();
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const LinksWrapper = (InnerComponent: (route: any) => React.ReactNode): React.ReactNode => {
    return (
      <React.Fragment>
        {routes.map((route: any) => {
          const isAllowedToAccess =
            (!user && route?.roles?.includes(roles.GUEST)) || route?.roles?.includes(user?.role);
          if (!['/', '/login', '/signup', '/movie/:id', '/profile'].includes(route.path) && isAllowedToAccess)
            return InnerComponent(route);
          return null;
        })}
      </React.Fragment>
    );
  };
  const Logo = (
    <CardMedia
      sx={{ width: '40px', height: '40px', marginInlineEnd: '16px', cursor: 'pointer' }}
      component="img"
      src={logoSVG}
      onClick={() => history.push('/')}
    />
  );
  const MenuButton = (
    <IconButton
      onClick={() => setDrawerOpen((prev: boolean) => !prev)}
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ height: navbarHeight }}>
        <Toolbar>
          <Box display="flex" sx={{ flexGrow: 1, alignItems: 'center' }}>
            <Hidden mdUp>{MenuButton}</Hidden>
            {Logo}
            <Hidden lgDown>
              <Typography variant="h6">Cinema Booking</Typography>
            </Hidden>
          </Box>
          <Hidden mdDown>
            <Box display="flex" sx={{ flexGrow: 1, alignItems: 'center' }}>
              {LinksWrapper((route) => {
                return (
                  <NavLink to={route.path} key={route.path} className="nav-link">
                    {route.name}
                  </NavLink>
                );
              })}
            </Box>
          </Hidden>

          {!user ? (
            <React.Fragment>
              <Button onClick={() => history.push('/login')} sx={{ marginInlineEnd: '16px' }} color="inherit">
                Login
              </Button>
              <Button onClick={() => history.push('/signup')} color="inherit" variant="outlined">
                Sign up
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Hidden smDown>
                <Button variant="outlined" size="small" onClick={() => logoutUser()} color="inherit">
                  Sign out
                </Button>
              </Hidden>
              <Typography sx={{ cursor: 'pointer' }} onClick={() => history.push('/profile')} mx={2}>
                {user.firstName + ' ' + user.lastName}
              </Typography>
              <Avatar sx={{ cursor: 'pointer' }} onClick={() => history.push('/profile')} />
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        onOpen={() => setDrawerOpen(true)}
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {' '}
        <Box p={2} pr={0} display="flex" justifyContent="space-between" alignItems="center">
          {Logo}
          {MenuButton}
        </Box>
        <List>
          {LinksWrapper((route) => {
            return (
              <ListItemButton
                selected={history.location.pathname === route.path}
                key={route.path}
                onClick={() => {
                  history.push(route.path);
                  setDrawerOpen(false);
                }}
              >
                {route.name}
              </ListItemButton>
            );
          })}
        </List>
      </SwipeableDrawer>
    </Box>
  );
};

export default Navbar;
