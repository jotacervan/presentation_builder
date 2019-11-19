import React, { useContext, useEffect, useState } from "react";
import { Container } from './style';
import { MainContext } from '../../../contexts/MainContext';
import Divider from '@material-ui/core/Divider';
import api from '../../../services/api';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

export default function Dashboard() {
    const currentUser = useContext(MainContext);
    const [presentations, setPresentations] = useState([]);

    useEffect(() => {
      api.get('/presentation').then(res => {
        setPresentations(res.data);
      }).catch(res => {
        console.log('Unable to load presentation')
      })
    }, [])

    return (
      <Container>
        <div className="dashboard-header">
          <h1>Welcome {currentUser.name}</h1>
          <Button component="a" href="/app/new" variant="contained" startIcon={<Add />}>
            New Presentation
          </Button>
        </div>
        <Divider />
        
      </Container>
    )
}
