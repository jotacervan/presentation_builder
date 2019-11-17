import React, { useContext, useEffect, useState } from "react";
import { Container } from './style';
import { MainContext } from '../../../contexts/MainContext';
import Divider from '@material-ui/core/Divider';
import api from '../../../services/api';

export default function Dashboard() {
    const currentUser = useContext(MainContext);
    const [presentations, setPresentations] = useState([]);

    useEffect(() => {
      api.get('/presentation').then(res => {
        setPresentations(res.data);
      })
    }, [])

    return (
      <Container>
        <h1>Welcome {currentUser.name}</h1>
        <Divider />
        
      </Container>
    )
}
