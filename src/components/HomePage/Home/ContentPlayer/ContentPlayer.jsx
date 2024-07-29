import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './contentPlayer.css';
import { Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider, Fade, Grow, IconButton, LinearProgress, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReactPlayer from 'react-player'
import { Box } from '@mui/system';
import { ExpandMore, FavoriteBorder, Gradient } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchBlobWithAuth } from '../../../../multimediaUtils';

function ContentPlayer({ setPlayerLoad, playerLoad }) {

    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    const [fadeLoad, setfadeLoad] = useState(true);
    const [headerLoad, setHeaderLoad] = useState(false);
    const [urlVideo, setUrlVideo] = useState('');

    const user = useSelector((state) => state.user);

    const entrenamientoSeleccionado = useSelector((state) => state.selectedEntrenamiento);

    const entrenamientoSeleccionadoLocalStorage = JSON.parse(localStorage.getItem("entrenamientoSeleccionado"));
    console.log(entrenamientoSeleccionadoLocalStorage, 'entrenamientoSeleccionadoLocalStorage');

    const homeContent = localStorage.getItem("homeContent");

    const URLVideo = 'http://213.218.240.192:8082/onegym-back/api/multimedia/video/';

    useEffect(() => {
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

    const category = localStorage.getItem("category");

    const [expanded, setExpanded] = React.useState(true);
    const [expanded2, setExpanded2] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (expanded === false) {
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
        else if (expanded === true) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const rutinaID = entrenamientoSeleccionadoLocalStorage.rutinas.map((rutina) => rutina.id - 1);

    const handleExpandClick2 = (index) => {
        if (rutinaID.includes(index)) {
            setExpanded2(!expanded2);
            if (expanded2 === false) {
                window.scrollTo({ top: 400, behavior: 'smooth' });
            }
            else if (expanded2 === true) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
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

    let rutinasButtons = entrenamientoSeleccionadoLocalStorage.rutinas ? entrenamientoSeleccionadoLocalStorage?.rutinas?.map((rutina, index) => {
        return (
            <>
                <Button
                    variant="contained"
                    style={{ backgroundColor: 'rgb(159, 28, 23)', color: 'white', fontWeight: 'bold', margin: '4px' }}
                    key={index}
                    onClick={() => {
                        seekTo(rutina.segundoInicial);
                        handleExpandClick2(index)
                        console.log(index, 'index');
                    }}
                >
                    <KeyboardArrowRightIcon
                        style={{ color: 'rgb(256, 256, 256)', paddingBottom: '-20px', marginLeft: '-10px' }}
                    />
                    {rutina.nombre}

                </Button>

                {rutina.nombre ? (

                    <>


                        <Collapse in={expanded2} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph
                                    style={{ color: 'white' }}
                                >Descripcion:</Typography>
                                <Typography
                                    style={{ color: 'white' }}
                                    paragraph>
                                    {rutina.nombre}
                                </Typography>

                            </CardContent>
                        </Collapse>
                    </>
                ) : null}
            </>
        );
    }) : entrenamientoSeleccionadoLocalStorage?.rutinas?.map((rutina, index) => {
        return (
            <Button
                variant="contained"
                style={{ backgroundColor: 'rgb(159, 28, 23)', color: 'white', fontWeight: 'bold', margin: '4px' }}

                key={index}
                // expand={expanded ? 'true' : undefined}
                // onClick={() => {
                //     handleExpandClick2();
                //     seekTo(rutina.seekTime);
                //     console.log('rutina.seekTime');
                // }}
                onClick={
                    handleExpandClick2
                }
            >
                {rutina.nombre}
            </Button>
        );
    });

    const getVideoLink = async () => {

        const idVideo = entrenamientoSeleccionadoLocalStorage?.multimedia?.find(i => i.type === 'VIDEO')?.id || null;

        if (!idVideo) {
            setUrlVideo('https://www.youtube.com/watch?v=9bZkp7q19f0');
            return;
        }

        const blob = await fetchBlobWithAuth(`/multimedia/video/${idVideo}`);
        const objectURL = URL.createObjectURL(blob);
        setUrlVideo(objectURL);
    };


    useEffect(() => {
        getVideoLink();
    }, []);

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
                                    {entrenamientoSeleccionadoLocalStorage.nombre ? entrenamientoSeleccionadoLocalStorage?.nombre : entrenamientoSeleccionadoLocalStorage?.nombre}
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
                        <ReactPlayer
                            ref={playerRef}
                            // url={URLVideo + ((entrenamientoSeleccionado?.multimedia?.find(i => i.type === 'VIDEO')?.id) || (entrenamientoSeleccionadoLocalStorage?.multimedia?.find(i => i.type === 'VIDEO')?.id) || 'https://www.youtube.com/watch?v=9bZkp7q19f0')}
                            // url={'https://www.youtube.com/watch?v=9bZkp7q19f0'}
                            url={urlVideo}
                            controls={true}
                            width={'100%'}
                            height={'350px'}
                            // light={true}
                            style={{ background: 'linear-gradient(to bottom, rgb(0, 0, 0),rgb(159, 28, 23),rgb(0, 0, 0)' }}
                        />

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

                            {rutinasButtons}

                            <br />

                            <div
                                style={{ display: 'flex', width: '100%' }}
                            >

                                <Button
                                    variant="outlined"
                                    // color='rgb(159, 28, 23)'
                                    style={{ backgroundColor: 'rgb(0,0,0)', color: 'rgb(159, 28, 23)', fontWeight: 'bold', border: '1px solid rgb(159, 28, 23)' }}
                                // sx={{ mr: 'auto' }}
                                >
                                    Chat
                                </Button>

                                <Divider orientation="vertical" flexItem />

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
                                    sx={{ ml: '50px', mt: '5px', color: 'rgb(159, 28, 23)' }}
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>

                            </div>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph
                                    style={{ color: 'white' }}
                                >Descripcion:</Typography>
                                <Typography
                                    style={{ color: 'white' }}
                                    paragraph>
                                    ¡Bienvenidos a nuestro Entrenamiento Completo para Todos los Niveles! Esta rutina de ejercicio de 30 minutos está diseñada para ayudarte a construir fuerza, aumentar la resistencia y mejorar la flexibilidad, todo desde la comodidad de tu hogar. Ya seas principiante o un entusiasta del fitness con experiencia, este entrenamiento se adapta a tus necesidades.
                                </Typography>
                                <Typography
                                    style={{ color: 'white' }}
                                    paragraph>
                                    En este video, harás:

                                    Calentamiento con estiramientos dinámicos para preparar tus músculos y articulaciones.
                                    Una serie de ejercicios con el peso corporal que trabajan todos los grupos musculares principales.
                                    Ejercicios con modificaciones para hacer cada movimiento más fácil o más desafiante.
                                    Enfriamiento con una serie de estiramientos para ayudar en la recuperación y mejorar la flexibilidad.
                                </Typography>
                                <Typography
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
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </div>
            </Grow>
        </div>
    );
}

export default ContentPlayer;
