import React from 'react';
import { useQuery } from 'react-query';
import { getAllRooms } from '../requests/rooms';
import Loader from '../wrappers/Loader';
interface RoomsProps {}

const Rooms: React.FC<RoomsProps> = () => {
  const { data, isLoading } = useQuery('rooms', getAllRooms);
  return <Loader isLoading={isLoading}>{JSON.stringify(data)}</Loader>;
};
export default Rooms;
