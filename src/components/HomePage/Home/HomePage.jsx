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


        const localUser = localStorage.getItem("localUserName")
        console.log(localUser, "lu en home");

        const verifyLogin = (localUser) => {
            if (!localUser) {
                navigate("/");

            } else
                setUserFirstName(localUser.split(' ')[0]);

        }
        verifyLogin(localUser);

        if (!homeContent) {
            dispatch(getDefault());
            // window.scrollTo({ top: 380, behavior: 'smooth' });
        }
        if (homeContent === "Pilates") {
            dispatch(getPilates());
            window.scrollTo({ top: 380, behavior: 'smooth' });
        }
        if (homeContent === "Crossfit") {
            dispatch(getCrossfit());
            window.scrollTo({ top: 380, behavior: 'smooth' });
        }
        if (homeContent === "Boxing") {
            dispatch(getBoxing());
            window.scrollTo({ top: 380, behavior: 'smooth' });
        }
        if (homeContent === "Yoga") {
            dispatch(getYoga());
            window.scrollTo({ top: 380, behavior: 'smooth' });
        }
        if (homeContent === "Cardio") {
            dispatch(getCardio());
            window.scrollTo({ top: 380, behavior: 'smooth' });
        }
        if (homeContent === "Contacto") {
            dispatch(getContacto());
            window.scrollTo({ top: 380, behavior: 'smooth' });
        }
        else if (!homeContent) {
            window.scrollTo(0, 0);
        }

    }, [navigate, homeContent]);


    return (
        <div className="home">

            {/* <HeaderNav className="headerNav" localUser={localUser}/> */}

            <div className='welcomeUser' >
                <h1>Bienvenido {userFisrtName}</h1>
            </div>

            {/* <NavBar /> */}

            <Banner />

            <Filter />

            <Cards />

            <BackToTopButton />

        </div>
    );
}

export default HomePage;