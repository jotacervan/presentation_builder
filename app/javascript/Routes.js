import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Main/Dashboard';
import New from './components/New';
import Show from './components/Show';
import NotFound from './components/NotFound';

export default function Routes(){
  return(
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/app" exact component={Dashboard} />
      <Route path="/app/new" component={New} />
      <Route path="/app/show/:id" component={Show} />
      <Route path="/" component={NotFound} />
    </Switch>
  )
}