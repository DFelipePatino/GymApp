import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser, getCrossfit } from '../../../redux/actions';
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

function HomePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userFisrtName, setUserFirstName] = useState("")

    const user = useSelector((state) => state.user);
    console.log(user, "this is the user");


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

        dispatch(getCrossfit());

        window.scrollTo(0, 0);

    }, [navigate]);


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

            <KeyboardArrowUpIcon
                className='backToTop'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <p className='backToTop2'>Top</p>

            {/* // <a className='backToTop' href="#top">^</a> */}
            {/* )} */}

        </div>
    );
}

export default HomePage;