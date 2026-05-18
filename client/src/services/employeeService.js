import API from './api';

export const getEmployees = async (params = {}) => {
  const { data } = await API.get('/employees', { params });
  return data;
};

export const getEmployeeById = async (id) => {
  const { data } = await API.get(`/employees/${id}`);
  return data;
};

export const createEmployee = async (employeeData) => {
  const { data } = await API.post('/employees', employeeData);
  return data;
};

export const updateEmployee = async (id, employeeData) => {
  const { data } = await API.put(`/employees/${id}`, employeeData);
  return data;
};

export const deleteEmployee = async (id) => {
  const { data } = await API.delete(`/employees/${id}`);
  return data;
};

export const searchEmployees = async (params = {}) => {
  const { data } = await API.get('/employees/search', { params });
  return data;
};
