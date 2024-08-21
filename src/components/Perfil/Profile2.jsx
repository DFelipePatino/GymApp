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
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function Profile2({ userForTesting, BackToTopButton, name, headerMountIn, contentMountIn, setHeaderMountIn, setContentMountIn, navigateAway, setNavigateAway, todasLasCategotias, usuario, reload }) {

    const navigate = useNavigate();

    const localUserName = usuario?.nombres + ' ' + usuario?.apellidos;
    console.log(localUserName, 'localUserName en layout');


    const userInitials = localUserName?.split(' ').map((n) => n ? n[0].toUpperCase() : '').join('');
    console.log(userInitials, 'userInitials');

    const [fadeLoad, setfadeLoad] = useState(true)
    const [infoPremium, setInfoPremium] = useState(false)

    const reLoad = reload

    const shouldReload = (reLoad) => {
        console.log('reload:', reLoad);
        if (reLoad) {
            window.location.reload();
        }
    };

    useEffect(() => {
        shouldReload(reLoad);
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
    }, [navigateAway, setHeaderMountIn, setContentMountIn, reLoad]);


    const [usuarioDOB, setUsuarioDOB] = useState('')
    const [showLink, setShowLink] = useState(false)

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });



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

                            <img src={usuario.foto} alt={userInitials} />

                            <div className='name'>
                                {/* {`${userForTesting.Name}`} */}
                                {`${usuario.nombres}` + ' ' + `${usuario.apellidos}`}
                            </div>


                            {infoPremium && usuario.accountType !== "FREE" ? ( //this is hard coded for testing purposes

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

                                        {/* 
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
                                        </Button> */}
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
                                                    Instructivo
                                                </Button>
                                            </Link>
                                        </Card>

                                    </div>

                                    {/* <div
                                        className='userInfoDiv'

                                    > */}

                                    <div
                                        className='lastDiv'
                                    >

                                        <div
                                            style={{ display: 'flex', space: 'between' }}>

                                            <Grid container spacing={1}>
                                                <Grid item xs={6} sm={6}>
                                                    <Button
                                                        style={buttonStyle}
                                                        variant='contained'
                                                    // onClick={() => {
                                                    //     window.scroll({ top: 0, behavior: 'smooth' });
                                                    // }}
                                                    >
                                                        {/* <ArrowBackIosNewIcon /> */}
                                                        Premium
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} sm={6}>
                                                    <Button
                                                        style={buttonStyle}
                                                        variant='contained'
                                                    // onClick={() => {
                                                    //     window.scroll({ top: 0, behavior: 'smooth' });
                                                    // }}
                                                    >
                                                        {/* <ArrowBackIosNewIcon /> */}
                                                        Basic
                                                    </Button>
                                                </Grid>
                                            </Grid>


                                        </div>

                                            <br />
                                  
                                        <FormControl>
                                            <FormLabel id="demo-form-control-label-placement">Selecciona tu plan</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-form-control-label-placement"
                                                name="position"
                                                defaultValue="top"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    flexWrap: 'nowrap'
                                                }}
                                            >
                                                <FormControlLabel
                                                    value="3"
                                                    control={<Radio
                                                        onClick={() => setShowLink(3)}
                                                    //     sx={{
                                                    //     color: "rgb(256, 256, 256)",
                                                    //     '&.Mui-checked': {
                                                    //         color: pink[600],
                                                    //     },
                                                    // }} 
                                                    />}
                                                    label="3"
                                                    labelPlacement="top"
                                                />
                                                <FormControlLabel
                                                    value="6"
                                                    control={<Radio
                                                        onClick={() => setShowLink(6)}
                                                    />}
                                                    label="6"
                                                    labelPlacement="top"
                                                />
                                                <FormControlLabel
                                                    value="12"
                                                    control={<Radio
                                                        onClick={() => setShowLink(12)}
                                                    />}
                                                    label="12"
                                                    labelPlacement="top"
                                                />

                                            </RadioGroup>
                                        </FormControl>
                                    </div >

                                    {showLink === 3 ? (
                                        <a href="https://example.com" target="_blank" rel="noopener noreferrer">External Link 1</a>



                                    ) : showLink === 6 ? (
                                        <a href="https://example.com" target="_blank" rel="noopener noreferrer">External Link 2</a>



                                    ) :

                                        showLink === 12 ? (
                                            <a href="https://example.com" target="_blank" rel="noopener noreferrer">External Link 3</a>



                                        ) :


                                            (null)}

                                    {/* <Card /> */}

                                    {/* <div className='cardContent'> */}
                                    {/* <Card style={cardContentCard}> */}
                                    {/* <Grid container spacing={1}> */}
                                    {/* <div className='description2'> */}
                                    {/* {Object.entries(userForTesting).map(([key, value], index) => {
                                                if (key !== 'DietPlan' && key !== 'ProfilePicture' && key !== 'Entrenamiento' && key !== 'Name' && key !== 'Email' && key !== 'Premium' && key !== 'Objetivo' && key !== 'Age' && key !== 'DOB' && key !== 'Gender') {
                                                    return (
                                                        <Grid item xs={12} sm={6}
                                                            style={{ paddingLeft: '70px', fontSize: '0.8rem' }}
                                                            key={index}>

                                                            <h2>{key}:</h2>
                                                            {value}
                                                            <br />
                                                            <br /> */}

                                    {/* <p><strong>{key}:</strong> {value}</p> */}
                                    {/* </Grid>
                                                    );
                                                }
                                                return null;
                                            })} */}
                                    {/* </div> */}
                                    {/* </Grid> */}
                                    {/*  </Card> */}


                                    {/* </div> */}

                                </>


                            ) : (

                                <>
                                    <div className='description'>
                                        <h2>Info:</h2>
                                        {`Edad: ${usuario.age}`}
                                        <br />
                                        {`Genero: ${usuario.genero}`}
                                        <br />
                                        {`Email: ${usuario.email}`}
                                        <br />
                                        {`Suscripcion: ${usuario.accountType}`}
                                        <br />
                                        {`Estado: ${usuario.state}`}
                                        <br />
                                        <br />

                                        {/* <DropDownCategorias
                                            userForTesting={userForTesting}
                                            todasLasCategotias={todasLasCategotias}
                                        /> */}

                                        {/* <h2>Entrenamiento:</h2>
                                        {`${userForTesting.Entrenamiento}`}
                                        <br /> */}
                                        <br />
                                        <h2>Objetivos:</h2>
                                        {`${usuario.categorias.map((categoria) => { return ' ' + categoria.nombre })}`}
                                    </div>




                                    <div className='contact'>

                                        {usuario.accountType ? (<Button
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
                </Slide >



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