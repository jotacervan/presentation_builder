import React, { useContext, useEffect, useState } from "react";
import { Container, Actions } from './style';
import { MainContext } from '../../../contexts/MainContext';
import Divider from '@material-ui/core/Divider';
import PageLoader from '../../PageLoader';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import api from '../../../services/api';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

export default function Dashboard() {
    const currentUser = useContext(MainContext);
    const [presentations, setPresentations] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const columns = [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        cell: row => <a href={`/app/show/${row.id}`}>{row.name}</a>,
      },
      {
        name: 'Status',
        selector: 'status',
        sortable: true,
      },
      {
        name: 'Created At',
        selector: 'created_at',
        sortable: true,
      },
      {
        name: 'Action',
        cell: row => <Actions>
          <Fab size="small" component="a" href={`/app/show/${row.id}`} aria-label="edit">
            <ViewIcon />
          </Fab>
          <Fab size="small" component="a" href={`/app/edit/${row.id}`} color="primary" aria-label="edit">
            <EditIcon />
          </Fab>
          <Fab size="small" onClick={() => handleDelete(row.id)} color="secondary" aria-label="edit">
            <DeleteIcon />
          </Fab>
        </Actions>,
      }
    ];

    const handleDelete = id => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You cannot undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete'
      }).then(result => {
        if (result.value) {
          api
            .delete(`/presentation/${id}`)
            .then(res => {
              setPresentations(presentations.filter(p => p.id !== id))
            })
            .catch(res => {
              console.log('error', res);
            });
        }
      });
    }

    useEffect(() => {
      api.get('/presentation').then(({data}) => {
        setPresentations(data);
        setLoaded(true);
      }).catch(res => {
        console.log(res)
      })
    }, [])

    return (
      <Container>
        <PageLoader loaded={loaded} />
        <div className="dashboard-header">
          <h1>Welcome {currentUser.name}</h1>
          <Button component="a" href="/app/new" variant="contained" startIcon={<Add />}>
            New Presentation
          </Button>
        </div>
        <Divider />
        <br />
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className="mainCard">
                <div className="indicator">{ presentations.length }</div>
                <div className="description">Presentations</div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className="mainCard">
                <div className="indicator">{ presentations.length }</div>
                <div className="description">Views</div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className="mainCard">
                <div className="indicator">{ presentations.length }</div>
                <div className="description">Pending</div>
            </Paper>
          </Grid>
        </Grid>
        <br />
        <DataTable
          title="Presentations List"
          columns={columns}
          data={presentations}
          defaultSortField="name"
          pagination
        />
      </Container>
    )
}
