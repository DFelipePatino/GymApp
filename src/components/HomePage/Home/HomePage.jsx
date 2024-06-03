import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser, getMetodo1, getMetodo2, getPilates, getCrossfit, getBoxing, getYoga, getDefault, getMethods } from '../../../redux/actions';
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
import CardDrawer from '../CardDrawer/CardDrawer';
import { Fade, Grow, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import { containerStyles } from '../Filter/filerStyles';
// import colorPallet from '../../ColorPallet';

function HomePage({ BackToTopButton, headerLoad, bannerLoad, filterLoad, setHeaderLoad, setBannerload, setFilterLoad }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userFisrtName, setUserFirstName] = useState("")
    const [lastNameLetter, setLastLetterName] = useState('')

    const [fadeLoad, setfadeLoad] = useState(true)



    const user = useSelector((state) => state.user);

    const homeContent = localStorage.getItem("homeContent")
    const lastCategory = localStorage.getItem("category")

    const categoryToDispatch = localStorage.getItem("categorytoDispatch")

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
            localStorage.setItem("category", "Pilates");
            dispatch(getPilates());
            scrolling()
        }
        if (homeContent === "Crossfit") {
            localStorage.setItem("category", "Crossfit");
            dispatch(getCrossfit());
            scrolling()
        }
        if (homeContent === "Boxing") {
            localStorage.setItem("category", "Boxing");
            dispatch(getBoxing());
            scrolling()
        }
        if (homeContent === "Yoga") {
            localStorage.setItem("category", "Yoga");
            dispatch(getYoga());
            scrolling()
        }
        if (homeContent === "Cardio") {
            localStorage.setItem("category", "Cardio");
            dispatch(getMetodo1());
            scrolling()
        }
        if (homeContent === "Contacto") {
            localStorage.setItem("category", "Contacto");
            dispatch(getMetodo2());
            scrolling()
        }

        if (homeContent === "goBack") {
            switch (categoryToDispatch) {
                case 'Contacto':
                    dispatch(getMetodo2());
                    scrolling()
                    break;
                case 'Cardio':
                    dispatch(getMetodo1());
                    scrolling()
                    break;
                case 'Yoga':
                    dispatch(getYoga());
                    scrolling()
                    break;
                case 'Pilates':
                    dispatch(getPilates());
                    scrolling()
                    break;
                case 'Crossfit':
                    dispatch(getCrossfit());
                    scrolling()
                    break;
                case 'Boxing':
                    dispatch(getBoxing());
                    scrolling()
                    break;
                default:
                    console.log('Unknown category:', categoryToDispatch);
            }
        }
        else if (!homeContent) {
            dispatch(getMetodo1());
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

    }, [navigate, homeContent]);

    const [inOutStatus, setInOutStatus] = useState(true);

    return (


        <div className="home">


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
                in={filterLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(filterLoad ? { timeout: 600 } : {})}
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