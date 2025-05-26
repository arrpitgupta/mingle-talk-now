import api from './api';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getOnlineUsers = async () => {
  const response = await api.get('/users/online');
  return response.data;
}; 