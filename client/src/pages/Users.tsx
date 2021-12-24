import React from 'react';
import { useQuery } from 'react-query';
import { getAllUsers } from '../requests/users';
import Loader from '../wrappers/Loader';
interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const { data, isLoading } = useQuery('users', getAllUsers);
  return <Loader isLoading={isLoading}>{JSON.stringify(data)}</Loader>;
};
export default Users;
