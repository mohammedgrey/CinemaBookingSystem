import { signupFields, loginFields, updatePasswordFields, updateUserData } from '../interfaces/user';
import axios from './index';

export const signup = async (data: signupFields) => {
  return (await axios.post('/users/signup', data)).data;
};

export const login = async (data: loginFields) => {
  return (await axios.post('/users/login', data)).data;
};

export const getMe = async () => {
  return (await axios.get('/users/me')).data;
};

export const updatePassword = async (data: updatePasswordFields) => {
  return (await axios.put('/users/me/updatepassword', data)).data;
};

export const getAllUsers = async () => {
  return (await axios.get('/users')).data;
};

export const postUser = async (data: signupFields) => {
  return (await axios.post('/users', data)).data;
};

export const getUser = async (id: string) => {
  return (await axios.get(`/users/${id}`)).data;
};

export const deleteUser = async (id: string) => {
  return (await axios.delete(`/users/${id}`)).data;
};

export const updateUser = async (fields: updateUserData) => {
  return (await axios.put(`/users/${fields.id}`, fields.data)).data;
};
