import axios from 'axios';

export const fetchPresencesByDate = async (date) => {
  try {
    const response = await axios.get(`http://localhost:3001/presences/date/${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching presences:', error);
    throw error; // Ensure errors are handled in the frontend
  }
};
