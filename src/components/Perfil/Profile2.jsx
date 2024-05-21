import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, Avatar } from '@material-ui/core';
import './Profile2.css';
import { Button, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import { infoCardsStyle, profile2divCardStyle, cardHeaderStyle, avatarStyle, buttonStyle, cardContentCard, infoCardsIconStyle } from './Profile2'


function Profile2({ userForTesting, BackToTopButton, name }) {

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    })


    return (
        <div
            className='profile2div'>
            <Card
                style={profile2divCardStyle}>

                <CardHeader
                    style={cardHeaderStyle}
                    avatar={
                        <Avatar
                            alt={name} src={userForTesting.profilePicture}
                            style={avatarStyle}
                        />
                    }
                    title={name}
                    subheader={`${userForTesting.email}`}
                    titleTypographyProps={{ variant: 'h5', color: 'white' }}
                    subheaderTypographyProps={{ variant: 'h7', color: 'white' }}
                />

                <Card />

                <div className='cardContent'>
                    <Card
                        style={cardContentCard}>
                        <Grid container spacing={0}>
                            <Grid item xs={5} md={8} lg={4}
                                style={infoCardsStyle}>
                                <p>DOB</p>
                                {userForTesting.dob}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4}
                                style={infoCardsStyle}>
                                <p> Age: </p>
                                {userForTesting.age}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Goals</p>
                                {userForTesting.goals}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Health Status</p>
                                {userForTesting.healthStatus}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Height</p>
                                {userForTesting.height}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Weight</p>
                                {userForTesting.weight}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Gender</p>
                                {userForTesting.gender}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsIconStyle}>
                                <p>Diet Plan</p>
                                <a href="/plandedieta.pdf" target="blank" >
                                    <PictureAsPdfTwoToneIcon style={{ color: '#426E92' }} />
                                </a>
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Blood Type</p>
                                {userForTesting.bloodType}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Hair Color</p>
                                {userForTesting.hairColor}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Eye Color</p>
                                {userForTesting.eyeColor}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Skin Color</p>
                                {userForTesting.skinColor}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Body Type</p>
                                {userForTesting.bodyType}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Shoe Size</p>
                                {userForTesting.shoeSize}
                            </Grid>
                            <Grid item xs={5} md={8} lg={4} style={infoCardsStyle}>
                                <p>Clothing Size</p>
                                {userForTesting.clothingSize}
                            </Grid>

                        </Grid>
                    </Card>
                </div>

                <Button
                    style={buttonStyle}
                    variant='contained'
                    onClick={() => navigate('/profileedit')}>
                    Editar
                    <br />
                    <EditIcon/>
                </Button>
                <BackToTopButton />

            </Card>
        </div>
    );
}

export default Profile2;