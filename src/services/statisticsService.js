import axios from 'axios';

// Fetch statistics for a specific agent and compagne within a date range
export const fetchStatisticsBetweenDates = async (agentId, compagneId, dateDebut, dateFin) => {
  const url = agentId
    ? `http://localhost:3001/statistics/betweenDates?agentId=${agentId}&compagneId=${compagneId}&dateDebut=${dateDebut}&dateFin=${dateFin}`
    : `http://localhost:3001/statistics/betweenDates?compagneId=${compagneId}&dateDebut=${dateDebut}&dateFin=${dateFin}`;
  
  const response = await axios.get(url);
  
  return response.data;
};

// Fetch statistics for a specific compagne within a date range
export async function fetchCompagneStatisticsBetweenDates(compagneId, dateDebut, dateFin) {
  const url = compagneId
    ? `http://localhost:3001/statistics/compagneBetweenDates?compagneId=${compagneId}&dateDebut=${dateDebut}&dateFin=${dateFin}`
    : `http://localhost:3001/statistics/compagneBetweenDates?dateDebut=${dateDebut}&dateFin=${dateFin}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch compagne statistics.');
  }

  return response.json();
}


// Fetch summed statistics for all compagnes of a specific agent within a date range
export async function fetchSummedStatisticsForAllCompagnes(agentId, dateDebut, dateFin) {
  const url = agentId
    ? `http://localhost:3001/statistics/summedAgentStats?agentId=${agentId}&dateDebut=${dateDebut}&dateFin=${dateFin}`
    : `http://localhost:3001/statistics/summedAgentStats?dateDebut=${dateDebut}&dateFin=${dateFin}`;
  const response = await axios.get(url);

  return response.data;
}

