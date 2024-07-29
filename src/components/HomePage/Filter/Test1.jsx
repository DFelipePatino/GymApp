import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMetodo1, setMetodoID, addFav } from '../../../redux/actions';
import IconButton from '@mui/material/IconButton'; // Adjust the import path based on your UI library
import Icon from '@mui/material/Icon';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from "@mui/material";
import Image from '../../Multimedia/Image';

const Test1 = forwardRef(({ setInOutStatus1, setInOutStatus2, setInOutStatus3, setInOutStatus4, setInOutStatus5 }, ref) => {
    const localRef = useRef(null);
    const dispatch = useDispatch();
    const results = useSelector((state) => state.results);

    const handleClick = (id) => {
        localStorage.setItem("category", "Todos")
        localStorage.removeItem("lugar")

        setInOutStatus1(false);
        setInOutStatus2(false);
        setInOutStatus3(false);
        setInOutStatus4(false);
        setInOutStatus5(false);

        if (id) {
            setTimeout(() => {
                dispatch(getMetodo1(id));
                setInOutStatus1(true);
            }, 500);
        }

        setTimeout(() => {
            if (localRef.current) {
                localRef.current.scrollIntoView({ behavior: 'smooth' });
                const yCoordinate = localRef.current.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: yCoordinate - 100, behavior: 'smooth' });
            }
        }, 600);
    };

    useImperativeHandle(ref, () => ({
        scrollToComponent: handleClick,
    }));

    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        lazyLoad: true,
        dots: false,
        infinite: true,
        pauseOnHover: true,
        pauseOnFocus: true,
        adaptiveHeight: true,
        arrows: false,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 5,
        slidesToScroll: 1,
        rtl: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    pauseOnHover: true,
                }
            }
        ]
    };


    let itemGenero = [];

    if (results?.length > 0) {
        itemGenero = results?.filter((each) => each.geneo === 'HOMBRE' ? each : null)
    }

    const handleClick2 = (item) => {
        dispatch(addFav(item));
    }

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {itemGenero.map((item, index) => (
                    <div key={index}>
                        <div style={{ margin: 10 }}>
                            {item.nombre || 'Loading'}
                        </div>
                        <IconButton
                            className="favButton"
                            sx={{ position: 'absolute', zIndex: 2 }}
                            aria-label='favorite'
                            color="error"
                            onClick={() => {
                                handleClick2(item);
                            }}
                        >
                            <Icon>
                                <FavoriteBorderIcon />
                            </Icon>
                        </IconButton>
                        <Button
                            ref={localRef}
                            style={{ width: '200px', height: '170px', padding: '0px', margin: '5px', color: 'white' }}
                            color='error'
                            onClick={() => {
                                handleClick(item.id);
                            }}
                        >
                            <div>
                                <Image id={ item.multimedia?.length > 0 
                                    && item.multimedia[0]?.type === 'IMAGE' ? item.multimedia[0].id : 1} width='69%' />
                            </div>
                        </Button>
                    </div>
                ))}
            </Slider>
        </div>
    );
});

export default Test1;
