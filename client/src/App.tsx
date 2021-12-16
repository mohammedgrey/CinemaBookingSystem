import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';

import { getAppTheme } from './styles/theme';

function App() {
  const routes = [{ name: 'home', path: '/', component: Home }];

  const theme = useMemo(() => getAppTheme(), []);

  const addRoute = (route: any) => <Route key={route.path} path={route.path} component={route.component} exact />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          {/* <Layout> */}
          {routes.map((route: any) => addRoute(route))}
          {/* </Layout> */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
