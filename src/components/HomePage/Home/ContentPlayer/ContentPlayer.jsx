import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './contentPlayer.css';
import { Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider, Fade, Grid, Grow, IconButton, LinearProgress, Typography, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReactPlayer from 'react-player'
import { Box } from '@mui/system';
import { ExpandMore, FavoriteBorder, Gradient } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchBlobWithAuth } from '../../../../multimediaUtils';
import { actualizarEntrenamiento, getEntrenamientoActual, getEntrenamiento } from '../../../../redux/actions';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import Tooltip from '@mui/material/Tooltip';

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


function ContentPlayer({ setPlayerLoad, playerLoad }) {

    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    const [fadeLoad, setfadeLoad] = useState(true);
    const [headerLoad, setHeaderLoad] = useState(false);
    const [urlVideo, setUrlVideo] = useState('');

    const [expanded, setExpanded] = React.useState(true);

    const [expandedDescription, setExpandedDescription] = useState(
        []
    );

    const [currentEntrenamiento, setCurrentEntrenamiento] = useState(null);

    const user = useSelector((state) => state.user);
    const currentEntrenamientoId = useParams().entrenamientoId;

    const currentProgressState = useSelector((state) => state.currentEntrenamiento);



    const homeContent = localStorage.getItem("homeContent");

    const URLVideo = 'http://213.218.240.192:8082/onegym-back/api/multimedia/video/';


    useEffect(async () => {

        dispatch(getEntrenamientoActual());
        try {
            const auxEntrenamiento = await getEntrenamiento(currentEntrenamientoId);
            setCurrentEntrenamiento(auxEntrenamiento);
            console.log("Entrenamiento:", auxEntrenamiento);
            if (!auxEntrenamiento || !auxEntrenamiento?.nombre) {
                throw new Error("Entrenamiento no encontrado");
            }
            setExpandedDescription(new Array(currentEntrenamiento?.rutinas?.length).fill(false));
            
            getVideoLink(auxEntrenamiento);
            
            console.log("Rutinas:", rutinasButtons);
        } catch (e) {
            console.log("Error trayendo entrenamiento:", e);
            //navigate("/home");
        }

       
        

        let fadeLoadTimeout = setTimeout(() => {
            setfadeLoad(false);
        }, 900);
        let playerLoadTimeout = setTimeout(() => {
            setPlayerLoad(true);
        }, 350);

        // const localUser = localStorage.getItem("localUserName");

        // const verifyLogin = (localUser) => {
        //     if (!localUser) {
        //         navigate("/");
        //     }
        // };
        // verifyLogin(localUser);

        window.scrollTo(0, 0);

        // Cleanup function
        return () => {
            clearTimeout(fadeLoadTimeout);
            clearTimeout(playerLoadTimeout);
        };
    }, [navigate, homeContent]);




    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (expanded === false) {
            window.scrollTo({ top: 600, behavior: 'smooth' });
        }
        else if (expanded === true) {
            window.scrollTo({ top: 200, behavior: 'smooth' });
        }
    };

    const handleExpandClickRutina = (index) => {
        console.log("entra al hanlde click");

        const newExpandedDescription = [...expandedDescription];
        const newExpanded = newExpandedDescription[index];
        if (!newExpandedDescription[index]) {
            newExpandedDescription.fill(false);
        }
        newExpandedDescription[index] = !newExpanded;
        setExpandedDescription(newExpandedDescription);
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
                    if(progressNuevo.abandonada || progressNuevo.terminada) {
                        navigate('/home');
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
            if(progressNuevo.abandonada || progressNuevo.terminada) {
                navigate('/home');
            }
        }



    }


    const prevPeso = 16;

    function loadRutinas() {
        console.log("Load Rutinas", currentEntrenamiento?.rutinas);

        return currentEntrenamiento?.rutinas?.map((rutina, index) => (
            <div key={index}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: 'rgb(159, 28, 23)', color: 'white', fontWeight: 'bold', margin: '4px' }}
                    onClick={() => {
                        // Assuming seekTo is defined elsewhere
                        seekTo(rutina.segundoInicial);
                        handleExpandClickRutina(index);
                        console.log(index, 'index');
                    }}
                >
                    <KeyboardArrowRightIcon
                        style={{ color: 'rgb(256, 256, 256)', paddingBottom: '-20px', marginLeft: '-10px' }}
                    />
                    {rutina.nombre}
                </Button>
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
                                sx={
                                    {
                                        weight: '1px',
                                        height: '0.5px',
                                        backgroundColor: 'rgb(159, 28, 23)',
                                    }
                                } />

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
                                    {/* <CardActions> */}
                                    {/* <CssTextField
                                            style={{ color: 'white' }}
                                            readOnly
                                            // fullWidth
                                            name="pesos"
                                            label={prevPeso + " kg"}
                                            helperText="Peso anterior"
                                            FormHelperTextProps={{ style: { color: 'white' } }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        /> */}
                                    <Typography
                                        style={{
                                            color: 'white',
                                            fontSize: '0.9rem',
                                        }}
                                    >
                                        Peso anterior: {prevPeso} kg
                                    </Typography>
                                    {/* </CardActions> */}
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <CardActions>
                                        <CssTextField
                                            style={{ color: 'white' }}
                                            type="number"
                                            // fullWidth
                                            name="pesos"
                                            label="Peso (kg)"
                                            // value={userEdited.nombres}
                                            // onChange={handleNombreChange}
                                            helperText="Ingresa el peso que utilizaste"
                                            FormHelperTextProps={{ style: { color: 'white' } }}
                                        />
                                        <IconButton aria-label="enviar"
                                            sx={{ color: 'rgb(0,128,0) ', marginBottom: '15px' }}
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Peso registrado',
                                                    icon: 'success',
                                                    showCancelButton: true,
                                                    confirmButtonColor: 'rgb(0, 128, 0)',
                                                    showCancelButton: false,
                                                    confirmButtonText: '¡Entendido!'
                                                })
                                            }

                                                //something else
                                            }



                                        >
                                            <PlaylistAddCheckCircleIcon />
                                            {/* <PlaylistAddCheckCircleOutlinedIcon /> */}
                                            <br />
                                            <Typography
                                                style={{ color: 'rgb(0,128,0)', fontSize: '0.8rem', marginBottom: '40px', marginLeft: '-35px' }}
                                            >
                                                Registrar
                                            </Typography>
                                        </IconButton>
                                    </CardActions>
                                </Grid>

                            </Grid>

                            <Divider flexItem
                                sx={
                                    {
                                        weight: '1px',
                                        height: '0.5px',
                                        backgroundColor: 'rgb(159, 28, 23)',
                                    }
                                } />
                        </CardContent>
                    </Collapse>

                )}
            </div >
        )) || <>    </>;
    }





    const getVideoLink = async (auxEntrenamiento) => {

        const idVideo = auxEntrenamiento?.multimedia?.find(i => i.type === 'VIDEO')?.id || null;

        if (!idVideo) {
            setUrlVideo('https://www.youtube.com/watch?v=9bZkp7q19f0');
            return;
        }

        const blob = await fetchBlobWithAuth(`/multimedia/video/${idVideo}`);
        const objectURL = URL.createObjectURL(blob);
        setUrlVideo(objectURL);
    };


    return (
        <div className="contenthome">
            <Fade in={fadeLoad} timeout={600}>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
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
                        {urlVideo === '' ?

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
                                // url={URLVideo + ((currentEntrenamiento?.multimedia?.find(i => i.type === 'VIDEO')?.id) || (currentEntrenamiento?.multimedia?.find(i => i.type === 'VIDEO')?.id) || 'https://www.youtube.com/watch?v=9bZkp7q19f0')}
                                // url={'https://www.youtube.com/watch?v=9bZkp7q19f0'}
                                url={urlVideo}
                                controls={true}
                                width={'100%'}
                                height={'350px'}
                                // light={true}
                                style={{ background: 'linear-gradient(to bottom, rgb(0, 0, 0),rgb(159, 28, 23),rgb(0, 0, 0)' }}
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
                                {/* 
                                <Button
                                    variant="outlined"
                                    // color='rgb(159, 28, 23)'
                                    style={{ backgroundColor: 'rgb(0,0,0)', color: 'rgb(159, 28, 23)', fontWeight: 'bold', border: '1px solid rgb(159, 28, 23)' }}
                                // sx={{ mr: 'auto' }}
                                >
                                    Chat
                                </Button> */}

                                <br />

                                <Tooltip title="Finalizar entrenamiento">
                                    <IconButton aria-label="finalizar"
                                        sx={{ backgroundColor: 'rgb(0, 128, 0)', color: 'white', fontWeight: 'bold', margin: '4px' }}
                                        onClick={() => {
                                            Swal.fire({
                                                title: '¿Estás seguro de que deseas terminar este entrenamiento?',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: 'rgb(0, 128, 0)',
                                                cancelButtonColor: 'rgb(0, 0, 0)',
                                                confirmButtonText: '¡Sí, terminar entrenamiento!'
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
                                                    entrenamientoFinalizado.terminada = true;
                                                    updateCurrentProgress(entrenamientoFinalizado);
                                                }
                                            });
                                        }}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>

                                <br />

                                {/* <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton> */}
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
                                    {/* ¡Bienvenidos a nuestro Entrenamiento Completo para Todos los Niveles! Esta rutina de ejercicio de 30 minutos está diseñada para ayudarte a construir fuerza, aumentar la resistencia y mejorar la flexibilidad, todo desde la comodidad de tu hogar. Ya seas principiante o un entusiasta del fitness con experiencia, este entrenamiento se adapta a tus necesidades. */}
                                    Dia:
                                    {" " + currentEntrenamiento?.dia}
                                    <br />
                                    Estas entrenando en:
                                    {" " + currentEntrenamiento?.lugar}
                                </Typography>
                                <Typography
                                    style={{ color: 'white' }}
                                    paragraph>
                                    {/* En este video, harás:

                                    Calentamiento con estiramientos dinámicos para preparar tus músculos y articulaciones.
                                    Una serie de ejercicios con el peso corporal que trabajan todos los grupos musculares principales.
                                    Ejercicios con modificaciones para hacer cada movimiento más fácil o más desafiante.
                                    Enfriamiento con una serie de estiramientos para ayudar en la recuperación y mejorar la flexibilidad. */}
                                    Descripcion:
                                    <br />
                                    {currentEntrenamiento?.descripcion}
                                </Typography>
                                {/* <Typography
                                    style={{ color: 'white' }}
                                    paragraph>
                                    Lo que necesitas:

                                    Una esterilla o toalla para los ejercicios en el suelo.
                                    Una botella de agua para mantenerte hidratado.
                                    Opcional: Pesas ligeras o bandas de resistencia para mayor intensidad.
                                    Únete a nosotros y da un paso hacia una vida más saludable y fuerte. Recuerda escuchar a tu cuerpo, tomar descansos cuando sea necesario y, lo más importante, ¡diviértete! ¡Vamos a comenzar y a superar este entrenamiento juntos!
                                </Typography>
                                <Typography
                                    style={{ color: 'white' }}
                                >
                                    No olvides darle like, suscribirte y hacer clic en el icono de la campana para mantenerte al día con más videos de fitness. Comparte tu progreso y conéctate con nuestra comunidad usando #OneGymApp.
                                </Typography> */}
                            </CardContent>
                        </Collapse>
                    </Card>
                </div>
            </Grow >
        </div >
    );
}

export default ContentPlayer;
