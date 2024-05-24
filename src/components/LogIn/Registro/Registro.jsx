import React, { useEffect, useState } from 'react';
// import './Registro.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Swal from 'sweetalert2'
import {
    Typography, Avatar, Grid, Box, Container, TextField, Button,
    Grow,
    Slide,
    Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Registro({ BackToTopButton }) {

    const navigate = useNavigate();

    const [headerMountIn, setHeaderMountIn] = useState(false)
    const [contentMountIn, setContentMountIn] = useState(false)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        window.scrollTo(0, 0);
        setTimeout(() => {
            setHeaderMountIn(true)
        }, 300);
        setTimeout(() => {
            setContentMountIn(true)
        }, 600);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const typographyStyle = windowWidth >= 360 ? { marginTop: '50px', color: '#ffffff' } : { color: '#ffffff' };

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
            style={{
                backgroundImage: 'linear-gradient(to bottom right, #924141, #924141, #d9d9d9)'
            }}
        >

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

                        <Typography
                            style={typographyStyle}
                            variant="h4"
                            align="center">
                            Bienvenido
                        </Typography>
                        {/* <p>Ayudanos con unos datos para conocerte mejor</p> */}

                        {/* <FileUploadIcon
                    style={{
                        height: '50px',
                        width: '50px',
                        top: '65px',
                        right: '19%',
                        position: 'fixed',
                        color: '#426E92',
                        zIndex: '1',
                    }}
                    onClick={() => alert('Futuro cambio de imagen')}
                /> */}
                        <Avatar
                            style={{
                                width: '150px',
                                height: '150px',
                                cursor: 'pointer',
                                border: '3px solid #426E92',
                                position: 'relative',
                                // filter: 'blur(1px)'
                            }}
                            onClick={() => alert('Futuro cambio de imagen')}
                        >
                            <FileUploadIcon />
                        </Avatar>

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
                                                                'Bienvenido!',
                                                                'Tu perfil ha sido creado con exito!',
                                                                'success'
                                                            )
                                                                .finally(() => navigate('/'));
                                                        }
                                                        if (result.isDismissed) {
                                                            Swal.fire(
                                                                'Cancelado!',
                                                                'Tu perfil no ha sido creado aun, continua con el proceso de registro!',
                                                                'success'
                                                            )
                                                            // .finally(() => navigate('/'));
                                                        }
                                                    })
                                                }}
                                            >
                                                Guardar
                                            </Button>
                                            <br />
                                            <br />
                                            <Button
                                                style={{ backgroundColor: '#924141' }}
                                                fullWidth
                                                variant="contained"
                                                type="submit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    Swal.fire({
                                                        title: 'Estas seguro?',
                                                        text: "Perderas los cambios no guardados!",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Si, estoy seguro!'
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            navigate('/');
                                                        }
                                                    });
                                                }}
                                            >
                                                Volver
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </form>
                            </Container>
                        </Fade>
                    </Grid>
                    <BackToTopButton />
                </Box>
            </Slide>
        </div>
    );
}

export default Registro;