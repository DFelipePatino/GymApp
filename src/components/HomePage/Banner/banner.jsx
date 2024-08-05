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
    // console.log(allBanners, "allBanners in Banner.jsx");

    // const idbanner = allBanners?.map((item) => (
    //     item.multimedia[0].id
    // ));
    // console.log(idbanner, "idbanner in Banner.jsx");

    // useEffect(() => {
    //     const generateItems = async () => {
    //         const itemsPromises = allBanners?.map(async (item) => ({
    //             image: await dispatch(getImageObject(item.multimedia[0].id)),
    //             link: item.enlace,
    //         })) || [];
    //         console.log(itemsPromises, "itemsPromises in Banner.jsx");

    //         const items = await Promise.all(itemsPromises);
    //         setItems(items);
    //     };

    //     generateItems();
    // }, [allBanners, dispatch]);

    // function Item({ item }) {
    //     return (
    //         <Paper className="paper">
    //             <Link to={item.link} target="_blank">
    //                 <Image
    //                     id={item.image.id}
    //                     width='110%'
    //                 />
    //             </Link>
    //         </Paper>
    //     );
    // }

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
                {/* {items.map((item, i) => <Item key={i} item={item} />)}
                 */}
                {allBanners.map((item, i) => (
                    <Paper className="paper" key={i}>
                        <Link to={item.enlace} target="_blank">
                            <Image
                                id={item.multimedia[0].id}
                                width='110%'
                            />
                        </Link>
                    </Paper>
                ))}
            </Carousel>
        </Container>
    );
}

export default Banner;
