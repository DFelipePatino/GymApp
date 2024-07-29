import React, { useEffect, useState } from 'react';
import './ProfileEdit.css';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import {
    Typography, Avatar, Grid, Box, Container, TextField, Button,
    colors,
    Grow,
    Fade,
    Slide,
    LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { inputFieldsStyles } from './ProfileEdit'
import DropDownCategorias from './DropDownCategorias';


function ProfileEdit({ localUser, BackToTopButton, profilePicture, headerMountIn, contentMountIn, setHeaderMountIn, setContentMountIn, userForTesting, todasLasCategotias }) {

    const navigate = useNavigate();

    const [fadeLoad, setfadeLoad] = useState(true)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function handleInputChange(e, key) {
        const newValue = e.target.value;
        setUserForTesting(prevState => ({
            ...prevState,
            [key]: newValue,
        }));
    }

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        window.scrollTo(0, 0);
        setTimeout(() => {
            setfadeLoad(false)
        }, 900);
        setTimeout(() => {
            setHeaderMountIn(true)
        }, 300);
        setTimeout(() => {
            setContentMountIn(true)
        }, 800);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const typographyStyle = windowWidth >= 375 ? { marginTop: '10px', color: 'rgb(256, 256, 256)' } : { color: '#rgb(256, 256, 256)' };

    const [dob, setDob] = useState(''); // Initialize state variable for dob

    const handleDobChange = (event) => {
        setDob(event.target.value); // Update dob when the input changes
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }

        return age;
    };

    return (
        <div
            className='profileEditDiv'
        >

            <Fade in={fadeLoad} timeout={600}>

                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>

            </Fade>

            <Slide
                direction="right"
                in={headerMountIn}
                timeout={500}
                mountOnEnter unmountOnExit>


                <Box>

                    <Grid container
                        justifyContent="space-around"
                        padding="15px"
                    >

                        {/* 
                <Grow
                    in={true}
                    style={{ transformOrigin: '1 1 1' }}
                    {...(true ? { timeout: 800 } : {})}
                > */}


                        <Avatar
                            style={{
                                width: '150px',
                                height: '150px',
                                cursor: 'pointer',
                                border: '3px solid rgb(159, 28, 23)'

                            }}
                            onClick={() => alert('Futuro cambio de imagen')}
                            src={localUser.foto} />


                        <Typography
                            style={typographyStyle}
                            variant="h4"
                            align="center">
                            {localUser.nombres}
                            <br />

                            <p>Guarda tus cambios <br /> antes de continuar! <br /> <EditIcon
                                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} /></p>
                        </Typography>



                        {/* </Grow> */}


                        <Fade
                            in={contentMountIn}
                            timeout={800}
                        >

                            <Container
                                style={{
                                    margin: "15px",
                                }}
                            >

                                <DropDownCategorias
                                    userForTesting={userForTesting}
                                    todasLasCategotias={todasLasCategotias}
                                />
                                <br />

                                <form
                                >
                                    <Grid container
                                    // spacing={0}
                                    >

                                        {Object.entries(userForTesting).map(([key, value], index) => {
                                            if (key !== 'DietPlan' && key !== 'ProfilePicture' && key !== 'Entrenamiento' && key !== 'Name' && key !== 'Email' && key !== 'Premium' && key !== 'Objetivo' && key !== 'Age' && key !== 'Gender') {
                                                return (
                                                    <Grid item xs={12} sm={4}
                                                        style={{ background: 'black', border: '2px solid rgb(159, 28, 23)', borderRadius: '20px', padding: '8px', color: 'white', margin: '5px' }}
                                                        key={index}>

                                                        <h3>{key}:</h3>
                                                        <input
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) => handleInputChange(e, key)}
                                                            style={{ color: 'white' }}
                                                        />

                                                    </Grid>
                                                );
                                            }
                                            return null;
                                        })}


                                    </Grid>

                                    <Button
                                        style={{
                                            backgroundColor: 'rgb(159, 28, 23)',
                                            color: 'rgb(255, 255, 255)', // Corrected color value
                                            fontWeight: 'bold',
                                            marginTop: '15px',
                                        }}
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            Swal.fire({
                                                title: '¿Estás seguro?',
                                                text: "Revisa tus cambios antes de guardarlos!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Sí, estoy seguro!',
                                                color: 'rgb(255, 255, 255)',
                                                background: "rgb(0,0,0)",
                                                backdrop: `rgba(159, 28, 23, 0.4)`
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    Swal.fire({
                                                        title: 'Guardado!',
                                                        text: 'Tu perfil ha sido actualizado',
                                                        icon: 'success',
                                                        color: 'rgb(255, 255, 255)',
                                                        background: "rgb(0,0,0)",
                                                        backdrop: `rgba(144, 238, 144, 0.4)`
                                                    }).finally(() => navigate('/profile2'));
                                                } else if (result.isDismissed) {
                                                    Swal.fire({
                                                        title: 'Cancelado!',
                                                        text: 'Tu perfil NO ha sido actualizado',
                                                        icon: 'error',
                                                        color: 'rgb(255, 255, 255)',
                                                        background: "rgb(0,0,0)",
                                                        backdrop: `rgba(159, 28, 23, 0.4)`
                                                    });
                                                }
                                            });
                                        }}
                                    >
                                        Guardar
                                    </Button>
                                </form>
                            </Container>
                        </Fade>
                    </Grid>
                    {/* <BackToTopButton /> */}
                </Box>
            </Slide>
        </div>
    );
}

export default ProfileEdit;