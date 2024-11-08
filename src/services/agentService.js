import axios from 'axios';

const BASE_URL = 'http://localhost:3001/agents';

export const fetchAgents = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
};

export const deleteAgent = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting agent with id ${id}:`, error);
    throw error;
  }
};

export const editAgent = async (id, updatedAgent) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, updatedAgent);
      return response.data; 
    } catch (error) {
      console.error(`Error updating agent with id ${id}:`, error);
      throw error;
    }
  };

export const createAgent = async (newAgent) => {
    const response = await axios.post(BASE_URL, newAgent);
    return response.data;
  };