import React, { useEffect, useState } from 'react';
import { Typography, Avatar, Grid, Box, Container, TextField } from '@mui/material';


function ProfileEdit({ localUser }) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        window.scrollTo(0, 0);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const typographyStyle = windowWidth >= 435 ? { marginTop: '50px' } : {};

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
                backgroundImage: 'linear-gradient(to bottom right, #924141, #924141, #d9d9d9)',
                height: "100%"
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
                </Typography>

                <Avatar
                    style={{
                        width: '150px',
                        height: '150px',
                        cursor: 'pointer'
                    }}
                    onClick={() => alert('Futuro cambio de imagen')}
                    src="/public/Perfil.png" />

                <Container
                    style={{
                        margin: "15px"
                    }}
                >

                    <form>
                        <Grid container
                            spacing={2}

                        >
                            <Grid item
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    type="name"
                                    name="nombre"
                                    label="Nombre"
                                    variant="outlined"
                                    placeholder="Tu nombre"
                                // disabled // Add the disabled prop to make the field not editable
                                />
                            </Grid>

                            <Grid item
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    type="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    placeholder="Enter your email"
                                // disabled // Add the disabled prop to make the field not editable
                                />
                            </Grid>

                            <Grid item
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    type="date"
                                    name="dob"
                                    variant="outlined"
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
                                    fullWidth
                                    type="number"
                                    name="dob"
                                    label="Edad"
                                    variant="outlined"
                                    value={calculateAge(dob)}
                                    disabled // Add the disabled prop to make the field not editable
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Grid>
        </Box>
    );
}

export default ProfileEdit;