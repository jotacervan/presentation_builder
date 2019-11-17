import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/main/Dashboard';
import NotFound from './components/NotFound';

export default function Routes(){
  return(
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/app" exact component={Dashboard} />
      <Route path="/" component={NotFound} />
    </Switch>
  )
}