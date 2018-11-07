import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import LayersIcon from '@material-ui/icons/Layers';
import SecurityIcon from '@material-ui/icons/Security';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const sideNavItems = (
  <div>
    <ListItemLink href="#/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItemLink>
    <ListItemLink href="#/groups/">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Groups" />
    </ListItemLink>
    <ListItemLink href="#/users/">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemLink>
    <ListItemLink href="#/roles/">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Roles" />
    </ListItemLink>
    <ListItemLink href="#/policies/">
      <ListItemIcon>
        <SecurityIcon />
      </ListItemIcon>
      <ListItemText primary="Policies" />
    </ListItemLink>
  </div>
);