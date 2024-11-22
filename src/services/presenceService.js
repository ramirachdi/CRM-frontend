import axios from 'axios';

export const fetchPresencesByDate = async (date) => {
  try {
    const response = await axios.get(`http://localhost:3001/presences/date/${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching presences:', error);
    throw error;
  }
};

export const fetchPresenceDetails = async (presenceId) => {
  try {
    const response = await axios.get(`http://localhost:3001/presences/${presenceId}/details`);
    return response.data; // Return the details if they exist
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle case where no details are found
      return null; // Return null instead of throwing an error
    }
    console.error('Error fetching presence details:', error);
    throw error; // Rethrow other unexpected errors
  }
};
