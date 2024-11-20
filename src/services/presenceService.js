import axios from 'axios';

const BASE_URL = 'http://localhost:3001/presences';

export const fetchPresencesByDate = async (date) => {
  const response = await axios.get(`${BASE_URL}/date/${date}`);
  return response.data;
};
