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


function ProfileEdit({ localUser, BackToTopButton, profilePicture, headerMountIn, contentMountIn, setHeaderMountIn, setContentMountIn }) {

    const navigate = useNavigate();

    const [fadeLoad, setfadeLoad] = useState(true)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    const typographyStyle = windowWidth >= 375 ? { marginTop: '10px', color: '#ffffff' } : { color: '#ffffff' };

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
                                border: '3px solid #426E92'

                            }}
                            onClick={() => alert('Futuro cambio de imagen')}
                            src={profilePicture} />


                        <Typography
                            style={typographyStyle}
                            variant="h4"
                            align="center">
                            {localUser}
                            <br />

                            <p>Guarda tus cambios <br /> antes de salir! <br /> <EditIcon
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
                                <form
                                >
                                    <Grid container
                                        spacing={2}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                        >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        border: '3px solid #426E92',
                                                        borderRadius: '30px',
                                                        backgroundColor: '#D9D9D9'
                                                    },
                                                }}
                                                fullWidth
                                                type="name"
                                                name="nombre"
                                                label="Nombre"
                                                placeholder="Tu nombre"
                                            // disabled // Add the disabled prop to make the field not editable
                                            />
                                        </Grid>

                                        <Grid item
                                            xs={12}
                                        >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        border: '3px solid #426E92',
                                                        borderRadius: '30px',
                                                        backgroundColor: '#D9D9D9'
                                                    },
                                                }}
                                                fullWidth
                                                type="email"
                                                name="email"
                                                label="Email"
                                                placeholder="Enter your email"
                                            // disabled // Add the disabled prop to make the field not editable
                                            />
                                        </Grid>

                                        <Grid item
                                            xs={12}
                                        >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        border: '3px solid #426E92',
                                                        borderRadius: '30px',
                                                        backgroundColor: '#D9D9D9'
                                                    },
                                                }}
                                                fullWidth
                                                type="date"
                                                name="dob"
                                                onChange={handleDobChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            // disabled // Add the disabled prop to make the field not editable
                                            />
                                        </Grid>

                                        <Grid item
                                            xs={12}
                                        >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        border: '3px solid #426E92',
                                                        borderRadius: '30px',
                                                        backgroundColor: '#D9D9D9'
                                                    },
                                                }}
                                                fullWidth
                                                type="number"
                                                name="dob"
                                                label="Edad"
                                                value={calculateAge(dob)}
                                                disabled // Add the disabled prop to make the field not editable
                                            />
                                        </Grid>

                                        <Grid item
                                            xs={12}
                                        >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        border: '3px solid #426E92',
                                                        borderRadius: '30px',
                                                        backgroundColor: '#D9D9D9'
                                                    },
                                                }}
                                                fullWidth
                                                type="email"
                                                name="email"
                                                label="Email"
                                                placeholder="Enter your email"
                                            // disabled // Add the disabled prop to make the field not editable
                                            />
                                        </Grid>

                                        <Grid item
                                            xs={12}
                                        >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        border: '3px solid #426E92',
                                                        borderRadius: '30px',
                                                        backgroundColor: '#D9D9D9'
                                                    },
                                                }}
                                                fullWidth
                                                type="email"
                                                name="email"
                                                label="Email"
                                                placeholder="Enter your email"
                                            // disabled // Add the disabled prop to make the field not editable
                                            />
                                        </Grid>

                                        <Grid item
                                            xs={12}
                                        >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        border: '3px solid #426E92',
                                                        borderRadius: '30px',
                                                        backgroundColor: '#D9D9D9'
                                                    },
                                                }}
                                                fullWidth
                                                type="email"
                                                name="email"
                                                label="Email"
                                                placeholder="Enter your email"
                                            // disabled // Add the disabled prop to make the field not editable
                                            />
                                        </Grid>

                                        <Grid item
                                            xs={12}
                                        >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        border: '3px solid #426E92',
                                                        borderRadius: '30px',
                                                        backgroundColor: '#D9D9D9'
                                                    },
                                                }}
                                                fullWidth
                                                type="email"
                                                name="email"
                                                label="Email"
                                                placeholder="Enter your email"
                                            // disabled // Add the disabled prop to make the field not editable
                                            />
                                        </Grid>

                                        <Grid item
                                            xs={12}
                                        >
                                            <TextField
                                                InputProps={{
                                                    style: {
                                                        border: '3px solid #426E92',
                                                        borderRadius: '30px',
                                                        backgroundColor: '#D9D9D9'
                                                    },
                                                }}
                                                fullWidth
                                                type="email"
                                                name="email"
                                                label="Email"
                                                placeholder="Enter your email"
                                            // disabled // Add the disabled prop to make the field not editable
                                            />
                                        </Grid>

                                        <Grid item
                                            xs={12}
                                        >
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    Swal.fire({
                                                        title: 'Estas seguro?',
                                                        text: "Revisa tus cambios antes de guardarlos!",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Si, estoy seguro!'
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            Swal.fire(
                                                                'Guardado!',
                                                                'Tu perfil ha sido actualizado',
                                                                'success'
                                                            )
                                                                .finally(() => navigate('/profile2'));
                                                        }
                                                        if (result.isDismissed) {
                                                            Swal.fire(
                                                                'Cancelado!',
                                                                'Tu perfil no ha sido actualizado',
                                                                'error'
                                                            )
                                                        }
                                                    })
                                                }}
                                            >
                                                Guardar
                                            </Button>
                                        </Grid>

                                    </Grid>
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