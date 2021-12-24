import movie, { updateMovieData } from '../interfaces/movie';
import axios from './index';

export const getMovieReservations = async (movieId: string) => {
  return (await axios.get(`/movies/${movieId}/reservations`)).data;
};

export const getAllMovies = async () => {
  return (await axios.get('/movies')).data;
};

export const postMovie = async (data: movie) => {
  return (await axios.post('/movies', data)).data;
};

export const getMovie = async (id: string) => {
  return (await axios.get(`/movies/${id}`)).data;
};

export const deleteMovie = async (id: string) => {
  return (await axios.delete(`/movies/${id}`)).data;
};

export const updateMovie = async (fields: updateMovieData) => {
  return (await axios.put(`/movies/${fields.id}`, fields.data)).data;
};
