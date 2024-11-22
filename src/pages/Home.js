import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  fetchSummedStatisticsForAllCompagnes,
  fetchCompagneStatisticsBetweenDates,
} from '../services/statisticsService';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#8dd1e1', '#8884d8'];

const Home = () => {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [compagneStats, setCompagneStats] = useState([]);
  const [agentStats, setAgentStats] = useState([]);
  const [error, setError] = useState('');

  const handleDateChange = (event, type) => {
    if (type === 'debut') {
      setDateDebut(event.target.value);
    } else {
      setDateFin(event.target.value);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setError('');
      const compagneData = await fetchCompagneStatisticsBetweenDates(null, dateDebut, dateFin);
      const agentData = await fetchSummedStatisticsForAllCompagnes(null, dateDebut, dateFin);

      const totalCompagneWeight = compagneData.reduce(
        (sum, stat) => sum + (stat.dtce + stat.dtcs),
        0
      );

      const processedCompagneStats = compagneData.map((stat) => ({
        name: stat.compagneName,
        percentage: totalCompagneWeight
          ? ((stat.dtce + stat.dtcs) / totalCompagneWeight) * 100
          : 0,
      }));

      const processedAgentStats = agentData.map((stat) => ({
        name: stat.agentName,
        totalCalls: stat.dtce + stat.dtcs,
      }));

      setCompagneStats(processedCompagneStats);
      setAgentStats(processedAgentStats);
    } catch (error) {
      setError('Failed to fetch dashboard data. Please try again later.');
      console.error('Error fetching dashboard data:', error);
    }
  }, [dateDebut, dateFin]);

  useEffect(() => {
    if (dateDebut && dateFin) {
      fetchData();
    }
  }, [fetchData, dateDebut, dateFin]); // Explicitly include dateDebut and dateFin here

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date Début"
            type="date"
            value={dateDebut}
            onChange={(event) => handleDateChange(event, 'debut')}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date Fin"
            type="date"
            value={dateFin}
            onChange={(event) => handleDateChange(event, 'fin')}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" style={{ marginBottom: '20px' }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Taux d&apos;Occupation des Compagnes
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={compagneStats}
                dataKey="percentage"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#82ca9d"
                label={({ name, percentage }) => `${name}: ${percentage.toFixed(2)}%`}
              >
                {compagneStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Durée Totale d&apos;Appels par Agent
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={agentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalCalls" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
