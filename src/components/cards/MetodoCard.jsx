import React, { useEffect } from 'react'
import { toggleDrawer } from '../HomePage/CardDrawer/CardDrawer'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Button, CardHeader, CardMedia, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

function MetodoCard({ resultsFiltered }) {

    const [expandedGym, setExpandedGym] = React.useState(false);
    const [expandedHome, setExpandedHome] = React.useState(false);

    useEffect(() => {
        setExpandedGym(false);
        setExpandedHome(false);
    }, []);


    const handleClick = (entrenamientoId) => {
        toggleDrawer(true)();
        localStorage.setItem('CardIndex', entrenamientoId);
    }


    const handleExpandClick = () => {
        // console.log(expanded, 'expanded');
        localStorage.setItem('lugar', 'GYM');
        setExpandedGym(!expandedGym);
    };

    const handleExpandClick2 = () => {
        // console.log(expanded, 'expanded');
        localStorage.setItem('lugar', 'CASA');
        setExpandedHome(!expandedHome);
    };

    console.log(localStorage.getItem("lugar"));


    const filteredResultsGym = resultsFiltered?.entrenamientos?.filter((each) => each.lugar === "GYM");
    const filteredResultsHome = resultsFiltered?.entrenamientos?.filter((each) => each.lugar === "CASA");
    console.log(filteredResultsHome, 'filteredResultsHome en metodoCard');


    return (
        <>
            {localStorage.getItem("lugar") === 'GYM' ? (
                <React.Fragment>
                    {filteredResultsGym?.map((entrenamiento, index) => (
                        <Grid item key={index} xs={6} md={4} lg={4}>
                            <Card
                                id={`card-${entrenamiento.id}`}
                                style={{ margin: '10px', cursor: 'pointer', backgroundColor: 'rgb(0,0,0)', border: '2px solid rgb(156, 28, 23)', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px', color: 'white' }}
                                onClick={() => { handleClick(entrenamiento.id), console.log(entrenamiento.id); }}
                            >
                                <h4 style={{ marginBottom: '10px', marginTop: '0' }}>
                                    Dia: {entrenamiento.dia}</h4>
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
            ) :
                localStorage.getItem("lugar") === 'CASA' ? (
                    <React.Fragment>
                        {filteredResultsHome?.map((entrenamiento, index) => (
                            <Grid item key={index} xs={6} md={4} lg={4}>
                                <Card
                                    id={`card-${entrenamiento.id}`}
                                    style={{ margin: '10px', cursor: 'pointer', backgroundColor: 'rgb(0,0,0)', border: '2px solid rgb(156, 28, 23)', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px', color: 'white' }}
                                    onClick={() => { handleClick(entrenamiento.id), console.log(entrenamiento.id); }}
                                >
                                    <h4 style={{ marginBottom: '10px', marginTop: '0' }}>
                                        Dia: {entrenamiento.dia}</h4>
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
                ) :

                    (
                        <>



                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color='white'
                                >
                                    ¡Bienvenidos a nuestro Entrenamiento Completo para Todos! En donde quieres entrenar hoy?
                                </Typography>
                                <br />
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '0px' }}>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: 'rgb(159, 28, 23)', marginRight: '10px'
                                        }}
                                        // onClick={() => { console.log("hola") }}
                                        onClick={handleExpandClick}
                                    >
                                        En el Gym
                                    </Button>
                                    <Button variant="contained"
                                        style={{
                                            backgroundColor: 'rgb(159, 28, 23)', marginRight: '10px'
                                        }}
                                        onClick={handleExpandClick2}
                                    >En Casa</Button>
                                </div>
                            </CardContent>

                            {/* <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '0px' }}> */}



                            <Button
                                style={{
                                    color: 'black',
                                }}
                            >.</Button>
                            {/* </div> */}
                        </>)}
        </>
    );
}

export default MetodoCard