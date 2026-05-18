import API from './api';

export const loginUser = async (credentials) => {
  const { data } = await API.post('/auth/login', credentials);
  return data;
};

export const signupUser = async (userData) => {
  const { data } = await API.post('/auth/signup', userData);
  return data;
};
