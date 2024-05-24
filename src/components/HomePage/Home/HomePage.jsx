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

    const user = useSelector((state) => state.user);
    console.log(user, "this is the user");

    // const homeContent = useSelector((state) => state.homeContent);
    // console.log(homeContent, "this is the home content");

    const homeContent = localStorage.getItem("homeContent")
    console.log(homeContent, "this is the home content");

    useEffect(() => {


        // setInOutStatus(previnOutStatus => !previnOutStatus)
        // setTimeout(() => {
        //     setInOutStatus(previnOutStatus => !previnOutStatus)
        // }, 700);

        const localUser = localStorage.getItem("localUserName")
        console.log(localUser, "lu en home");

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
                in={true}
                style={{ transformOrigin: '1 1 1' }}
                {...(true ? { timeout: 1500 } : {})}
            >
                <div className='welcomeUser' >
                    <h1>Bienvenido {userFisrtName}</h1>
                </div>
            </Grow>

            {/* <NavBar /> */}

            <Banner />

            <Filter setInOutStatus={setInOutStatus} />

            <Cards inOutStatus={inOutStatus} />

            {/* <SwipeableEdgeDrawer /> */}

            {/* <BackToTopButton /> */}

        </div>
    );
}

export default HomePage;