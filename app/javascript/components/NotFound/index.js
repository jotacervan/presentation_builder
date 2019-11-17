import React from 'react';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Container } from './style';

export default function NotFound(){
  return( 
    <Paper>
      <Container>
        <ErrorOutline />
        <br />
        <Typography component="p">
          The page you are looking for does not exists
        </Typography>
      </Container>
    </Paper>
  )
}