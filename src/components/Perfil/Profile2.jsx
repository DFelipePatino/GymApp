import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Avatar } from '@material-ui/core';
import './Profile2.css';
import { Button, Fade, Grid, Grow, LinearProgress, Slide } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import { infoCardsStyle, profile2divCardStyle, cardHeaderStyle, avatarStyle, buttonStyle, cardContentCard, infoCardsIconStyle } from './Profile2'
import { Troubleshoot } from '@mui/icons-material';
import { Box } from '@mui/system';
import profilePic from "/Perfil.png"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DropDownCategorias from './DropDownCategorias';


function Profile2({ userForTesting, BackToTopButton, name, headerMountIn, contentMountIn, setHeaderMountIn, setContentMountIn, navigateAway, setNavigateAway, todasLasCategotias, usuario }) {

    const navigate = useNavigate();

    const [fadeLoad, setfadeLoad] = useState(true)
    const [infoPremium, setInfoPremium] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        let fadeLoadTimeout = setTimeout(() => {
            setfadeLoad(false)
        }, 900);
        let headerMountTimeout, contentMountTimeout;
        if (navigateAway === false) {
            headerMountTimeout = setTimeout(() => {
                setHeaderMountIn(true)
            }, 300);
            contentMountTimeout = setTimeout(() => {
                setContentMountIn(true)
            }, 500);
        }

        // Cleanup function
        return () => {
            clearTimeout(fadeLoadTimeout);
            clearTimeout(headerMountTimeout);
            clearTimeout(contentMountTimeout);
        };
    }, [navigateAway, setHeaderMountIn, setContentMountIn]);




    return (
        <div
            // style={profile2divCardStyle}>
            className='profile2div'>
            {/* <Card */}
            {/* style={profile2divCardStyle}> */}

            <Fade in={fadeLoad} timeout={600}>

                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>

            </Fade>

            <div
                style={cardHeaderStyle}
            >
                <Slide
                    direction="right"
                    in={headerMountIn}
                    timeout={500}
                    mountOnEnter unmountOnExit>


                    <div className='container'>
                        <div className='gradiant'> </div>
                        <div className='profile'>

                            <img src={usuario.foto} alt="profilePic" />

                            <div className='name'>
                                {/* {`${userForTesting.Name}`} */}
                                {`${usuario.nombres}` + ' ' + `${usuario.apellidos}`}
                            </div>


                            {infoPremium && usuario.accountType === "FREE" ? (

                                <>

                                    <div className='contact'>

                                        <Button
                                            style={buttonStyle}
                                            variant='contained'
                                            onClick={() => {
                                                window.scroll({ top: 0, behavior: 'smooth' });
                                                // setTimeout(() => {
                                                setHeaderMountIn(false);
                                                // }, 200);
                                                setTimeout(() => {
                                                    setInfoPremium(false)
                                                }, 400);
                                                setTimeout(() => {
                                                    setHeaderMountIn(true)
                                                }, 800);
                                                // setTimeout(() => {
                                                // setInfoPremium(true)
                                                // }, 600);
                                            }}
                                        >
                                            <ArrowBackIosNewIcon />
                                            Back
                                        </Button>


                                        <Button
                                            style={buttonStyle}
                                            variant='contained'
                                            onClick={() => {
                                                window.scroll({ top: 0, behavior: 'smooth' });
                                                setTimeout(() => {
                                                    setNavigateAway(true);
                                                }, 200);
                                                setTimeout(() => {
                                                    setHeaderMountIn(false)
                                                }, 250);
                                                setTimeout(() => {
                                                    setContentMountIn(false)
                                                }, 300);
                                                setTimeout(() => {
                                                    navigate('/profileedit')
                                                    // navigate('/registro')
                                                }, 600);
                                            }}
                                        >
                                            Editar
                                            <br />
                                            <EditIcon />
                                        </Button>
                                    </div>

                                    <div
                                        className='lastDiv'
                                    >
                                        <Card style={infoCardsIconStyle}>
                                            <PictureAsPdfTwoToneIcon />
                                            <Link to={userForTesting.DietPlan} target='blank'>
                                                <Button
                                                    style={{ color: 'white' }}
                                                >
                                                    Plan de dieta
                                                </Button>
                                            </Link>
                                        </Card>

                                    </div>

                                    <div
                                        className='userInfoDiv'
                                    >


                                        {/* <Card /> */}

                                        {/* <div className='cardContent'> */}
                                        {/* <Card style={cardContentCard}> */}
                                        <Grid container spacing={1}>
                                            {/* <div className='description2'> */}
                                            {Object.entries(userForTesting).map(([key, value], index) => {
                                                if (key !== 'DietPlan' && key !== 'ProfilePicture' && key !== 'Entrenamiento' && key !== 'Name' && key !== 'Email' && key !== 'Premium' && key !== 'Objetivo' && key !== 'Age' && key !== 'DOB' && key !== 'Gender') {
                                                    return (
                                                        <Grid item xs={12} sm={6}
                                                            style={{ paddingLeft: '70px', fontSize: '0.8rem' }}
                                                            key={index}>

                                                            <h2>{key}:</h2>
                                                            {value}
                                                            <br />
                                                            <br />

                                                            {/* <p><strong>{key}:</strong> {value}</p> */}
                                                        </Grid>
                                                    );
                                                }
                                                return null;
                                            })}
                                            {/* </div> */}
                                        </Grid>
                                        {/*  </Card> */}

                                    </div>


                                </>


                            ) : (

                                <>
                                    <div className='description'>
                                        <h2>Info:</h2>
                                        {`${usuario.email}`}
                                        <br />
                                        {`${usuario.accountType}`}
                                        <br />
                                        {`${usuario.state}`}
                                        <br />
                                        <br />

                                        {/* <DropDownCategorias
                                            userForTesting={userForTesting}
                                            todasLasCategotias={todasLasCategotias}
                                        /> */}

                                        <h2>Entrenamiento:</h2>
                                        {`${userForTesting.Entrenamiento}`}
                                        <br />
                                        <br />
                                        <h2>Objetivos:</h2>
                                        {`${userForTesting.Objetivo}`}
                                    </div>




                                    <div className='contact'>

                                        {userForTesting.Premium ? (<Button
                                            style={buttonStyle}
                                            variant='contained'
                                            onClick={() => {
                                                window.scroll({ top: 0, behavior: 'smooth' });
                                                // setTimeout(() => {
                                                setHeaderMountIn(false);
                                                // }, 200);
                                                setTimeout(() => {
                                                    setInfoPremium(true)
                                                }, 400);
                                                setTimeout(() => {
                                                    setHeaderMountIn(true)
                                                }, 800);
                                                // setTimeout(() => {
                                                // setInfoPremium(true)
                                                // }, 600);
                                            }}
                                        >
                                            <ArrowForwardIosIcon />
                                            Premium
                                        </Button>) : (null)}




                                        <Button
                                            style={buttonStyle}
                                            variant='contained'
                                            onClick={() => {
                                                window.scroll({ top: 0, behavior: 'smooth' });
                                                setTimeout(() => {
                                                    setNavigateAway(true);
                                                }, 200);
                                                setTimeout(() => {
                                                    setHeaderMountIn(false)
                                                }, 250);
                                                setTimeout(() => {
                                                    setContentMountIn(false)
                                                }, 300);
                                                setTimeout(() => {
                                                    navigate('/profileedit')
                                                    // navigate('/registro')
                                                }, 600);
                                            }}
                                        >
                                            Editar
                                            <br />
                                            <EditIcon />
                                        </Button>
                                    </div>

                                </>


                            )}

                        </div>

                    </div>






                    {/* <CardHeader
                        // style={cardHeaderStyle}
                        avatar={
                            <Avatar
                                alt={name} src={userForTesting.profilePicture}
                                style={avatarStyle}
                            />
                        }
                        title={name}
                        subheader={`${userForTesting.email}`}
                        titleTypographyProps={{ variant: 'h5', style: { color: 'rgb(146, 144, 144)' } }}
                        subheaderTypographyProps={{ variant: 'subtitle1', style: { color: 'rgb(146, 144, 144)' } }}
                    /> */}
                </Slide>



            </div >

            {/* {userForTesting.premium ? (



            ): (null)} */}

            {/* {userForTesting.premium ? (

                <Fade
                    in={contentMountIn}
                >

                    <div
                        className='lastDiv'
                    >

                        <Card style={infoCardsIconStyle}>
                            <PictureAsPdfTwoToneIcon />
                            <Link to={userForTesting.dietPlan} target='blank'>
                                <Button
                                    style={{ color: 'black' }}
                                >
                                    Plan de dieta
                                </Button>
                            </Link>
                        </Card>


                    </div>
                </Fade >

            ) : (null)} */}

        </div >
    );
}

export default Profile2;