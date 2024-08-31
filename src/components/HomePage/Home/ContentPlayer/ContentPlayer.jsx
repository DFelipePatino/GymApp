import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './contentPlayer.css';
import { Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider, Fade, Grid, Grow, IconButton, Typography, TextField } from '@mui/material';
import LinearProgress from '@mui/joy/LinearProgress';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReactPlayer from 'react-player'
import { Box } from '@mui/system';
import { ExpandMore } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { actualizarEntrenamiento, getProgresoActual, getEntrenamiento, get2UltimosProgresoActualPorEntrenamiento } from '../../../../redux/actions';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import Tooltip from '@mui/material/Tooltip';
import { baseUrl } from '../../../../redux/actions';
import WAButton from '../../../WAButton/WAButton';


const CssTextField = styled(TextField)({
    '& label': {
        color: 'rgb(146, 144, 144)',
    },
    '& label.Mui-focused': {
        color: 'rgb(159, 28, 23)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'rgb(159, 28, 23)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(159, 28, 23)',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(159, 28, 23)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgb(159, 28, 23)',
        },
        '& input': { // Add this block to change the value color
            color: 'rgb(159, 28, 23)',
        },
    },
});


function ContentPlayer({ setPlayerLoad, playerLoad, setReload, usuario }) {

    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    const [fadeLoad, setfadeLoad] = useState(true);
    const [headerLoad, setHeaderLoad] = useState(false);
    const [urlVideo, setUrlVideo] = useState('');

    const [expanded, setExpanded] = React.useState(true);
    const [isPlaying, setIsPlaying] = useState(false);


    const [expandedDescription, setExpandedDescription] = useState(
        []
    );

    const [currentEntrenamiento, setCurrentEntrenamiento] = useState(null);

    const currentEntrenamientoId = useParams().entrenamientoId;

    const currentProgressState = useSelector((state) => state.currentProgress);
    const lastProgresses = useSelector((state) => state.lastProgresses);

    const homeContent = localStorage.getItem("homeContent");


    useEffect(async () => {

        dispatch(getProgresoActual());

        setTimeout(() => {
            dispatch(get2UltimosProgresoActualPorEntrenamiento(currentEntrenamientoId));
        }, 500);


        await getProgresoActual();

        if (currentProgressState.abandonada || currentProgressState.terminada) {
            Swal.fire({
                title: 'No hay un entrenamiento activo',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: 'rgb(0, 128, 0)',
                confirmButtonText: '¡Entendido!'
            })
                .then(() => {
                    navigate('/home');
                });
        }


        try {
            const auxEntrenamiento = await getEntrenamiento(currentEntrenamientoId);
            setCurrentEntrenamiento(auxEntrenamiento);
            if (!auxEntrenamiento || !auxEntrenamiento?.nombre) {
                throw new Error("Entrenamiento no encontrado");
            }
            setExpandedDescription(new Array(currentEntrenamiento?.rutinas?.length).fill(false));

            getVideoLink(auxEntrenamiento);

        } catch (e) {
            console.log("Error trayendo entrenamiento:", e);
            //navigate("/home");
        }

        const newProgress = { ...currentProgressState };
        setCurrentProgressState2(newProgress);

        let fadeLoadTimeout = setTimeout(() => {
            setfadeLoad(false);
        }, 900);
        let playerLoadTimeout = setTimeout(() => {
            setPlayerLoad(true);
        }, 350);


        window.scrollTo(0, 0);

        // Cleanup function
        return () => {
            clearTimeout(fadeLoadTimeout);
            clearTimeout(playerLoadTimeout);
        };
    }, [navigate, homeContent]);


    const [currentProgressState2, setCurrentProgressState2] = useState({});

    const handlePesoChange = (e, index, iPeso, totalPesos) => {
        const newProgress = { ...currentProgressState };
        let pesoAtual = newProgress['pesoRutina' + index] || '';
        let pesosRutina = pesoAtual.split('-');


        for (let i = 0; i < totalPesos; i++) {
            if (pesosRutina.length <= i) {
                pesosRutina.push('0');
            }
        }

        pesosRutina[iPeso] = e.target.value;
        newProgress['pesoRutina' + index] = pesosRutina.join('-');
        setCurrentProgressState2(newProgress); // Correctly update the state

    };



    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (expanded === false) {
            window.scrollTo({ top: 600, behavior: 'smooth' });
        }
        else if (expanded === true) {
            window.scrollTo({ top: 100, behavior: 'smooth' });
        }
    };

    const handleExpandClickRutina = (index) => {
        const newExpandedDescription = [...expandedDescription];
        const newExpanded = newExpandedDescription[index];
        if (!newExpandedDescription[index]) {
            newExpandedDescription.fill(false);
        }
        newExpandedDescription[index] = !newExpanded;
        setExpandedDescription(newExpandedDescription);

        dispatch(getProgresoActual());
        const newProgress = { ...currentProgressState };
        setCurrentProgressState2(newProgress);
    };

    const buttonStyle = {
        margin: '4px',
        color: 'rgb(159, 28, 23)',
        border: '1px solid rgb(0, 0, 0)',
    };

    const playerRef = useRef(null);

    const seekTo = (seconds) => {
        if (playerRef.current) {
            playerRef.current.seekTo(seconds, 'seconds');
        }
    };

    async function updateCurrentProgress(progressNuevo) {
        try {
            const respuesta = await actualizarEntrenamiento(currentEntrenamiento?.id, progressNuevo, currentProgressState);
            if (respuesta !== 0) {
                toggleDrawer(false)();
                Swal.fire({
                    title: 'Error',
                    text: respuesta,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                    .then(() => {
                        if (progressNuevo.abandonada || progressNuevo.terminada) {
                            navigate('/home');
                        }
                    });
            } else {

                Swal.fire({
                    title: 'Entrenamiento actualizado',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: 'rgb(0, 128, 0)',
                    confirmButtonText: '¡Entendido!'
                })
                    .then(async (response) => {
                        if (response.isConfirmed) {
                            setReload(true)
                            if (progressNuevo.abandonada || progressNuevo.terminada) {
                                navigate('/home');

                            } else {
                                handleExpandClickRutina(null);
                            }
                        }
                    });

            }
        }
        catch (e) {
            console.log(e);
            Swal.fire(
                '¡Error!',
                '¡Ha ocurrido un error al actualizar el entrenamiento!',
                e.message
            );
            if (progressNuevo.abandonada || progressNuevo.terminada) {
                navigate('/home');
            }
        }



    }


    const prevPeso = 16;


    function loadRutinas() {
        return currentEntrenamiento?.rutinas?.sort((a, b) => {
            return a.orden - b.orden;
        }).map((rutina, index) => (
            <div key={rutina.id || index}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: 'rgb(159, 28, 23)', color: 'white', fontWeight: 'bold', margin: '4px' }}
                    onClick={() => {
                        handleExpandClickRutina(index);
                        setIsPlaying(true);
                        if (expandedDescription.every(value => !value)) {
                            seekTo(rutina.segundoInicial);
                        }
                    }}
                >
                    <KeyboardArrowRightIcon
                        style={{ color: 'rgb(256, 256, 256)', paddingBottom: '-20px', marginLeft: '-10px' }}
                    />
                    {rutina.nombre}
                </Button>
                <Fade in={expandedDescription[index] && fadeLoad} timeout={600}>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress size="sm" color="danger" thickness={1} variant="solid" />
                    </Box>
                </Fade>
                {rutina?.nombre && (
                    <Collapse in={expandedDescription[index]} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography style={{ color: 'white' }}>
                                Descripcion:
                            </Typography>
                            <Typography style={{ color: 'white' }} paragraph>
                                {rutina?.descripcion}
                            </Typography>

                            <Divider flexItem
                                sx={{
                                    weight: '1px',
                                    height: '0.5px',
                                    backgroundColor: 'rgb(159, 28, 23)',
                                }} />

                            {(usuario?.accountType !== "FREE" && usuario?.accountType !== "GENERAL") && (
                                <>
                                    <Typography style={{ color: 'white' }} >
                                        Control de peso:
                                    </Typography>

                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={3}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    color: 'white',
                                                    fontSize: '0.9rem',
                                                    marginTop: '8px',
                                                    marginBottom: '8px',
                                                }}
                                            >
                                                {lastProgresses?.length > 1 ? 'Peso anterior: ' + (lastProgresses[1]['pesoRutina' + (index + 1)] ?? '') + ' kg' : ''}
                                            </Typography>
                                        </Grid>

                                        {Array.from({ length: rutina.cantidadPesos }, (_, iPeso) => (
                                            <Grid item xs={12} sm={6} key={iPeso}>
                                                <CardActions>
                                                    <CssTextField
                                                        style={{ color: 'white', marginBottom: '8px', marginTop: '8px' }}
                                                        type="number"
                                                        name="pesos"
                                                        label="Peso (kg)"
                                                        value={(currentProgressState2['pesoRutina' + (index + 1)]?.split('-') || [])[iPeso]}
                                                        onChange={(e) => { handlePesoChange(e, index + 1, iPeso, rutina.cantidadPesos) }}
                                                        helperText="Ingresa el peso que utilizaste"
                                                        FormHelperTextProps={{ style: { color: 'white' } }}
                                                    />

                                                    <IconButton aria-label="enviar"
                                                        sx={{ color: 'rgb(0,128,0) ', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}
                                                        onClick={() => {
                                                            updateCurrentProgress(currentProgressState2);
                                                            dispatch(getProgresoActual());
                                                            const newProgress = { ...currentProgressState };
                                                            setCurrentProgressState2(newProgress);
                                                        }}
                                                    >
                                                        <PlaylistAddCheckCircleIcon />
                                                        <br />
                                                        <Typography
                                                            style={{ color: 'rgb(0,128,0)', fontSize: '0.8rem', marginBottom: '40px', marginLeft: '-35px' }}
                                                        >
                                                            Registrar
                                                        </Typography>
                                                    </IconButton>
                                                </CardActions>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </>
                            )}

                            <Divider flexItem
                                sx={{
                                    weight: '1px',
                                    height: '0.5px',
                                    backgroundColor: 'rgb(159, 28, 23)',
                                }} />
                        </CardContent>
                    </Collapse>
                )}
            </div>
        )) || <></>;
    }


    const getVideoLink = async (auxEntrenamiento) => {

        const idVideo = auxEntrenamiento?.multimedia?.find(i => i.type === 'VIDEO')?.id || null;

        if (!idVideo) {
            setUrlVideo('https://www.youtube.com/watch?v=9bZkp7q19f0');
            return;
        }

        const id_token = localStorage.getItem('id_token');
        setUrlVideo(`${baseUrl}/multimedia/video/${idVideo}?token=${id_token}`);
    };


    return (
        <div className="contenthome">
            <Fade in={fadeLoad} timeout={600}>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress size="sm" color="danger" thickness={2} variant="solid" />
                </Box>
            </Fade>

            <Grow
                in={playerLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(playerLoad ? { timeout: 800 } : {})}
            >
                <div className='mediaPlayer'>
                    <Card
                        style={{ width: '94%', height: 'auto', backgroundColor: 'rgb(0, 0, 0)', radius: '1px, solid, rgb(159, 28, 23)' }}
                    >
                        <CardHeader
                            action={
                                <div
                                    style={{
                                        marginTop: '12px',
                                        fontSize: '1rem',
                                        padding: '4px',
                                        paddingLeft: '0px',
                                        paddingBottom: '0px',
                                        color: 'white',
                                        whiteSpace: 'normal' // This ensures text wraps to the next line
                                    }}
                                >
                                    {currentEntrenamiento?.nombre ? currentEntrenamiento?.nombre : currentEntrenamiento?.nombre}
                                </div>
                            }
                            title={
                                <div>
                                    <IconButton aria-label="regresar"
                                        style={{
                                            fontSize: '0.8rem',
                                            color: 'rgb(159, 28, 23)',
                                            paddingRight: '0px'
                                        }}
                                        onClick={() => {
                                            localStorage.setItem("homeContent", "goBack");
                                            setPlayerLoad(false);
                                            setTimeout(() => {
                                                navigate("/home");
                                            }, 200);
                                        }}
                                    >
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                </div>
                            }
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 0px',
                                paddingRight: '30%',
                            }}
                        />
                        {urlVideo === ''
                            // || fadeLoad 
                            ?

                            <div style={{
                                width: '100%',
                                height: '350px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                background: 'linear-gradient(to bottom, rgb(0, 0, 0),rgb(159, 28, 23),rgb(0, 0, 0)'
                            }}>
                                <LinearProgress />
                            </div>

                            :
                            <ReactPlayer
                                ref={playerRef}
                                url={urlVideo}
                                controls={true}
                                width={'100%'}
                                height={'350px'}
                                playing={isPlaying}
                                light={!isPlaying && <img style={{ height: "100%", width: "auto" }} src='/videoPreview.jpeg' alt='Thumbnail' />}
                                style={{ background: 'linear-gradient(to bottom, rgb(0, 0, 0),rgb(159, 28, 23),rgb(0, 0, 0)' }}
                                onBuffer={() => setfadeLoad(true)}
                                onBufferEnd={() => setfadeLoad(false)}
                                config={{
                                    file: {
                                        attributes: {
                                            controlsList: 'nodownload'
                                        }
                                    }
                                }}
                            />

                        }

                        <CardActions
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap',
                                flexDirection: 'column',
                                alignContent: 'flex-start',
                                alignItems: 'flex-start',
                            }}
                        >

                            <h4
                                style={{ color: 'white' }}
                            >Ejercicios</h4>

                            {loadRutinas()}

                            <br />
                            <br />

                            <div
                                style={{ display: 'flex', width: '100%' }}
                            >

                                <br />

                                <Tooltip title="Finalizar entrenamiento">
                                    <IconButton aria-label="finalizar"
                                        sx={{ backgroundColor: 'rgb(0, 128, 0)', color: 'white', fontWeight: 'bold', margin: '4px' }}
                                        onClick={() => {
                                            Swal.fire({
                                                title: '¿Estás seguro de que deseas finalizar este entrenamiento?',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: 'rgb(0, 128, 0)',
                                                cancelButtonColor: 'rgb(0, 0, 0)',
                                                confirmButtonText: '¡Sí, finalizar entrenamiento!'
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                    const entrenamientoFinalizado = { ...currentProgressState };
                                                    entrenamientoFinalizado.terminada = true;
                                                    updateCurrentProgress(entrenamientoFinalizado);


                                                }
                                            });


                                        }}
                                    >
                                        <DoneIcon />
                                    </IconButton>
                                </Tooltip>

                                <Divider orientation="vertical" flexItem
                                    sx={
                                        { width: '20px' }
                                    } />

                                <Tooltip title="Abandonar entrenamiento">
                                    <IconButton aria-label="abandonar"
                                        sx={{ backgroundColor: 'rgb(159, 28, 23)', color: 'white', fontWeight: 'bold', margin: '4px' }}
                                        onClick={() => {
                                            Swal.fire({
                                                title: '¿Estás seguro de que deseas abandonar este entrenamiento?',
                                                icon: 'warning',
                                                color: 'rgb(255, 255, 255)',
                                                background: "rgb(0,0,0)",
                                                backdrop: `rgba(159, 28, 23, 0.4)`,
                                                showCancelButton: true,
                                                confirmButtonColor: 'rgb(159, 28, 23)',
                                                cancelButtonColor: 'rgb(0, 0, 0)',
                                                confirmButtonText: '¡Sí, abandonar entrenamiento!'
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {


                                                    const entrenamientoFinalizado = { ...currentProgressState };
                                                    entrenamientoFinalizado.abandonada = true;
                                                    updateCurrentProgress(entrenamientoFinalizado);
                                                }
                                            });
                                        }}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>

                                <br />

                                <ExpandMore
                                    expand={expanded ? 'true' : undefined}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    sx={{ ml: '50px', mt: '5px', color: 'rgb(159, 28, 23)', pointer: 'cursor' }}
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                                <Typography
                                    sx={{ color: 'rgb(159, 28, 23)', fontSize: '0.8rem', marginTop: '25px', marginLeft: '-35px', pointer: 'cursor' }}
                                    onClick={handleExpandClick}
                                >
                                    Expandir
                                </Typography>

                            </div>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph
                                    style={{ color: 'white' }}
                                >{currentEntrenamiento?.nombre}
                                </Typography>
                                <Typography
                                    style={{ color: 'white' }}
                                    paragraph>
                                    Dia:
                                    {" " + currentEntrenamiento?.dia}
                                    <br />
                                    Estas entrenando en:
                                    {" " + currentEntrenamiento?.lugar}
                                </Typography>
                                <Typography
                                    style={{ color: 'white' }}
                                    paragraph>
                                    Descripcion:
                                    <br />
                                    {currentEntrenamiento?.descripcion}
                                </Typography>

                            </CardContent>
                        </Collapse>
                    </Card>
                </div>
            </Grow >
            <WAButton />
        </div >
    );
}

export default ContentPlayer;
