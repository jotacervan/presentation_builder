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

export default function Show({match}){
  const [slide, setSlide] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    api.get(`/get_slide/${match.params.id}`).then(({data}) => {
      setSlide(data)
      setLoaded(true)
    }).catch(res => {
      console.log(res)
    })
  }, [match.params.id])

  const handleUploadImage = (e) => {
    let elem = e.target
    e.preventDefault()
    let formData = new FormData(e.target)
    let id = elem.getAttribute('data-id')
    api.put(`/slide/${id}`, formData ).then(({data}) => {
      setSlide(data);
    }).catch(res => {
      console.log(res);
    })
  }

  return(
    <Container>
      <PageLoader loaded={loaded} />
      { slide &&
        <div>
          <Button variant="contained" compoent="a" href={`/app/show/${slide.presentation_id}`} >
            Back to Presentation
          </Button>
          <Divider />
          <br />
          <img src={slide.image.url} />
          <br />
          <Divider />
          <br />
          { slide.audio &&
            <Button variant="contained" compoent="a" href={slide.audio.url} target="_blank" >
              Listen Audio
            </Button> 
          }
          <br />
          <form onSubmit={handleUploadImage} data-id={slide.id}>
            <input type='file' name="slide[audio]" />
            <input type='hidden' name="slide[id]" value={slide.id} />
            <Button type="submit" variant="contained" startIcon={<Publish />}>
              Upload
            </Button>
          </form>
        </div>
      }
    </Container>
  )
}
