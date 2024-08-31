import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
import { Button, Divider, Grid, Grow } from '@mui/material';
import { emptyState, selectedEntrenamiento, empezarEntrenamiento } from '../../../redux/actions';
import { useEffect, useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Swal from 'sweetalert2';
import { baseUrl } from "../../../redux/actions";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const CardItem = ({ setHeaderLoad, setBannerload, setFilterLoad, showInstructions, usuario, setShowPlanDeDieta, showPlanDeDieta }) => {
    // console.log(showInstructions, 'showInstructions en cardItem');
    console.log(showPlanDeDieta, 'showPlanDeDieta en cardItem');

    const defaultLayoutPluginInstance = defaultLayoutPlugin();


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const CardIndex = parseInt(localStorage.getItem('CardIndex'));

    const results = useSelector((state) => state.results);
    console.log(results, 'results en cardItem');

    const currentProgressState = useSelector((state) => state.currentProgress);
    // console.log(currentProgressState, 'currentProgressState en cardItem');



    const filteredResultsGym = results?.map((each) => each.entrenamientos?.filter((each) => each.lugar === "GYM"));
    console.log(filteredResultsGym, 'filteredResultsGym en cardItem');
    
    const filteredResultsHome = results?.map((each) => each.entrenamientos?.filter((each) => each.lugar === "CASA"));

    let entrenamientoSeleccionado = [];

    if (localStorage.getItem('lugar') === 'GYM') {
        entrenamientoSeleccionado = filteredResultsGym?.filter((entrenamiento) => entrenamiento?.id === CardIndex)[0];
    } else if (localStorage.getItem('lugar') === 'CASA') {
        entrenamientoSeleccionado = filteredResultsHome?.filter((entrenamiento) => entrenamiento?.id === CardIndex)[0];
    }


    console.log(entrenamientoSeleccionado, 'entrenamientoSeleccionado en cardItem');

    const [expanded, setExpanded] = useState(false);
    const [grow, setGrow] = useState(true);
    const [showGym, setShowGym] = useState(false);
    const [showHome, setShowHome] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [dietaPlanUrl, setDietaPlanUrl] = useState(`${baseUrl}/multimedia/download/{id}?token={id_token}`);




    const handleExpandClick = () => {
        setGrow(false);
        setShowGym(true);
        setShowHome(false);
        setTimeout(() => setGrow(true), 700);
    };

    const handleExpandClick2 = () => {
        setGrow(false);
        setShowHome(true);
        setShowGym(false);
        setTimeout(() => setExpanded(!expanded), 500);
        setTimeout(() => setGrow(true), 700);
    };

    const toggleNavigate = async () => {
        const resultadoCrearEntrenamiento = await empezarEntrenamiento(entrenamientoSeleccionado?.id, currentProgressState);
        if (resultadoCrearEntrenamiento !== 0) {
            toggleDrawer(false)();
            Swal.fire({
                title: 'Atencion',
                text: resultadoCrearEntrenamiento,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `Mi entrenamiento actual`,
                cancelButtonText: 'Ok, ir a Home',
                cancelButtonColor: 'rgb(159, 28, 23)',
                background: "rgb(0,0,0)",
                backdrop: `rgba(159, 28, 23, 0.4)`,
                color: 'rgb(255, 255, 255)',
            }).then((result) => {
                if (result.isConfirmed) {
                    toggleDrawer(false)();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => setBannerload(false), 300);
                    setTimeout(() => setFilterLoad(false), 150);
                    setTimeout(() => navigate(`/player/${currentProgressState.entrenamientoId}`), 500);
                }
            });
        } else {
            // console.log(entrenamientoSeleccionado.id, 'entrenamientoSeleccionado.id');
            toggleDrawer(false)();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setBannerload(false), 300);
            setTimeout(() => setFilterLoad(false), 150);
            setTimeout(() => navigate(`/player/${entrenamientoSeleccionado.id}`), 500);
        }
    }



    const getHeaders = () => {
        const id_token = localStorage.getItem('id_token');
        return { 'Authorization': "Bearer " + id_token };
    };

    const fetchBlobWithAuth = (url) => {
        return fetch(url, { headers: getHeaders() })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.blob();
            })
            .catch(error => {
                console.error('Fetch error:', error);
                throw error;
            });
    };

    const getImageObject = async (id) => {

        try {
            setImageUrl("https://st2.depositphotos.com/2815589/5747/v/450/depositphotos_57477791-stock-illustration-loading-bar-with-a-doodle.jpg");
            const id_token = localStorage.getItem('id_token');
            const objectURL = `${baseUrl}/multimedia/image/${id}?token=${id_token}`;
            setImageUrl(objectURL);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        if (entrenamientoSeleccionado) {
            dispatch(selectedEntrenamiento(entrenamientoSeleccionado));
            localStorage.setItem('entrenamientoSeleccionado', JSON.stringify(entrenamientoSeleccionado));
            const imageId = entrenamientoSeleccionado?.multimedia?.find((i) => i.type === 'IMAGE')?.id || 17;
            getImageObject(imageId);
        }
        const id_token = localStorage.getItem('id_token');
        setDietaPlanUrl(dietaPlanUrl.replace('{id_token}', id_token));
    }, [entrenamientoSeleccionado?.rutinas]);

    const document = usuario?.multimedia?.find((m) => m.type === 'DOCUMENT');

    return (
        <Grow in={grow} timeout={500}>
            <Card style={{
                width: 850,
                color: 'white',
                backgroundColor: 'rgb(0,0,0)',
                marginTop: '20px',
                marginBottom: '10px',
            }}>

                {!showInstructions && !showPlanDeDieta ? (
                    <>
                        <CardHeader
                            title={
                                <div>
                                    {entrenamientoSeleccionado?.nombre || null}
                                    <br />
                                    {entrenamientoSeleccionado?.dia ? "Dia " + entrenamientoSeleccionado.dia : null}
                                </div>
                            }
                        />
                        <CardContent style={{ paddingTop: '0' }}>
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
                                    style={{ borderRadius: '5%', paddingTop: '30px', paddingBottom: '30px', background: 'linear-gradient(to bottom, rgb(0, 0, 0),rgb(159, 28, 23),rgb(0, 0, 0)' }}
                                    component="img"
                                    height="194"
                                    image={imageUrl}
                                    onClick={toggleNavigate}
                                />
                            </div>
                            <div
                                style={{
                                    margin: '10px',
                                    fontSize: '1.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <h5 style={{ color: 'rgb(159, 28, 23)', margin: '0px' }}>Contenido</h5>
                                <h6 style={{ color: 'rgb(256, 256, 256)', margin: '15px' }}>Ejercicios</h6>
                                <Grid container>
                                    {entrenamientoSeleccionado?.rutinas?.sort((a, b) => {
                                        return a.orden - b.orden;
                                    }).map((rutina, index) => (
                                        <Grid item key={index} xs={6} md={4} lg={4}>
                                            <Typography
                                                // variant='contained'
                                                style={{ fontSize: '0.8rem', textDecoration: 'underline', marginBottom: '10px', color: 'white' }}
                                            >
                                                <KeyboardArrowRightIcon
                                                    style={{ color: 'rgb(256, 256, 256)', paddingBottom: '-20px', marginLeft: '-10px' }}
                                                />
                                                {rutina.nombre}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </CardContent>
                    </>
                ) :
                    showInstructions ? (
                        <>
                            <CardHeader
                                title={
                                    <div>
                                        Instructivo de pago
                                    </div>
                                }
                            />
                            <CardContent style={{ paddingTop: '0' }}>
                                <div style={{ position: 'relative' }}>
                                    <Link to={'/instructions.jpg'} target='blank'>
                                        <ArrowOutwardIcon
                                            style={{
                                                position: 'absolute',
                                                top: '-4%',
                                                right: '-4%',
                                                transform: 'translate(-50%, -50%)',
                                                cursor: 'pointer',
                                                fontSize: '48px',
                                                color: 'red'
                                            }}
                                        />
                                    </Link>

                                    <div style={{ height: '600px', overflow: 'auto' }}>
                                        <CardMedia
                                            style={{ paddingBottom: '30px', background: 'linear-gradient(to bottom, rgb(0, 0, 0),rgb(159, 28, 23),rgb(0, 0, 0)' }}
                                            component="img"
                                            height="auto"
                                            image="/instructions.jpg"
                                        />
                                    </div>
                                </div>

                            </CardContent>
                        </>)
                        : showPlanDeDieta ?
                            (<>
                                <CardHeader
                                    title={
                                        <div>
                                            Plan de Dieta
                                        </div>
                                    }
                                />
                                <CardContent style={{ paddingTop: '0' }}>
                                    <div style={{ position: 'relative' }}>
                                        <Link
                                            to={document ? dietaPlanUrl.replace('{id}', document.id) : '#'}
                                            target="_blank"
                                            rel="noopener noreferrer" // Recommended for security reasons when using target="_blank"
                                        >
                                            <ArrowOutwardIcon
                                                style={{
                                                    position: 'absolute',
                                                    top: '-4%',
                                                    right: '-4%',
                                                    transform: 'translate(-50%, -50%)',
                                                    cursor: 'pointer',
                                                    fontSize: '48px',
                                                    color: 'red'
                                                }}
                                            />
                                        </Link>
                                        {/* <Link to={`http://${usuario.multimedia[0].ruta}`} target='blank'>
                                    <ArrowOutwardIcon
                                        style={{
                                            position: 'absolute',
                                            top: '-4%',
                                            right: '-4%',
                                            transform: 'translate(-50%, -50%)',
                                            cursor: 'pointer',
                                            fontSize: '48px',
                                            color: 'red'
                                        }}
                                    />
                                </Link> */}
                                        {/* <div style={{ height: "750px" }}>
                                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                                                <Viewer fileUrl={usuario.multimedia[0].ruta} plugins={[defaultLayoutPluginInstance]} />
                                            </Worker>
                                        </div> */}

                                        <div style={{ height: '600px', overflow: 'auto' }}>
                                    <CardMedia
                                        style={{ paddingBottom: '30px', background: 'linear-gradient(to bottom, rgb(0, 0, 0),rgb(159, 28, 23),rgb(0, 0, 0)' }}
                                        component="img"
                                        height="auto"
                                        image="/Plandedietacard.jpg"
                                    />
                                </div>
                                    </div>

                                </CardContent>
                            </>

                            ) : (null)}


            </Card>
        </Grow>
    );
};

export default CardItem;
