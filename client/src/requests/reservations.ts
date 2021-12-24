import reservation from '../interfaces/reservation';
import axios from './index';

export const getMyReservations = async () => {
  return (await axios.get('/reservations/me')).data;
};

export const getAllReservations = async () => {
  return (await axios.get('/reservations')).data;
};

export const postReservation = async (data: reservation) => {
  return (await axios.post('/reservations', data)).data;
};

export const getReservation = async (id: string) => {
  return (await axios.get(`/reservations/${id}`)).data;
};

export const deleteReservation = async (id: string) => {
  return (await axios.delete(`/reservations/${id}`)).data;
};
