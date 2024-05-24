import React, { useEffect, useState } from 'react';
import './ProfileEdit.css';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import {
    Typography, Avatar, Grid, Box, Container, TextField, Button,
    colors
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


function ProfileEdit({ localUser, BackToTopButton, profilePicture }) {

    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        window.scrollTo(0, 0);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const typographyStyle = windowWidth >= 375 ? { marginTop: '50px', color: '#ffffff' } : { color: '#ffffff' };

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
        <Box
            style={{
                backgroundImage: 'linear-gradient(to bottom right, #924141, #924141, #d9d9d9)', marginTop: '56px'
            }}
        >

            <Grid container
                justifyContent="space-around"
                padding="15px"
            >

                <Typography
                    style={typographyStyle}
                    variant="h4"
                    align="center">
                    {localUser}
                    <br />

                    <p> <EditIcon
                        onClick={() => window.scrollTo({ top: 220, behavior: 'smooth' })} />Edita tu Perfil</p>
                </Typography>

                <Avatar
                    style={{
                        width: '150px',
                        height: '150px',
                        cursor: 'pointer',
                        border: '3px solid #426E92'

                    }}
                    onClick={() => alert('Futuro cambio de imagen')}
                    src={profilePicture} />

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
            </Grid>
            {/* <BackToTopButton /> */}
        </Box>
    );
}

export default ProfileEdit;