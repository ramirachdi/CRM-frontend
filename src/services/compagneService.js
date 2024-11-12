import axios from 'axios';

const BASE_URL = 'http://localhost:3001/compagnes';

export const fetchCompagnes = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createCompagne = async (newCompagne) => {
  const response = await axios.post(BASE_URL, newCompagne);
  return response.data;
};

export const editCompagne = async (id, updatedCompagne) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedCompagne);
  return response.data;
};

export const deleteCompagne = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
