import React, { useState, useEffect } from "react"
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Dashboard from './main/Dashboard'

export default function Home() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app" exact>
          <Dashboard />
        </Route>
        <Route path="/app/new">
          <h1>Novo</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

