import React, { useState, forwardRef, useRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMetodo1, setMetodoID, removeFav } from '../../../redux/actions';
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { Button, Icon, IconButton } from "@mui/material";


const Test5 = forwardRef(({ setInOutStatus1, setInOutStatus2, setInOutStatus3, setInOutStatus4, setInOutStatus5, favs }, ref) => {

    const localRef = useRef(null);
    const dispatch = useDispatch();

    const results = useSelector((state) => state.results);
    const favsToShow = results?.data?.filter((item) => favs.includes(item.id));

    const handleClick = (id) => {
        localStorage.setItem("category", "Tu Seleccion")
        localStorage.removeItem("lugar")
        // const metodoIndex = index;
        const idToFind = id;
        // dispatch(setMetodoID(metodoIndex));

        setInOutStatus1(false);
        setInOutStatus2(false);
        setInOutStatus3(false);
        setInOutStatus4(false);
        setInOutStatus5(false);

        if (idToFind) {
            setTimeout(() => {
                dispatch(getMetodo1(idToFind));
                setInOutStatus5(true);
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

    const slidesToShow = Math.min(4, favs.length) || 1;
    // parece que esto esta rompiendo, mejor dejarlo asi!

    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        lazyLoad: true,
        dots: false,
        infinite: true,
        pauseOnHover: true,
        adaptiveHeight: true,
        arrows: false,
        focusOnSelect: true,
        // autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 5,
        slidesToScroll: 1,
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

    // const URLImage = 'http://213.218.240.192:8082/onegym-back/api/multimedia/image/'


    // const items = results?.data?.map((item, index) => ({
    //     icon: <img src={'public/DavidB&W.png'} alt="David" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />,
    //     // click: loadFns.loadM1,
    //     name: item.nombre || 'Loading',
    //     id: item.id,
    // })) || [{
    //     // click: loadFns.loadM1(0),
    //     name: 'Loading',
    //     id: 1,
    // }];

    const URLImage = 'http://213.218.240.192:8082/onegym-back/api/multimedia/image/'

    const items = favsToShow?.map((item, index) => ({
        icon: <img src={URLImage + (item.multimedia && item.multimedia.length > 0 ? item.multimedia.filter((i) => i.type === 'IMAGE')[0].id : 1)} alt="David"
            style={{ width: '60%' }}
        />,
        // click: loadFns.loadM1,
        name: item.nombre || 'pepe',
        id: item.id,
    }))
        || [{
            // click: loadFns.loadM1(0),
            name: 'Loading',
            id: 1,
        }];

    const handleClick2 = (item) => {
        dispatch(removeFav(item));
    }

    return (
        <div className="slider-container">

            <Slider {...settings}>

                {items.map((item, index) => (
                    <div key={index} style={{ width: '200px', height: '170px', padding: '0px', margin: '5px' }}>

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
                                <HeartBrokenIcon />
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
                            <div>{item.icon}
                                {/* <p>{item.name}</p> */}

                            </div>
                        </Button>
                    </div>
                ))}
            </Slider >
        </div >

    );
});

export default Test5;
