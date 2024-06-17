import React, { useState, forwardRef, useRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMetodo1, setMetodoID, addFav } from '../../../redux/actions';
import IconButton from '@mui/material/IconButton'; // Adjust the import path based on your UI library
import Icon from '@mui/material/Icon'; // 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from "@mui/material";


const Test1 = forwardRef(({ setInOutStatus1, setInOutStatus2, setInOutStatus3, setInOutStatus4, setInOutStatus5 }, ref) => {

    // const [isFav, setIsFav] = useState(false);


    const localRef = useRef(null);
    const dispatch = useDispatch();
    const results = useSelector((state) => state.results);


    const [display, setDisplay] = useState(true);
    const [width, setWidth] = useState(600);

    const handleClick = (id) => {
        localStorage.setItem("category", "Tu Seleccion")
        // const metodoIndex = index;
        const idToFind = id;
        // dispatch(setMetodoID(metodoIndex));
        dispatch(getMetodo1(idToFind));

        setInOutStatus1(false);
        setInOutStatus2(false);
        setInOutStatus3(false);
        setInOutStatus4(false);
        setInOutStatus5(false);

        setTimeout(() => {
            setInOutStatus1(true);
        }, 500);

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
        // centerMode: true,
        centerPadding: "60px",
        lazyLoad: true,
        dots: true,
        infinite: true,
        pauseOnHover: true,
        adaptiveHeight: true,
        // autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 4,
                    initialSlide: 2,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 5,
                    pauseOnHover: true,
                }
            }
        ]
    };


    const URLImage = 'http://213.218.240.192:8082/onegym-back/api/multimedia/image/'

    const iteamGeneroH = results?.data?.filter((each) => each.geneo === 'HOMBRE' ? each : null)
    // console.log(iteamGeneroH, 'iteamGeneroH');

    const items = iteamGeneroH?.map((item, index) => ({
        icon: <img src={URLImage + (item.multimedia && item.multimedia.length > 0 ? item.multimedia.filter((i) => i.type === 'IMAGE')[0].id : 1)} alt="David" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />,
        // click: loadFns.loadM1,
        name: item.nombre || 'Loading',
        id: item.id,
    })) || [{
        // click: loadFns.loadM1(0),
        name: 'Loading',
        id: 1,
    }];


    const handleClick2 = (item) => {
        // isFav ? removeFav(item) : dispatch(addFav(item));
        dispatch(addFav(item))
    }



    return (
        <div className="slider-container">
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div key={index} style={{ width: '200px', height: '170px', padding: '0px', margin: '5px' }}>

                        {/* {isFav ? <IconButton
                            className="favButton"
                            sx={{ position: 'absolute', zIndex: 2 }}
                            aria-label='favorite'
                            color="error"
                            onClick={() => {
                                handleClick2(item);
                                // console.log(item, 'item');
                            }}
                        >
                            <Icon>
                                <FavoriteIcon />
                            </Icon>
                        </IconButton> 
                        : */}
                        <IconButton
                            className="favButton"
                            sx={{ position: 'absolute', zIndex: 2 }}
                            aria-label='favorite'
                            color="error"
                            onClick={() => {
                                handleClick2(item);
                                // console.log(item, 'item');
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
                            <div>{item.icon}</div> {/* Ensure this is the intended content */}
                        </Button>
                    </div>
                ))}
            </Slider>
        </div>
    );
});

export default Test1;
