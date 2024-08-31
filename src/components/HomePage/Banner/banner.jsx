import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import './banner.css';
import { navButtonsWrapperProps1, navButtonsProps1, bannerContainerStyles } from './bannerStyles';
import { useSelector, useDispatch } from 'react-redux';
import { getImageObject } from '../../../redux/actions';
import Image from '../../Multimedia/Image';

function Banner({ setInfoPremium }) {
    const allBanners = useSelector(state => state.banner);

    return (
        <Container style={bannerContainerStyles}>
 
                <Carousel
                    className="carousel"
                    navButtonsAlwaysInvisible={false}
                    animation="fade"
                    autoPlay={true}
                    stopAutoPlayOnHover={true}
                    interval={5000}
                    indicators={false}
                    cycleNavigation={true}
                    swipe={true}
                    navButtonsProps={navButtonsProps1}
                    navButtonsWrapperProps={navButtonsWrapperProps1}
                >
                    {allBanners.map((item, i) => (
                        <Paper className="paper" key={i}>
                            {item.enlace === "Premium" ? (
                                <Link to={'/profile2'}
                                    onClick={() => setInfoPremium(true)}
                                >

                                    <Image
                                        id={item.multimedia[0]?.id}
                                        width='110%'
                                    />

                                </Link>
                            ) : (
                                <Link to={item.enlace} target="_blank">
                                    <Image
                                        id={item.multimedia[0]?.id}
                                        width='110%'
                                    />
                                </Link>
                            )}
                        </Paper>
                    ))}
                </Carousel>
          
        </Container>
    );
}

export default Banner;
