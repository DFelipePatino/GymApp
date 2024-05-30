import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './contentPlayer.css';
import { Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider, Fade, Grow, IconButton, LinearProgress, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ReactPlayer from 'react-player'
import { Box, margin } from '@mui/system';
import { ExpandMore, FavoriteBorder } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ContentPlayer({ setPlayerLoad, playerLoad }) {

    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();


    const [fadeLoad, setfadeLoad] = useState(true)
    const [headerLoad, setHeaderLoad] = useState(false)

    const user = useSelector((state) => state.user);

    const lastCategory = localStorage.getItem("category")

    const homeContent = localStorage.getItem("homeContent")

    useEffect(() => {
        let fadeLoadTimeout = setTimeout(() => {
            setfadeLoad(false)
        }, 900);
        let playerLoadTimeout = setTimeout(() => {
            setPlayerLoad(true)
        }, 350);

        const localUser = localStorage.getItem("localUserName")

        const verifyLogin = (localUser) => {
            if (!localUser) {
                navigate("/");
            }
        }
        verifyLogin(localUser);

        window.scrollTo(0, 0);

        // Cleanup function
        return () => {
            clearTimeout(fadeLoadTimeout);
            clearTimeout(playerLoadTimeout);
        };
    }, [navigate, homeContent]);



    const category = localStorage.getItem("category");

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (expanded === false) {
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
        else if (expanded === true) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const buttonStyle = {
        margin: '4px',
    }

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
                <div className='mediaPlayer' >
                    <Card
                        style={{ width: '94%', height: 'auto', backgroundColor: 'lightgrey' }}
                    >
                        <CardHeader
                            action={
                                <div
                                    style={{ marginTop: '6px', fontSize: '1.5rem', padding: '4px' }}
                                >
                                    {`Ejercicios de ${category}`}
                                </div>
                            }
                            title={
                                <div>
                                    <IconButton aria-label="regresar"
                                        style={{ fontSize: '0.8rem' }}
                                        onClick={() => {
                                            localStorage.setItem("homeContent", "goBack");
                                            localStorage.setItem("categorytoDispatch", `${lastCategory}`);
                                            // aqui debe ir la categoria anterior
                                            setPlayerLoad(false)
                                            setTimeout(() => {
                                                navigate("/home");
                                            }, 200);
                                        }}
                                    >
                                        <ArrowBackIosNewIcon />
                                        Regresar
                                    </IconButton>
                                </div>
                            }
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 0px',
                                paddingRight: '100px',
                            }}
                        />
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=HQfF5XRVXjU&ab_channel=DavidHo'
                            controls={true}
                            width={'100%'}
                            height={'350px'}
                        />
                        {/* <CardContent
                            style={{ color: 'black', backgroundColor: '#D9D9D9' }}
                        >
                            <p>
                                Este ejercicio de pierna es muy efectivo para fortalecer los músculos de las piernas.
                                Se recomienda hacerlo 3 veces por semana.
                            </p>
                        </CardContent> */}

                        <CardActions
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap',
                            }}
                        >
                            {/* 
                            <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
                                <FavoriteBorder />
                            </IconButton> */}



                            <Button variant="outlined"
                                color="primary"
                                style={buttonStyle}
                            >
                                Pesos
                            </Button>

                            <Button variant="outlined"
                                color="primary"
                                style={buttonStyle}
                            >
                                Tips
                            </Button>

                            <Button variant="outlined"
                                color="primary"
                                style={buttonStyle}
                            >
                                Ejemplos
                            </Button>

                            <Button variant="outlined"
                                color="primary"
                                style={buttonStyle}
                            >
                                Dieta
                            </Button>


                            <Button variant="outlined"
                                color="primary"
                                style={buttonStyle}
                            >
                                Timer
                            </Button>

                            <Button variant="contained"
                                color="primary"
                                // style={buttonStyle}
                                sx={{ mr: 'auto' }}
                            >
                                Chat
                            </Button>

                            <Divider orientation="vertical" flexItem />

                            {/*  <Button variant="outlined"
                                color="primary"
                            >
                                Chat
                            </Button> */}

                            {/* </CardActions> */}

                            {/* <CardActions disableSpacing> */}

                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expanded ? 'true' : undefined}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                sx={{ ml: '20px', mr: '20px', color: 'grey' }}
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>

                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Descripcion:</Typography>
                                <Typography paragraph>
                                    ¡Bienvenidos a nuestro Entrenamiento Completo para Todos los Niveles! Esta rutina de ejercicio de 30 minutos está diseñada para ayudarte a construir fuerza, aumentar la resistencia y mejorar la flexibilidad, todo desde la comodidad de tu hogar. Ya seas principiante o un entusiasta del fitness con experiencia, este entrenamiento se adapta a tus necesidades.
                                </Typography>
                                <Typography paragraph>
                                    En este video, harás:

                                    Calentamiento con estiramientos dinámicos para preparar tus músculos y articulaciones.
                                    Una serie de ejercicios con el peso corporal que trabajan todos los grupos musculares principales.
                                    Ejercicios con modificaciones para hacer cada movimiento más fácil o más desafiante.
                                    Enfriamiento con una serie de estiramientos para ayudar en la recuperación y mejorar la flexibilidad.
                                </Typography>
                                <Typography paragraph>
                                    Lo que necesitas:

                                    Una esterilla o toalla para los ejercicios en el suelo.
                                    Una botella de agua para mantenerte hidratado.
                                    Opcional: Pesas ligeras o bandas de resistencia para mayor intensidad.
                                    Únete a nosotros y da un paso hacia una vida más saludable y fuerte. Recuerda escuchar a tu cuerpo, tomar descansos cuando sea necesario y, lo más importante, ¡diviértete! ¡Vamos a comenzar y a superar este entrenamiento juntos!
                                </Typography>
                                <Typography>
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