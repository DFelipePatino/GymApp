import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './contentPlayer.css';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Fade, Grow, IconButton, LinearProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ReactPlayer from 'react-player'
import { Box } from '@mui/system';
import { FavoriteBorder } from '@mui/icons-material';

function ContentPlayer({ setPlayerLoad, playerLoad }) {

    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();


    const [fadeLoad, setfadeLoad] = useState(true)
    const [headerLoad, setHeaderLoad] = useState(false)

    const [folterLoad, setFilterLoad] = useState(false)

    const user = useSelector((state) => state.user);
    console.log(user, "this is the user");

    const lastCategory = localStorage.getItem("category")
    console.log(lastCategory, "this is the last category");

    const homeContent = localStorage.getItem("homeContent")
    console.log(homeContent, "this is the home content");

    useEffect(() => {
        setTimeout(() => {
            setfadeLoad(false)
        }, 900);
        setTimeout(() => {
            setPlayerLoad(true)
        }, 350);

        const localUser = localStorage.getItem("localUserName")
        // console.log(localUser, "lu en home");

        const verifyLogin = (localUser) => {
            if (!localUser) {
                navigate("/");
            }
        }
        verifyLogin(localUser);


        window.scrollTo(0, 0);

    }, [navigate, homeContent]);

    const category = localStorage.getItem("category");

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
                {...(headerLoad ? { timeout: 800 } : {})}
            >
                <div className='mediaPlayer' >
                    <Card
                        style={{ width: '94%', height: '80vh', backgroundColor: 'lightgrey' }}
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
                            url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
                            controls={true}
                            width={'100%'}
                            height={'50%'}
                        />
                        <CardContent
                            style={{ color: 'black', backgroundColor: '#D9D9D9' }}
                        >
                            <p>
                                Este ejercicio de pierna es muy efectivo para fortalecer los músculos de las piernas.
                                Se recomienda hacerlo 3 veces por semana.
                            </p>
                        </CardContent>

                        <CardActions
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap',
                            }}
                        >

                            <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
                                <FavoriteBorder />
                            </IconButton>

                            <Button variant="outlined"
                                color="primary"
                            >
                                Pesos
                            </Button>

                            <Button variant="outlined"
                                color="primary"
                            >
                                Tips
                            </Button>

                            <Button variant="outlined"
                                color="primary"
                            >
                                Ejemplos
                            </Button>

                            <Button variant="outlined"
                                color="primary"
                            >
                                Dieta
                            </Button>


                            <Button variant="outlined"
                                color="primary"
                            >
                                Timer
                            </Button>

                            <Button variant="contained"
                                color="primary"
                            // size="large"
                            >
                                Chat
                            </Button>

                            {/* <Divider orientation="vertical" flexItem />

                            <Button variant="outlined"
                                color="primary"
                            >
                                Chat
                            </Button> */}

                        </CardActions>

                    </Card>
                </div>
            </Grow>

        </div>
    );
}

export default ContentPlayer;