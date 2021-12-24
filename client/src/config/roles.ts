export type role = 'admin' | 'manager' | 'customer' | 'guest';
const roles: { [key: string]: role } = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CUSTOMER: 'customer',
  GUEST: 'guest',
};

export default roles;
