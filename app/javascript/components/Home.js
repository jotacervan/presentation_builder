import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainProvider from '../contexts/MainContext';
import Routes from '../Routes';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from './AppBar';
import MenuDrawer from './Drawer';
import useStyles from './style';

export default function Home({current_user}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <BrowserRouter>
      <MainProvider current_user={current_user} >
        <div className={classes.root}>
          <CssBaseline />
          <TopBar 
            classes={classes} 
            open={open} 
            handleDrawerOpen={handleDrawerOpen} 
          />
          <MenuDrawer 
            classes={classes} 
            open={open} 
            handleDrawerClose={handleDrawerClose} 
          />

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Routes />
          </main>
        </div>
      </MainProvider>
    </BrowserRouter>
  );
}
