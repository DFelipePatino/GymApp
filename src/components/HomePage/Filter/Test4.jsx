import React, { useState, forwardRef, useRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMetodo1, setMetodoID } from '../../../redux/actions';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";


const Test4 = forwardRef(({ setInOutStatus1, setInOutStatus2, setInOutStatus3, setInOutStatus4, setInOutStatus5 }, ref) => {


    const localRef = useRef(null);
    const dispatch = useDispatch();
    const results = useSelector((state) => state.results);



    const [display, setDisplay] = useState(true);
    const [width, setWidth] = useState(600);

    const handleClick = (id) => {
        localStorage.setItem("category", "Tips Alimentacion")
        // const metodoIndex = index;
        const idToFind = id;

        setInOutStatus1(false);
        setInOutStatus2(false);
        setInOutStatus3(false);
        setInOutStatus4(false);
        setInOutStatus5(false);

        if (idToFind) {
            setTimeout(() => {
                dispatch(getMetodo1(idToFind));
                setInOutStatus4(true);
            }, 500);
        }

        setTimeout(() => {
            if (localRef.current) {
                localRef.current.scrollIntoView({ behavior: 'smooth' });
                const yCoordinate = localRef.current.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: yCoordinate - 80, behavior: 'smooth' });
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


    const URLImage = 'http://213.218.240.192:8082/onegym-back/api/multimedia/image/'


    const items = results?.data?.map((item, index) => ({
        icon: <img src={'public/onegym.jpeg'} alt="David" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />,
        // click: loadFns.loadM1,
        name: item.nombre || 'Loading',
        id: item.id,
    })) || [{
        // click: loadFns.loadM1(0),
        name: 'Loading',
        id: 1,
    }];



    return (
        <div className="slider-container">

            <Slider {...settings}>

                {items.map((item, index) => (
                    <Button
                        ref={localRef}
                        key={index}
                        style={{ width: '200px', height: '170px', padding: '0px', margin: '5px', color: 'white' }}
                        color='error'
                        onClick={() => {
                            handleClick(item.id);
                        }}
                    >
                        <div>{item.icon}
                            {/* <p
                                style={{ marginTop: '-20px', fontSize: '20' }}
                            >{item.name}</p> */}
                        </div>
                    </Button>
                ))}

            </Slider>
        </div>

    );
});

export default Test4;
