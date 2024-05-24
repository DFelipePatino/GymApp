import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Avatar } from '@material-ui/core';
import './Profile2.css';
import { Button, Fade, Grid, Grow, Slide } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import { infoCardsStyle, profile2divCardStyle, cardHeaderStyle, avatarStyle, buttonStyle, cardContentCard, infoCardsIconStyle } from './Profile2'
import { Troubleshoot } from '@mui/icons-material';


function Profile2({ userForTesting, BackToTopButton, name }) {

    const navigate = useNavigate();

    const [headerMountIn, setHeaderMountIn] = useState(false)
    const [contentMountIn, setContentMountIn] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setHeaderMountIn(true)
        }, 300);
        setTimeout(() => {
            setContentMountIn(true)
        }, 500);
    })




    return (
        <div
            style={profile2divCardStyle}>
            {/* // className='profile2div'> */}
            {/* <Card */}
            {/* style={profile2divCardStyle}> */}

            <div
                style={cardHeaderStyle}>
                <Slide
                    direction="right"
                    in={headerMountIn}
                    timeout={500}
                    mountOnEnter unmountOnExit>

                    <CardHeader
                        // style={cardHeaderStyle}
                        avatar={
                            <Avatar
                                alt={name} src={userForTesting.profilePicture}
                                style={avatarStyle}
                            />
                        }
                        title={name}
                        subheader={`${userForTesting.email}`}
                        titleTypographyProps={{ variant: 'h5', color: 'inherit' }}
                        subheaderTypographyProps={{ variant: 'subtitle1', color: 'inherit' }}
                    />
                </Slide>

            </div>

            <Slide
                direction="right"
                in={contentMountIn}
                timeout={500}
                mountOnEnter unmountOnExit>

                <div>

                    {/* <Card /> */}

                    {/* <div className='cardContent'> */}
                    <Card style={cardContentCard}>
                        <Grid container spacing={0}>
                            {Object.entries(userForTesting).map(([key, value], index) => {
                                if (key !== 'dietPlan' && key !== 'profilePicture') {
                                    return (
                                        <Grid item xs={5} md={4} lg={6} style={infoCardsStyle} key={index}>
                                            {/* <Card>
                                        <CardHeader
                                            subheader={key}>
                                        </CardHeader>
                                        <CardContent>
                                            <Typography variant='body1'>{value}</Typography>
                                        </CardContent>
                                    </Card> */}
                                            <p><strong>{key}:</strong> {value}</p>
                                        </Grid>
                                    );
                                }
                                return null;
                            })}
                        </Grid>
                    </Card>






                </div>

            </Slide>

            <Fade
            in={contentMountIn}
            >

            <div>

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

            {/* </div> */}
            <Button
                style={buttonStyle}
                variant='contained'
                onClick={() => navigate('/profileedit')}>
                Editar
                <br />
                <EditIcon />
            </Button>
            {/* <BackToTopButton /> */}

            {/* </Card> */}

            </div>
            </Fade>



        </div>
    );
}

export default Profile2;