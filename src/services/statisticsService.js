import axios from 'axios';

// Fetch statistics for a specific agent and compagne within a date range
export const fetchStatisticsBetweenDates = async (agentId, compagneId, dateDebut, dateFin) => {
  const response = await axios.get(
    `http://localhost:3001/statistics/betweenDates?agentId=${agentId}&compagneId=${compagneId}&dateDebut=${dateDebut}&dateFin=${dateFin}`
  );
  return response.data;
};

// Fetch statistics for a specific compagne within a date range
export async function fetchCompagneStatisticsBetweenDates(compagneId, dateDebut, dateFin) {
  const response = await fetch(
    `http://localhost:3001/statistics/compagneBetweenDates?compagneId=${compagneId}&dateDebut=${dateDebut}&dateFin=${dateFin}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch compagne statistics.');
  }
  return response.json();
}

// Fetch summed statistics for all compagnes of a specific agent within a date range
export async function fetchSummedStatisticsForAllCompagnes(agentId, dateDebut, dateFin) {
  const response = await axios.get(
    `http://localhost:3001/statistics/summedAgentStats?agentId=${agentId}&dateDebut=${dateDebut}&dateFin=${dateFin}`
  );
  return response.data;
}
