import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; 

function Sidebar() {
  return (
    <div className="sidebarContainer">
      <List className="sidebarList">
        {[
          { text: "Dashboard", icon: <HomeIcon />, link: "/" },
          { text: "Agents", icon: <PeopleIcon />, link: "/agents" },
          { text: "Compagnes", icon: <BusinessCenterIcon />, link: "/compagnes" },
          { text: "Statistics", icon: <BarChartIcon />, link: "/statistics" },
        ].map((item, index) => (
          <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }} key={item.text}>
            <ListItem button className="sidebarListItem">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}

export default Sidebar;