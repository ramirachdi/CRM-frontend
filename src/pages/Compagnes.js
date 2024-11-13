import React, { useState, useEffect } from 'react';
import CompagneTable from '../components/CompagneTable';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { fetchCompagnes } from '../services/compagneService';

function Compagnes() {
  const [compagnes, setCompagnes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadCompagnes = async () => {
      try {
        const data = await fetchCompagnes();
        setCompagnes(data);
      } catch (error) {
        console.error('Failed to load compagnes:', error);
      }
    };
    loadCompagnes();
  }, []);

  return (
    <div>
      <TextField
        label="Search Compagnes"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        color="primary"
        style={{ marginBottom: '20px' }}
      />
      <CompagneTable 
        compagnes={compagnes.filter(compagne => compagne.name.toLowerCase().includes(searchQuery))} 
        setCompagnes={setCompagnes} 
      />
    </div>
  );
}

export default Compagnes;
