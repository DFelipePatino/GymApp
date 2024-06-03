import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { toggleDrawer } from '../HomePage/CardDrawer/CardDrawer';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMetodo1 } from '../../redux/actions';
import CardDrawer from '../HomePage/CardDrawer/CardDrawer';
import './cards.css';
import { Grow } from '@mui/material';
import { TrainRounded } from '@mui/icons-material';

function cards({ inOutStatus, setHeaderLoad, setBannerload, setFilterLoad }) {

    const [checked, setChecked] = React.useState(true);

    const dispatch = useDispatch();
    const results = useSelector((state) => state.results);
    console.log(results, 'results en cards');

    const resultsFiltered = useSelector((state) => state.resultsFiltered);
    console.log(resultsFiltered, 'resultsFiltered en cards');
    console.log(resultsFiltered?.nombre, 'results nombre');

    // useEffect(() => {
    //     setChecked(prevChecked => !prevChecked);
    //     setTimeout(() => {
    //         setChecked(prevChecked => !prevChecked);
    //     }, 500);
    // }, [inOutStatus]);

    return (

        <Container className='results'>
            <Grow
                in={inOutStatus}
                // out={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 400 } : {})}
            >
                {resultsFiltered?.nombre ? <h3 className='resultsTitle'>{resultsFiltered?.nombre}</h3> : <h3 className='resultsTitle'></h3>}

                {/* <h3 className='resultsTitle'>Hola</h3> */}
            </Grow>
            <Grow
                in={inOutStatus}
                // out={checked}
                style={{ transformOrigin: '1 1 1' }}
                {...(checked ? { timeout: 400 } : {})}
            >
                {/* <Grid container>
                    {resultsFiltered?.images?.map((image, index) => (
                        <Grid item key={index} xs={6} md={4} lg={4}
                            onClick={toggleDrawer(true)}>
                            <img className='imageresult' src={image} />
                        </Grid>
                    ))}
                </Grid> */}
                <Grid container>

                    <Grid item xs={12} md={12} lg={12}>
                        <Card
                            style={{ margin: '10px', backgroundColor: 'rgb(146, 144, 144)', border: '2px solid rgb(156, 28, 23)' }}
                        >
                            <CardHeader
                                style={{ paddingBottom: '0' }}
                                title={resultsFiltered?.descripcion}
                            // subheader={resultsFiltered?.descripcion}
                            />
                            <CardContent
                                style={{ paddingTop: '0' }}
                            >
                                <h4
                                    style={{ marginBottom: '0', marginTop: '10px' }}
                                >
                                    Duracion:
                                </h4>
                                <p>{resultsFiltered?.duración}</p>

                                <h4
                                    style={{ marginBottom: '0' }}
                                >
                                    Repeticiones:
                                </h4>
                                <p>{resultsFiltered?.repeticiones}</p>

                            </CardContent>
                        </Card>
                    </Grid>


                    {resultsFiltered?.entrenamientos && resultsFiltered?.entrenamientos.map((entrenamiento, index) => (
                        <Grid item key={index} xs={6} md={4} lg={4} onClick={toggleDrawer(true)}>
                            <Card
                                style={{ margin: '10px', cursor: 'pointer', backgroundColor: 'rgb(146, 144, 144)', border: '2px solid rgb(156, 28, 23)' }}
                            >
                                <CardHeader
                                    style={{ paddingBottom: '0' }}
                                    title={entrenamiento.nombre}
                                    subheader={entrenamiento.descripcion}
                                />
                                <CardContent>
                                    <h4 style={{ marginBottom: '0' }}>Dia:</h4>
                                    <p>{entrenamiento.dia}</p>

                                    <h4 style={{ marginBottom: '0' }}>Descripcion:</h4>
                                    <p>{entrenamiento.descripcion}</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}


                </Grid>
            </Grow>
            <CardDrawer setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />
        </Container>
    );
}

export default cards








{/* <Container className='results'>
<Grid container>
    {results.map((result, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}> 
            <Paper>{result}</Paper>
        </Grid>
    ))}

</Grid>
</Container> */}