import axios from 'axios';

export const fetchStatisticsBetweenDates = async (agentId, compagneId, dateDebut, dateFin) => {
  const response = await axios.get(
    `http://localhost:3001/statistics/betweenDates?agentId=${agentId}&compagneId=${compagneId}&dateDebut=${dateDebut}&dateFin=${dateFin}`
  );
  return response.data;
};
