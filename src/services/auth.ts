import api from './api';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    avatar?: string;
  };
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { username, password });
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('userId', user.id);
  return response.data;
};

export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', { username, email, password });
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('userId', user.id);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}; 