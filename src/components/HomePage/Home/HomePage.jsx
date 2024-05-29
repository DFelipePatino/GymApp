import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser, getCardio, getContacto, getPilates, getCrossfit, getBoxing, getYoga, getDefault } from '../../../redux/actions';
import HeaderNav from '../../HeaderNav/HeaderNav';
import NavBar from '../NavBar/NavBar';
import Cards from '../../cards/cards'
import Banner from '../Banner/banner';
import Filter from '../Filter/Filter';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './HomePage.css';
import SwipeableEdgeDrawer from '../CardDrawer/CardDrawer';
import { Fade, Grow, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import { containerStyles } from '../Filter/filerStyles';

function HomePage({ BackToTopButton }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userFisrtName, setUserFirstName] = useState("")
    const [lastNameLetter, setLastLetterName] = useState('')

    const [fadeLoad, setfadeLoad] = useState(true)
    const [headerLoad, setHeaderLoad] = useState(false)
    const [bannerLoad, setBannerload] = useState(false)
    const [folterLoad, setFilterLoad] = useState(false)


    const user = useSelector((state) => state.user);
    console.log(user, "this is the user");


    const homeContent = localStorage.getItem("homeContent")
    console.log(homeContent, "this is the home content");

    const lastCategory = localStorage.getItem("category")

    const categoryToDispatch = localStorage.getItem("categorytoDispatch")
    console.log(categoryToDispatch, "this is the category to dispatch");




    useEffect(() => {

        setTimeout(() => {
            setfadeLoad(false)
        }, 900);
        setTimeout(() => {
            setHeaderLoad(true)
        }, 600);
        setTimeout(() => {
            setBannerload(true)
        }, 500);
        setTimeout(() => {
            setFilterLoad(true)
        }, 300);

        const localUser = localStorage.getItem("localUserName")
        console.log(localUser, "lu en home");

        if (localUser.split(' ')[0].endsWith('a')) {
            setLastLetterName('a');
        } else {
            setLastLetterName('o');
        }

        const verifyLogin = (localUser) => {
            if (!localUser) {
                navigate("/");

            } else
                setUserFirstName(localUser.split(' ')[0]);

        }
        verifyLogin(localUser);

        const scrolling = () => {
            window.scrollTo({ top: 320, behavior: 'smooth' });
            setInOutStatus(previnOutStatus => !previnOutStatus)
            setTimeout(() => {
                setInOutStatus(previnOutStatus => !previnOutStatus)
            }, 700);
        }


        if (homeContent === "Pilates") {
            dispatch(getPilates());
            scrolling()
        }
        if (homeContent === "Crossfit") {
            dispatch(getCrossfit());
            scrolling()
        }
        if (homeContent === "Boxing") {
            dispatch(getBoxing());
            scrolling()
        }
        if (homeContent === "Yoga") {
            dispatch(getYoga());
            scrolling()
        }
        if (homeContent === "Cardio") {
            dispatch(getCardio());
            scrolling()
        }
        if (homeContent === "Contacto") {
            dispatch(getContacto());
            scrolling()
        }

        if (homeContent === "goBack") {
            switch (categoryToDispatch) {
                case 'getContacto':
                    dispatch(getContacto());
                    scrolling()
                    break;
                case 'getCardio':
                    dispatch(getCardio());
                    scrolling()
                    break;
                case 'getYoga':
                    dispatch(getYoga());
                    scrolling()
                    break;
                case 'getPilates':
                    dispatch(getPilates());
                    scrolling()
                    break;
                case 'getCrossfit':
                    dispatch(getCrossfit());
                    scrolling()
                    break;
                case 'getBoxing':
                    dispatch(getBoxing());
                    scrolling()
                    break;
                default:
                    console.log('Unknown category:', categoryToDispatch);
            }
        }
        else if (!homeContent) {
            dispatch(getCrossfit());
            window.scrollTo(0, 0);
        }

    }, [navigate, homeContent]);

    const [inOutStatus, setInOutStatus] = useState(true);

    return (


        <div className="home">

            {/* <HeaderNav className="headerNav" localUser={localUser}/> */}

            <Fade in={fadeLoad} timeout={600}>

                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>

            </Fade>

            <Grow
                in={headerLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(headerLoad ? { timeout: 800 } : {})}
            >
                <div className='welcomeUser' >
                    <h1>Bienvenid{lastNameLetter} {userFisrtName}</h1>
                </div>
            </Grow>


            {/* <NavBar /> */}

            <Grow
                in={bannerLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(bannerLoad ? { timeout: 600 } : {})}
            >
                <div>
                    <Banner />
                </div>
            </Grow>

            <Grow
                in={folterLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(folterLoad ? { timeout: 600 } : {})}
            >
                <div
                    style={containerStyles}  >
                    <Filter setInOutStatus={setInOutStatus} />
                </div>
            </Grow>



            <Cards inOutStatus={inOutStatus} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

            {/* <SwipeableEdgeDrawer /> */}

            {/* <BackToTopButton /> */}

        </div>
    );
}

export default HomePage;