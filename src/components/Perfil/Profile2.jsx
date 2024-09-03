import React, { useEffect, useState } from 'react';
import { Button, Divider, Fade, LinearProgress, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { cardHeaderStyle, buttonStyle } from './Profile2'
import { Box } from '@mui/system';
import { toggleDrawer } from '../HomePage/CardDrawer/CardDrawer';
import CardDrawer from '../HomePage/CardDrawer/CardDrawer';
import './Profile2.css';


function Profile2({ headerMountIn, setHeaderMountIn, setContentMountIn, navigateAway, setNavigateAway, usuario, reload, WAButton }) {

    const navigate = useNavigate();

    const localUserName = usuario?.nombres + ' ' + usuario?.apellidos;
    const tipoDeCuenta = usuario?.accountType === "GENERAL" ? 'BASIC' : usuario?.accountType;
    const formattedExpitarion = new Date(usuario?.fechaExpiracionPlan).toLocaleDateString();

    const userInitials = localUserName?.split(' ').map((n) => n ? n[0].toUpperCase() : '').join('');


    const [fadeLoad, setfadeLoad] = useState(true)
    const [showInstructions, setShowInstructions] = useState(false);
    const [showPlanDeDieta, setShowPlanDeDieta] = useState(false);

    const reLoad = reload

    const shouldReload = (reLoad) => {
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
                if (usuario === null) {
                    navigate('/login')
                }
            }, 500);
        }

        // Cleanup function
        return () => {
            clearTimeout(fadeLoadTimeout);
            clearTimeout(headerMountTimeout);
            clearTimeout(contentMountTimeout);
        };
    }, [navigateAway, setHeaderMountIn, setContentMountIn, reLoad]);



    const handleClickPlanDeDieta = () => {
        setShowInstructions(false);
        setShowPlanDeDieta(true);
        setTimeout(() => {
            toggleDrawer(true)();
        }
            , 800);
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

                            <div className="profile-image-container">
                                <img src={usuario?.foto} alt={userInitials} />
                            </div>

                            <br />

                            <div className='name'>
                                {`${localUserName}`}
                            </div>



                            <>
                                <div className='description'>
                                    <h2>Info:</h2>
                                    {`Edad: ${usuario?.age}`}
                                    <br />
                                    {`Genero: ${usuario?.genero}`}
                                    <br />
                                    {`Email: ${usuario?.email}`}
                                    <br />
                                    <br />
                                    {`Suscripcion: ${tipoDeCuenta}`}
                                    <br />
                                    {`Estado: ${usuario?.state}`}
                                    <br />
                                    {`Valido hasta: ${formattedExpitarion}`}
                                    <br />
                                    <br />

                                    {usuario?.accountType === "PREMIUM" ? (
                                        <>
                                            {`Talla: ${usuario?.talla ? usuario?.talla + " cm" : ''}`}
                                            <br />
                                            {`Peso: ${usuario?.peso ? usuario?.peso + " kg" : ''}`}
                                            <br />
                                            {`Patologias: ${usuario?.patologias ? usuario?.patologias : ''}`}
                                            <br />
                                            {`Fracturas: ${usuario?.fracturas ? usuario?.fracturas : ''}`}
                                            <br />
                                            {`Cirugias: ${usuario?.cirugias ? usuario?.cirugias : ''}`}
                                            <br />
                                            {`Alergias: ${usuario?.alergias ? usuario?.alergias : ''}`}
                                            <br />
                                            {`Frecuencia entrenamiento: ${usuario?.frecuenciaEntrenamientoSemanal ? usuario?.frecuenciaEntrenamientoSemanal : ''}`}
                                            <br />
                                            {`Experiencia: ${usuario?.nivelExperiencia ? usuario?.nivelExperiencia : ''}`}
                                            <br />
                                            <br />

                                            <CardDrawer usuario={usuario} showPlanDeDieta={showPlanDeDieta} />

                                            <Button
                                                style={buttonStyle}
                                                variant='contained'
                                                onClick={() => {
                                                    handleClickPlanDeDieta()
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
                                                    const whatsappUrl = 'https://api.whatsapp.com/send/?phone=%2B573107709118&text=Hola+David%2C+soy+usuario+One+Premium&type=phone_number&app_absent=0';
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
                                    {usuario?.categorias?.length > 0 ? (
                                        usuario.categorias.map((categoria, index) => (
                                            <div key={index}>
                                                {'* ' + (categoria?.nombre || 'Loading')}
                                            </div>
                                        ))
                                    ) : (
                                        <div>Aqui verás tus objetivos</div>
                                    )}
                                </div>


                                <div className='contact'>

                                    <Button
                                        style={buttonStyle}
                                        variant='contained'
                                        onClick={() => {
                                            window.scroll({ top: 0, behavior: 'smooth' });
                                            setHeaderMountIn(false);
                                            setTimeout(() => {
                                                navigate('/paytoupgrade')
                                            }, 400);
                                            setTimeout(() => {
                                                setHeaderMountIn(true)
                                            }, 800);

                                        }}
                                    >
                                        <WorkspacePremiumIcon />
                                        Premium
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
                            </>

                        </div>
                    </div>
                </Slide >
                <WAButton />
            </div >

        </div >
    );
}

export default Profile2;