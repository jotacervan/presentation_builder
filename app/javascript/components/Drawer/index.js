import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import api from '../../services/api';

export default function MenuDrawer({classes, open, handleDrawerClose}){

  function Logout() {
    api.delete('/users/sign_out').then(res => {
      location.reload();
    }).catch(res => {
      console.log(res);
    })
  }

  return(
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button component="a" href="/app"  >
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component="a" href="/app/new" >
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="New Presentation" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={Logout} >
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  )
}