import React, { useState, useContext, useEffect } from 'react';
import { Container } from './style';
import Divider from '@material-ui/core/Divider';
import { MainContext } from '../../contexts/MainContext';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PageLoader from '../PageLoader';
import Parser from 'html-react-parser';
import Button from '@material-ui/core/Button';
import ReactQuill from 'react-quill';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import api from '../../services/api';
import 'react-quill/dist/quill.snow.css';

export default function Edit({history, match}) {
  const [loaded, setLoaded] = useState(false)
  const [presentation, setPresentation] = useState({});
  const [preview, setPreview] = useState(false);
  const [html, setHtml] = useState(false);

  const handleNameChange = e => {
    setPresentation({ ...presentation, [e.target.name]: e.target.value });
  };

  const handleChange = value => {
    setPresentation({ ...presentation, description: value });
  };

  const handleSavePresentation = () => {
    api.put(`/presentation/${presentation.id}`, { presentation }).then(({data}) => {
      history.push(`/app/show/${data.id}`)
    }).catch(res => {
      console.log('error', res)
    })
  }

  useEffect(() => {
    api.get(`/presentation/${match.params.id}`).then(({data}) => {
      console.log(data)
      setPresentation(data)
      setLoaded(true)
    }).catch(res => {
      console.log(res)
    })
  }, [match.params.id])

  return (
    <Container>
      <PageLoader loaded={loaded} />
      <div className="new-presentation-header">
        <h1>Edit Presentation</h1>
      </div>
      <Divider />
      { presentation.id &&
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField
              id='outlined-basic'
              label='Presentation Name'
              margin='normal'
              variant='outlined'
              name='name'
              className='fullWidthField'
              value={presentation.name}
              onChange={handleNameChange}
            />
            {html ? (
              <TextField
                id='outlined-multiline-static'
                label='Description'
                multiline
                rows='10'
                className='fullWidthField'
                margin='normal'
                name='description'
                variant='outlined'
                value={presentation.description}
                onChange={handleNameChange}
              />
            ) : (
              <ReactQuill
                value={presentation.description}
                onChange={handleChange}
                className='textArea'
              />
            )}
            <div className='buttons'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={html}
                    onChange={() => setHtml(!html)}
                    value="checkedB"
                    color="primary" 
                  />
                }
                label="Edit Html"
              />
              <Button variant='contained' onClick={() => setPreview(!preview)} className='right'>
                Preview
              </Button>
              <Button variant='contained' onClick={handleSavePresentation} className='right'>
                Save
              </Button>
            </div>
          </Grid>
          { preview &&
            <Grow in={preview} >
              <Grid item xs>
                <Paper className='presentationPreview'>
                  <p className='presentationTitle'>{presentation.name}</p>
                  <Divider />
                  <div className='presentationContent'>{Parser(presentation.description)}</div>
                </Paper>
              </Grid>
            </Grow>
          }
        </Grid>
      }
    </Container>
  );
}
