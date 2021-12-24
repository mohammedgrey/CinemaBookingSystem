import Home from '../pages/Home';
import Users from '../pages/Users';
import Rooms from '../pages/Rooms';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

import roles, { role } from './roles';

const anyone = () => [roles.GUEST, roles.ADMIN, roles.CUSTOMER, roles.MANAGER];
const just = (role: role) => [role];
export default [
  { name: 'Home', path: '/', component: Home, roles: anyone() },
  { name: 'Login', path: '/login', component: Login, roles: roles.GUEST },
  { name: 'Signup', path: '/signup', component: Signup, roles: roles.GUEST },
  { name: 'Users', path: '/users', component: Users, roles: just(roles.ADMIN) },
  { name: 'Rooms', path: '/rooms', component: Rooms, roles: just(roles.ADMIN) },
];
