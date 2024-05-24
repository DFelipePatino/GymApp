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
import { Grow } from '@mui/material';

function HomePage({ BackToTopButton }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userFisrtName, setUserFirstName] = useState("")
    const [lastNameLetter , setLastLetterName] = useState('')

    const [headerLoad, setHeaderLoad] = useState(false)
    const [bannerLoad, setBannerload]= useState(false)
    const [folterLoad, setFilterLoad]= useState(false)

    const user = useSelector((state) => state.user);
    console.log(user, "this is the user");


    const homeContent = localStorage.getItem("homeContent")
    console.log(homeContent, "this is the home content");

    useEffect(() => {

        setTimeout(() => {
            setHeaderLoad(true)
        }, 500);
        setTimeout(() => {
            setBannerload(true)
        }, 200);
        setTimeout(() => {
            setFilterLoad(true)
        }, 200);

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
            window.scrollTo({ top: 315, behavior: 'smooth' });
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
        else if (!homeContent) {
            dispatch(getCrossfit());
            window.scrollTo(0, 0);
        }

    }, [navigate, homeContent]);

    const [inOutStatus, setInOutStatus] = useState(true);

    return (
        <div className="home">

            {/* <HeaderNav className="headerNav" localUser={localUser}/> */}

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
                <div  >
                    <Banner />
                </div>
            </Grow>

            <Grow
                in={folterLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(folterLoad ? { timeout: 600 } : {})}
            >
                <div  >
                    <Filter setInOutStatus={setInOutStatus} />
                </div>
            </Grow>



            <Cards inOutStatus={inOutStatus} />

            {/* <SwipeableEdgeDrawer /> */}

            {/* <BackToTopButton /> */}

        </div>
    );
}

export default HomePage;