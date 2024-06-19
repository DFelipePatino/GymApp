import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { toggleDrawer } from '../CardDrawer/CardDrawer';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Divider, Grow } from '@mui/material';
import { emptyState, selectedEntrenamiento } from '../../../redux/actions'
import { useEffect } from 'react';
import { ExpandMore } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

export default function CardItem({ setHeaderLoad, setBannerload, setFilterLoad }) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const CardIndex = parseInt(localStorage.getItem('CardIndex'));
    console.log(CardIndex, 'CardIndex at CardItem');

    const resultsFiltered = useSelector((state) => state.resultsFiltered);
    console.log(resultsFiltered, 'resultsFiltered at CardItem');

    const filteredResultsGym = resultsFiltered?.entrenamientos?.filter((each) => each.lugar === "GYM");
    const filteredResultsHome = resultsFiltered?.entrenamientos?.filter((each) => each.lugar === "CASA");
    console.log(filteredResultsGym, 'filteredResultsGym');
    console.log(filteredResultsHome, 'filteredResultsHome');

    // const resultsFilteredRutinasGym = filteredResultsGym?.map(entrenamientos) => entrenamientos.rutinas.filter((rutina) => rutina?.id === CardIndex)
    // : [];

    let entrenamientoSeleccionado;

    if (localStorage.getItem('lugar') === 'GYM') {
        entrenamientoSeleccionado = filteredResultsGym?.filter((entrenamiento) => entrenamiento?.id === CardIndex)[0]
    }
    else if (localStorage.getItem('lugar') === 'CASA') {
        entrenamientoSeleccionado = filteredResultsHome?.filter((entrenamiento) => entrenamiento?.id === CardIndex)[0]
    }


    // .map((rutina) => rutina.rutinas)
    console.log(entrenamientoSeleccionado, 'entrenamientoSeleccionado');

    // const resultsFilteredRutinasGymRutinas = primer.filter((rutina) => rutina?.id === CardIndex)

    // console.log(resultsFilteredRutinasGymRutinas, 'resultsFilteredRutinasGymRutinas');

    const resultsFilteredRutinasGym = filteredResultsGym?.entrenamientos
        ? filteredResultsGym.entrenamientos.filter((entrenamiento) => entrenamiento?.id === CardIndex)
        : [];
    const resultsFilteredRutinasHome = filteredResultsHome?.entrenamientos
        ? filteredResultsHome.entrenamientos.filter((entrenamiento) => entrenamiento?.id === CardIndex)
        : [];

    const [expanded, setExpanded] = React.useState(false);
    const [grow, setGrow] = React.useState(true);
    const [showGym, setShowGym] = React.useState(false);
    const [showHome, setShowHome] = React.useState(false);

    const timeouts = [];

    const handleExpandClick = () => {
        setGrow(false);
        setShowGym(true);
        setShowHome(false);
        // setTimeout(() => {
        //     setExpanded(!expanded);
        // }, 500);
        setTimeout(() => {
            setGrow(true);
        }, 700);
    };

    const handleExpandClick2 = () => {
        setGrow(false);
        setShowHome(true);
        setShowGym(false);
        setTimeout(() => {
            setExpanded(!expanded);
        }, 500);
        setTimeout(() => {
            setGrow(true);
        }, 700);
    };

    const toggleNavigate = async () => {
        toggleDrawer(false)();
        // dispatch(emptyState());
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            setHeaderLoad(false);
        }, 300);
        setTimeout(() => {
            setBannerload(false);
        }, 300);
        setTimeout(() => {
            setFilterLoad(false);
        }, 400);
        setTimeout(() => {
            (navigate('/player'));
        }, 600);
    }

    useEffect(() => {

        if (entrenamientoSeleccionado) {
            dispatch(selectedEntrenamiento(entrenamientoSeleccionado));
            localStorage.setItem('entrenamientoSeleccionado', JSON.stringify(entrenamientoSeleccionado));
        }
    }, [CardIndex]);

    console.log(localStorage.getItem('entrenamientoSeleccionado'))

    const category = localStorage.getItem("category");

    const URLImage = 'http://213.218.240.192:8082/onegym-back/api/multimedia/image/'

    return (

        <Grow
            in={grow} timeout={500}>

            <Card style={{
                width: 850,
                color: 'white',
                backgroundColor: 'rgb(0,0,0)',
                // backgroundImage: 'url(/Screenshot1.png)',
                // backgroundColor: 'rgb(0, 0, 0)',
                marginTop: '20px',
                marginBottom: '10px',

            }}>
                {/* {!expanded ? (
                    <>
                        <CardHeader
                            action={
                                <div>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </div>
                            }
                            title={"Dia " + resultsFilteredDia}
                            subheader="En donde vas a entrenar?"
                            subheaderTypographyProps={{
                                style: {
                                    color: 'white'
                                }
                            }}
                        />
                        <CardContent
                            style={{ backgroundColor: 'rgb(0,0,0)', paddingLeft: '0px', paddingRight: '0px' }}
                        >
                            <CardMedia
                                style={{ width: '100%' }}
                                component="img"
                                height="194"
                                image="/Screenshot1.png"
                            />
                        </CardContent>

                        <CardContent>
                            <Typography
                                variant="body2"
                                color='white'
                            >
                                ¡Bienvenidos a nuestro Entrenamiento Completo para Todos! En donde quieres entrenar hoy?
                            </Typography>
                        </CardContent>

                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '0px' }}>
                            <Button variant="contained" style={{
                                backgroundColor: 'rgb(159, 28, 23)',
                                // color: 'rgb(146, 144, 144)',
                                // fontWeight: 'bold',
                            }}
                                onClick={handleExpandClick}
                            >En el Gym</Button>

                            <Button variant="contained" style={{
                                backgroundColor: 'rgb(159, 28, 23)',
                                // color: 'rgb(146, 144, 144)',
                                // fontWeight: 'bold',
                            }}
                                onClick={handleExpandClick2}
                            >En Casa</Button>
                        </div>
                    </>
                ) : ( */}
                <>
                    <CardHeader


                        title={
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '16px',
                                    justifyContent: 'flex-end',
                                    flexWrap: 'wrap',
                                    flexDirection: 'column'
                                }}
                            >
                                {entrenamientoSeleccionado?.nombre ? entrenamientoSeleccionado.nombre : null}

                                {/* <h5 style={{ color: 'white', marginBottom: 0, marginTop: 10 }}>Elije tu ejercicio a continuacion...</h5> */}

                            </div>
                        }
                    />



                    {/* {resultsFilteredRutinasGym.map((entrenamiento, index) => ( */}
                    <CardContent
                        // key={index}
                        style={{ paddingTop: '0' }}
                    >

                        <div style={{ position: 'relative' }}>
                            <PlayCircleOutlineIcon
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    cursor: 'pointer',
                                    fontSize: '48px',
                                    color: 'red'
                                }}
                                onClick={toggleNavigate} />
                            <CardMedia
                                style={{ border: 'solid , 2px, rgb(159, 28, 23) ', borderRadius: '5%' }}
                                component="img"
                                height="194"
                                image={URLImage + (entrenamientoSeleccionado?.multimedia && entrenamientoSeleccionado?.multimedia?.length > 0 ? entrenamientoSeleccionado?.multimedia.filter((i) => i.type === 'IMAGE')[0].id : 22)}
                                onClick={toggleNavigate}
                            />
                        </div>

                        <div
                            style={{ margin: '10px', fontSize: '1.5rem' }}
                        >

                            <h5
                            style={{ color: 'rgb(159, 28, 23)'}}
                            >Contenido</h5>

                            {entrenamientoSeleccionado?.rutinas?.map((rutina, index) =>
                            (<p key={index}
                                style={{ fontSize: '1rem' }}
                            >
                                <KeyboardArrowRightIcon
                                style={{color: 'rgb(159, 28, 23)', paddingTop: '6px', paddingBottom: '-20px'}}
                                />
                                {rutina.nombre}
                            </p>
                            ))}

                        </div>

                        {/* {entrenamiento.rutinas.map((rutina, index) => (
                                <div key={index}>
                                    <KeyboardArrowRightIcon
                                        style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
                                    />
                                    <Typography variant="body6" color="white"
                                        style={{ cursor: 'pointer' }}
                                        onClick={toggleNavigate}
                                    >
                                        {rutina.nombre}
                                    </Typography>
                                    <br />
                                </div>

                            ))} */}
                    </CardContent>
                    {/* ))} */}

                </>
                {/* )} */}
            </Card>
        </Grow>
    );
}