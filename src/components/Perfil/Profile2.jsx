import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Avatar } from '@material-ui/core';
import './Profile2.css';
import { Button, Divider, Fade, Grid, Grow, LinearProgress, Slide } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import { infoCardsStyle, profile2divCardStyle, cardHeaderStyle, avatarStyle, buttonStyle, cardContentCard, infoCardsIconStyle } from './Profile2'
import { Troubleshoot } from '@mui/icons-material';
import { Box } from '@mui/system';
import profilePic from "/Perfil.png"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DropDownCategorias from './DropDownCategorias';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { toggleDrawer } from '../HomePage/CardDrawer/CardDrawer';
import CardDrawer from '../HomePage/CardDrawer/CardDrawer';


function Profile2({ BackToTopButton, name, headerMountIn, contentMountIn, setHeaderMountIn, setContentMountIn, navigateAway, setNavigateAway, todasLasCategotias, usuario, reload, setInfoPremium, infoPremium }) {

    const navigate = useNavigate();

    console.log(usuario, 'usuario en Profile2');


    const localUserName = usuario?.nombres + ' ' + usuario?.apellidos;
    const tipoDeCuenta = usuario?.accountType === "GENERAL" ? 'BASIC' : usuario?.accountType;
    const formattedExpitarion = new Date(usuario.fechaExpiracionPlan).toLocaleDateString();

    const userInitials = localUserName?.split(' ').map((n) => n ? n[0].toUpperCase() : '').join('');
    console.log(userInitials, 'userInitials');

    const [fadeLoad, setfadeLoad] = useState(true)
    const [activeButton, setActiveButton] = useState("");
    const [showInstructions, setShowInstructions] = useState(false);
    const [showPlanDeDieta, setShowPlanDeDieta] = useState(false);
    const [planLength, setPlanLength] = useState(false);
    const [showLink, setShowLink] = useState(false);
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [displayLink, setDisplayLink] = useState(false);

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


    const planLengthAnimation = () => {
        setDisplayLink(false);
        setTimeout(() => {
            setDisplayLink(true);
        }, 800);
    };


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        planLengthAnimation();
    };


    const handlePlanChange = (button) => {
        planLengthAnimation();
        setPlanLength(true);
        setTimeout(() => {
            setActiveButton(button);
        }, 800);
    };

    const handleClick = () => {
        setShowInstructions(true);
        toggleDrawer(true)();
    }


    return (
        <div className='profile2div'>

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

                            <div class="profile-image-container">
                                <img src={usuario.foto} alt={userInitials} />
                            </div>

                            <br />

                            <div className='name'>
                                {`${localUserName}`}
                            </div>


                            {infoPremium && usuario.accountType !== "FREE" ? (

                                <>


                                    <div
                                        className='lastDiv'
                                    >
                                        <Card style={infoCardsIconStyle}>
                                            {/* <PictureAsPdfTwoToneIcon /> */}
                                            <ListAltIcon />
                                            {/* <Link to={userForTesting.DietPlan} target='blank'> */}
                                            <Button
                                                style={{ color: 'white' }}
                                                onClick={() => {
                                                    handleClick();
                                                }}
                                            >
                                                Instructivo
                                            </Button>
                                            {/* </Link> */}
                                        </Card>

                                    </div>

                                    <Divider
                                        sx={{
                                            weight: '1px',
                                            height: '0.5px',
                                            backgroundColor: 'rgb(159, 28, 23)',
                                        }} />

                                    <br />


                                    <FormLabel id="form-control"
                                        sx={{ color: 'white', display: 'flex', justifyContent: 'center' }}
                                    >Selecciona tu tipo de plan:
                                    </FormLabel>

                                    <div className='contact'
                                    >
                                        <Button
                                            style={{
                                                fontSize: '16px',
                                                paddingTop: '8px',
                                                paddingBottom: '10px',
                                                borderRadius: '40px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                backgroundColor: activeButton === 'Premium' ? 'rgb(159, 28, 23)' : 'rgb(146, 144, 144)',
                                                color: 'white'
                                            }}
                                            onClick={() => handlePlanChange('Premium')}
                                            variant='contained'
                                        >
                                            {/* <ArrowBackIosNewIcon /> */}
                                            Premium
                                        </Button>

                                        <Button
                                            style={{
                                                fontSize: '16px',
                                                paddingTop: '8px',
                                                paddingBottom: '10px',
                                                borderRadius: '40px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                backgroundColor: activeButton === 'Basic' ? 'rgb(159, 28, 23)' : 'rgb(146, 144, 144)',
                                                color: 'white'
                                            }}
                                            onClick={() => handlePlanChange('Basic')}
                                            variant='contained'
                                        >
                                            {/* <ArrowBackIosNewIcon /> */}
                                            Basico
                                        </Button>


                                    </div>

                                    <br />
                                    <Divider
                                        sx={{
                                            weight: '1px',
                                            height: '0.5px',
                                            backgroundColor: 'rgb(159, 28, 23)',
                                        }} />

                                    {activeButton !== "" ? (


                                        <div
                                            className='lastDiv'
                                        >


                                            <Fade in={planLength} timeout={800}>

                                                <FormControl>
                                                    <FormLabel id="form-control"
                                                        sx={{ color: 'white' }}
                                                    >Selecciona la duracion {<br />} del plan {activeButton}:
                                                    </FormLabel>
                                                    <br />

                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="form-control"
                                                        name="position"
                                                        defaultValue="3"
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-around',
                                                            flexWrap: 'nowrap'
                                                        }}
                                                    >
                                                        {activeButton === 'Basic' ? (
                                                            <FormControlLabel
                                                                value="1"
                                                                control={<Radio
                                                                    onClick={() =>
                                                                        setTimeout(() => {
                                                                            setShowLink(1)
                                                                        }, 600)}

                                                                    sx={{
                                                                        color: "rgb(256, 256, 256)",
                                                                        '&.Mui-checked': {
                                                                            color: "rgb(159, 28, 23)",
                                                                        },
                                                                    }}
                                                                />}
                                                                label="1"
                                                                labelPlacement="top"
                                                                checked={selectedValue === '1'}
                                                                onChange={handleChange}
                                                            />
                                                        ) : null}

                                                        {activeButton === 'Premium' ? (
                                                            <FormControlLabel
                                                                value="3"
                                                                control={<Radio
                                                                    onClick={() =>
                                                                        setTimeout(() => {
                                                                            setShowLink(3)
                                                                        }, 600)}
                                                                    sx={{
                                                                        color: "rgb(256, 256, 256)",
                                                                        '&.Mui-checked': {
                                                                            color: "rgb(159, 28, 23)",
                                                                        },
                                                                    }}
                                                                />}
                                                                label="3"
                                                                labelPlacement="top"
                                                                checked={selectedValue === '3'}
                                                                onChange={handleChange}
                                                            />
                                                        ) : null}

                                                        <FormControlLabel
                                                            value="6"
                                                            control={<Radio
                                                                onClick={() =>
                                                                    setTimeout(() => {
                                                                        setShowLink(6)
                                                                    }, 600)}
                                                                sx={{
                                                                    color: "rgb(256, 256, 256)",
                                                                    '&.Mui-checked': {
                                                                        color: "rgb(159, 28, 23)",
                                                                    },
                                                                }}
                                                            />}
                                                            label="6"
                                                            labelPlacement="top"
                                                            checked={selectedValue === '6'}
                                                            onChange={handleChange}
                                                        />
                                                        <FormControlLabel
                                                            value="12"
                                                            control={<Radio
                                                                onClick={() =>
                                                                    setTimeout(() => {
                                                                        setShowLink(12)
                                                                    }, 600)}
                                                                sx={{
                                                                    color: "rgb(256, 256, 256)",
                                                                    '&.Mui-checked': {
                                                                        color: "rgb(159, 28, 23)",
                                                                    },
                                                                }}
                                                            />}
                                                            label="12"
                                                            labelPlacement="top"
                                                            checked={selectedValue === '12'}
                                                            onChange={handleChange}
                                                        />

                                                    </RadioGroup>
                                                </FormControl>

                                            </Fade>



                                        </div >
                                    ) : <br />}

                                    {activeButton === "Premium" && showLink === 3 ? (
                                        <Fade in={displayLink} timeout={400}>

                                            <div className='link'>
                                                <a href="https://checkout.bold.co/payment/LNK_RQR0AJZR11" target="_blank" rel="noopener noreferrer">Premium de 3 meses <ArrowOutwardIcon /> </a>
                                            </div>

                                        </Fade>

                                    ) : activeButton === "Premium" && showLink === 6 ? (

                                        <Fade in={displayLink} timeout={400}>
                                            <div className='link'>
                                                <a href="https://checkout.bold.co/payment/LNK_CAQS6CWBIF" target="_blank" rel="noopener noreferrer">Premium de 6 meses <ArrowOutwardIcon /></a>
                                            </div>


                                        </Fade>

                                    ) : activeButton === "Premium" && showLink === 12 ? (

                                        <Fade in={displayLink} timeout={400}>

                                            <div className='link'>
                                                <a href="https://checkout.bold.co/payment/LNK_ZYU6G0PEA3" target="_blank" rel="noopener noreferrer">Premium de 12 meses <ArrowOutwardIcon /></a>
                                            </div>

                                        </Fade>

                                    ) : activeButton === "Basic" && showLink === 1 ? (

                                        <Fade in={displayLink} timeout={400}>

                                            <div className='link'>
                                                <a href="https://checkout.bold.co/payment/LNK_TRZQRYD07V" target="_blank" rel="noopener noreferrer">Basico de 1 mese <ArrowOutwardIcon /></a>
                                            </div>
                                        </Fade>

                                    ) : activeButton === "Basic" && showLink === 6 ? (
                                        <Fade in={displayLink} timeout={400}>
                                            <div className='link'>
                                                <a href="https://checkout.bold.co/payment/LNK_U3DQ8U24CM" target="_blank" rel="noopener noreferrer">Basico de 6 meses <ArrowOutwardIcon /></a>
                                            </div>
                                        </Fade>

                                    ) : activeButton === "Basic" && showLink === 12 ? (
                                        <Fade in={displayLink} timeout={400}>
                                            <div className='link'>
                                                <a href="https://checkout.bold.co/payment/LNK_JF0U1E5QXP" target="_blank" rel="noopener noreferrer">Basico de 12 meses <ArrowOutwardIcon /></a>
                                            </div>
                                        </Fade>

                                    ) :
                                        <div className='noLink'>
                                            <a rel="noopener noreferrer">Aqui verás tu link de pago </a>
                                        </div>
                                    }
                                    <br />

                                    <CardDrawer showInstructions={showInstructions} />

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
                                        <br />
                                        {`Suscripcion: ${tipoDeCuenta}`}
                                        <br />
                                        {`Estado: ${usuario.state}`}
                                        <br />
                                        {`Valido hasta: ${formattedExpitarion}`}
                                        <br />
                                        <br />

                                        {usuario.accountType === "PREMIUM" ? (
                                            <>
                                                {`Talla: ${usuario.talla ? usuario.talla + " cm" : ''}`}
                                                <br />
                                                {`Peso: ${usuario.peso ? usuario.peso + " kg" : ''}`}
                                                <br />
                                                {`Patologias: ${usuario.patologias ? usuario.patologias : ''}`}
                                                <br />
                                                {`Fracturas: ${usuario.fracturas ? usuario.fracturas : ''}`}
                                                <br />
                                                {`Cirugias: ${usuario.cirugias ? usuario.cirugias : ''}`}
                                                <br />
                                                {`Alergias: ${usuario.alergias ? usuario.alergias : ''}`}
                                                <br />
                                                {`Frecuencia entrenamiento: ${usuario.frecuenciaEntrenamientoSemanal ? usuario.frecuenciaEntrenamientoSemanal : ''}`}
                                                <br />
                                                {`Experiencia: ${usuario.nivelExperiencia ? usuario.nivelExperiencia : ''}`}
                                                <br />
                                                <br />

                                                <CardDrawer usuario={usuario} showPlanDeDieta={showPlanDeDieta} setShowPlanDeDieta={setShowPlanDeDieta} />

                                                <Button
                                                    style={buttonStyle}
                                                    variant='contained'
                                                    onClick={() => {
                                                        setShowPlanDeDieta(true);
                                                        setTimeout(() => {
                                                            toggleDrawer(true)();
                                                        }
                                                            , 800);
                                                    }}
                                                >
                                                    <PictureAsPdfTwoToneIcon style={{ marginRight: '10px' }} />
                                                    Plan de dieta
                                                    <br />
                                                </Button>

                                                <br />
                                                <Button
                                                    style={{ backgroundColor: 'rgb(0, 128, 0)', color: 'white' }}
                                                    variant='contained'
                                                    onClick={() => {
                                                        const whatsappUrl = 'https://api.whatsapp.com/send/?phone=%2B573107709118&text=Hola+David%2C+soy+usuario+de+Onegym+Premium&type=phone_number&app_absent=0';
                                                        const anchor = document.createElement('a');
                                                        anchor.href = whatsappUrl;
                                                        anchor.target = '_blank';
                                                        anchor.click();
                                                    }}
                                                >
                                                    <WhatsAppIcon style={{ marginRight: '10px' }} />
                                                    Contactanos
                                                </Button>
                                                <br />
                                                <br />


                                            </>
                                        )
                                            : (null)
                                        }


                                        <Divider
                                            sx={{
                                                weight: '1px',
                                                height: '0.5px',
                                                backgroundColor: 'rgb(159, 28, 23)',
                                            }} />

                                        <h2>Objetivos:</h2>
                                        {usuario.categorias.map((categoria, index) => (
                                            <div key={index}>
                                                {'* ' + categoria.nombre}
                                            </div>
                                        ))}
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
                                            <WorkspacePremiumIcon />
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
                </Slide >
            </div >
            {/* {showInstructions ? ( */}

            {/* ) : null} */}
        </div >
    );
}

export default Profile2;