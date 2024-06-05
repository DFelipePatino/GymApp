import React from 'react'
import { toggleDrawer } from '../HomePage/CardDrawer/CardDrawer'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function MetodoCard({ resultsFiltered }) {
    return (
        <React.Fragment>
            {resultsFiltered?.entrenamientos && resultsFiltered?.entrenamientos.map((entrenamiento, index) => (
                <Grid item key={index} xs={6} md={4} lg={4}>
                    <Card
                        id={`card-${index}`}
                        style={{ margin: '10px', cursor: 'pointer', backgroundColor: 'rgb(146, 144, 144)', border: '2px solid rgb(156, 28, 23)', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px' }}
                        onClick={toggleDrawer(true)}
                    >
                        <h4 style={{ marginBottom: '10px', marginTop: '0' }}>Dia: {entrenamiento.dia}</h4>
                        <CardContent
                            style={{ padding: '0' }}
                        >
                            <h5
                                style={{ margin: '0' }}
                            >{entrenamiento.nombre}</h5>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </React.Fragment>
    )
}

export default MetodoCard