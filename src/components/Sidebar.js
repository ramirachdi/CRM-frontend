import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const [activeItem, setActiveItem] = useState("/");

  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, link: "/" },
    { text: "Agents", icon: <PeopleIcon />, link: "/agents" },
    { text: "Compagnes", icon: <BusinessCenterIcon />, link: "/compagnes" },
    { text: "Statistics", icon: <BarChartIcon />, link: "/statistics" },
    { text: "Presence", icon: <EventAvailableIcon />, link: "/presence" },

  ];

  const handleItemClick = (link) => {
    setActiveItem(link);
  };

  return (
    <div className="sidebarContainer">
      <List className="sidebarList">
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.link}
            className={`sidebarListItem ${activeItem === item.link ? 'active' : ''}`}
            onClick={() => handleItemClick(item.link)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Sidebar;
