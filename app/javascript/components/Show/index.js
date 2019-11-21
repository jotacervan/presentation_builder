import React, { useState, useEffect } from 'react';
import { Container } from './style';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PageLoader from '../PageLoader';
import Parser from 'html-react-parser';
import api from '../../services/api';
import Edit from '@material-ui/icons/Edit';
import Publish from '@material-ui/icons/Publish';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Slides from './Slides';

export default function Show({match}){

  const [presentation, setPresentation] = useState(null)
  const [slides, setSlides] = useState([])
  const [nextOrder, setNextOrder] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    api.get(`/presentation/${match.params.id}`).then(({data}) => {
      setPresentation(data)
      setSlides(data.slides)
      setLoaded(true)
      let nextOrder = [0];
      data.slides.length > 0 && data.slides.forEach(s => nextOrder.push(parseInt(s.order)));
      setNextOrder(Math.max(...nextOrder) + 1)
    }).catch(res => {
      console.log(res)
    })
  }, [match.params.id])

  const handleUpdloadPdf = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Feature Unavailable',
      text: 'Comming Soon',
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    })
  }

  const handleUploadImage = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    api.post('/slide', formData ).then(({data}) => {
      setSlides(data)
    }).catch(res => {
      console.log(res);
    })
  }

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
            <Grid item xs>
              <Paper className='presentationPreview'>
                <div className='presentationContent'>
                  { slides.length === 0 &&
                    <>
                      <p><strong>You have {slides.length} slides registered</strong></p>
                      <form onSubmit={handleUpdloadPdf}>
                        <input type='file' name="slide[image]" />
                        <Button type="submit" variant="contained" startIcon={<Publish />}>
                          Upload PDF
                        </Button>
                      </form>
                    </>
                  }
                  <p><strong>Create a single slide</strong></p>
                  <form onSubmit={handleUploadImage}>
                    <input type='file' name="slide[image]" />
                    <input type='hidden' name="slide[presentation_id]" value={presentation.id} />
                    <input type='hidden' name="slide[order]" value={nextOrder} />
                    <Button type="submit" variant="contained" startIcon={<Publish />}>
                      Upload
                    </Button>
                  </form>
                </div>
              </Paper>   
            </Grid>
          </Grid>

          { slides.length > 0 &&
            <Paper>
              <DndProvider backend={HTML5Backend}>
                <Slides presId={presentation.id} />
              </DndProvider>
            </Paper>
          }
        </>
      }
    </Container>
  )
}
