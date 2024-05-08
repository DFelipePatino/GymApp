import React from 'react'
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import './banner.css';
import { navButtonsWrapperProps1, containerStyles, navButtonsProps1 } from './bannerStyles';



function banner() {


    function Item(props) {
        return (
            <Paper className="paper">
                <Link to={props.item.link}>
                    <img src={props.item.image} alt={props.item.name} />
                </Link>
                {/* <h2>{props.item.name}</h2>
                <p>{props.item.description}</p> */}
            </Paper>
        );
    }

    const items = [
        {
            image: "banner1.jpg",
            link: "/profile"
            // name: "Random Name #1",
            // description: "Probably the most random thing you have ever seen!"
        },
        {
            image: "banner2.jpg",
            // name: "Random Name #2",
            // description: "Hello World!"
        },
        {
            image: "banner3.jpg",
            // name: "Random Name #3",
            // description: "Hello World!"
        },
    ];




    return (
        <Container
            style={containerStyles} >

            <Carousel
                className="carousel"
                navButtonsAlwaysVisible={true}
                navButtonsAlwaysInvisible={false}
                animation="slide"
                stopAutoPlayOnHover={true}
                interval={4000}

                navButtonsProps={navButtonsProps1}
                navButtonsWrapperProps={navButtonsWrapperProps1}
            >
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
        </Container >
    )
}

export default banner