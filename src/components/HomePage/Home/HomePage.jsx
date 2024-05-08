import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
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

    const user = useSelector((state) => state.user);

    const userFisrtName = user.split(' ')[0];

    const cardsR = useSelector((state) => state.results);
    console.log(cardsR, "this are the cardR");

    console.log(user, "this is the user");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Added closing parenthesis after the empty dependency array

    // Rest of the code...


    return (
        <div className="home">

            <HeaderNav className="headerNav" />

            <div className='welcome' >
                <h1>Bienvenido {userFisrtName}</h1>
            </div>

            <NavBar />

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