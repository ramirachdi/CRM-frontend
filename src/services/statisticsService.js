import axios from 'axios';

export const fetchStatisticsBetweenDates = async (agentId, compagneId, dateDebut, dateFin) => {
  const response = await axios.get(
    `http://localhost:3001/statistics/betweenDates?agentId=${agentId}&compagneId=${compagneId}&dateDebut=${dateDebut}&dateFin=${dateFin}`
  );
  return response.data;
};

export async function fetchCompagneStatisticsBetweenDates(compagneId, dateDebut, dateFin) {
  const response = await fetch(
    `http://localhost:3001/statistics/compagneBetweenDates/?compagneId=${compagneId}&dateDebut=${dateDebut}&dateFin=${dateFin}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch compagne statistics.');
  }
  return response.json();
}
