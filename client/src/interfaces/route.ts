import { role } from '../config/roles';

export default interface route {
  name: string;
  path: string;
  component: any;
  roles: Array<role>;
}
