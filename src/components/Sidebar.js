import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import '../styles/Sidebar.css'; 

function Sidebar() {
  return (
    <div className="sidebarContainer">
      <List className="sidebarList">
        {[
          { text: "Dashboard", icon: <HomeIcon /> },
          { text: "Agents", icon: <PeopleIcon /> },

        ].map((item, index) => (
          <ListItem button key={item.text} className="sidebarListItem">
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Sidebar;
