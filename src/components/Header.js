import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../assets/img/intigo.png'; 
import '../styles/Header.css'; 

function Header() {
  return (
    <AppBar position="static" color="default">
      <Toolbar className="headerToolbar">
        <img src={logo} alt="Intigo Logo" className="headerLogo" />
        <Typography variant="h6" className="headerTitle">
          Call Center CRM
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
