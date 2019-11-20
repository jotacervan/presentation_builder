import React, { useState, useEffect } from 'react';
import { Container } from './style';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PageLoader from '../PageLoader';
import Parser from 'html-react-parser';
import api from '../../services/api';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

export default function Show({match}){

  const [presentation, setPresentation] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    api.get(`/presentation/${match.params.id}`).then(({data}) => {
      setPresentation(data)
      setLoaded(true)
    }).catch(res => {
      console.log(res)
    })
  }, [match.params.id])

  return(
    <Container>
      <PageLoader loaded={loaded} />
      { presentation &&
        <>
          <div className="presentationHeader">
            <h1>{presentation.name}</h1>
            <Button component="a" href={`/app/edit/${presentation.id}`} variant="contained" startIcon={<Edit />}>
              Edit Presentation
            </Button>
          </div>
          <Divider />
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className='presentationPreview'>
                <div className='presentationContent'>{Parser(presentation.description)}</div>
              </Paper>   
            </Grid>
          </Grid>
        </>
      }
    </Container>
  )
}
