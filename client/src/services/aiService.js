import API from './api';

export const getAIRecommendation = async (employeeIds = [], type = 'full') => {
  const { data } = await API.post('/ai/recommend', { employeeIds, type });
  return data;
};
