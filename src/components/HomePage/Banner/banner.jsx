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

function Banner() {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const allBanners = useSelector(state => state.banner);

    useEffect(() => {
        const generateItems = async () => {
            const itemsPromises = allBanners?.map(async (item) => ({
                image: await getImageObject(item.multimedia[0].id),
                link: item.enlace,
            })) || [];

            const items = await Promise.all(itemsPromises);
            setItems(items);
        };

        generateItems();
    }, [allBanners]);

    function Item(props) {
        return (
            <Paper className="paper">
                <Link to={props.item.link} target="blank">
                    <Image id={props.item.id} width='110%' />
                </Link>
            </Paper>
        );
    }

    return (
        <Container style={bannerContainerStyles}>
            <Carousel
                className="carousel"
                navButtonsAlwaysInvisible={false}
                animation="fade"
                autoPlay={true}
                stopAutoPlayOnHover={true}
                interval={10000}
                indicators={false}
                cycleNavigation={true}
                swipe={true}
                navButtonsProps={navButtonsProps1}
                navButtonsWrapperProps={navButtonsWrapperProps1}
            >
                {items.map((item, i) => <Item key={i} item={item} />)}
            </Carousel>
        </Container>
    );
}

export default Banner;
