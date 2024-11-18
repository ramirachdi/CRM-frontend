import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import StatisticsFilters from '../components/StatisticsFilters';
import CompagneStatisticsTable from '../components/CompagneStatisticsTable';
import AgentStatisticsTable from '../components/AgentStatisticsTable';
import { fetchCompagneStatisticsBetweenDates, fetchSummedStatisticsForAllCompagnes } from '../services/statisticsService';

function Statistics() {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [selection, setSelection] = useState('');
  const [compagneStatistics, setCompagneStatistics] = useState([]);
  const [agentStatistics, setAgentStatistics] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedDateDebut = localStorage.getItem('statisticsDateDebut');
    const savedDateFin = localStorage.getItem('statisticsDateFin');
    const savedSelection = localStorage.getItem('statisticsSelection');
    const savedCompagneStatistics = localStorage.getItem('statisticsCompagneStatistics');
    const savedAgentStatistics = localStorage.getItem('statisticsAgentStatistics');

    if (savedDateDebut) setDateDebut(savedDateDebut);
    if (savedDateFin) setDateFin(savedDateFin);
    if (savedSelection) setSelection(savedSelection);
    if (savedCompagneStatistics) setCompagneStatistics(JSON.parse(savedCompagneStatistics));
    if (savedAgentStatistics) setAgentStatistics(JSON.parse(savedAgentStatistics));
  }, []);

  useEffect(() => {
    localStorage.setItem('statisticsDateDebut', dateDebut);
    localStorage.setItem('statisticsDateFin', dateFin);
    localStorage.setItem('statisticsSelection', selection);
    localStorage.setItem('statisticsCompagneStatistics', JSON.stringify(compagneStatistics));
    localStorage.setItem('statisticsAgentStatistics', JSON.stringify(agentStatistics));
  }, [dateDebut, dateFin, selection, compagneStatistics, agentStatistics]);

  const handleFetchStatistics = async () => {
    setError('');
    if (!dateDebut || !dateFin || !selection) {
      setError('All fields must be filled.');
      return;
    }

    try {
      if (selection === 'compagne') {
        const response = await fetchCompagneStatisticsBetweenDates(null, dateDebut, dateFin);
        setCompagneStatistics(response);
      } else if (selection === 'agent') {
        const response = await fetchSummedStatisticsForAllCompagnes(null, dateDebut, dateFin);
        setAgentStatistics(response);
      }
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError('Failed to fetch statistics.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Statistics
      </Typography>
      <StatisticsFilters
        dateDebut={dateDebut}
        setDateDebut={setDateDebut}
        dateFin={dateFin}
        setDateFin={setDateFin}
        selection={selection}
        setSelection={setSelection}
        handleFetchStatistics={handleFetchStatistics}
        error={error}
      />
      {selection === 'compagne' && compagneStatistics.length > 0 && (
        <CompagneStatisticsTable compagneStatistics={compagneStatistics} />
      )}
      {selection === 'agent' && agentStatistics.length > 0 && (
        <AgentStatisticsTable agentStatistics={agentStatistics} />
      )}
    </div>
  );
}

export default Statistics;
