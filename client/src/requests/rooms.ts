import room, { updateRoomData } from '../interfaces/room';
import axios from './index';

export const getAllRooms = async () => {
  return (await axios.get('/rooms')).data;
};

export const postRoom = async (data: room) => {
  return (await axios.post('/rooms', data)).data;
};

export const getRoom = async (id: string) => {
  return (await axios.get(`/rooms/${id}`)).data;
};

export const deleteRoom = async (id: string) => {
  return (await axios.delete(`/rooms/${id}`)).data;
};

export const updateRoom = async (fields: updateRoomData) => {
  return (await axios.put(`/rooms/${fields.id}`, fields.data)).data;
};
