import React from 'react';
import NavBar from '../NavBar/NavBar';
import Cards from '../../cards/cards'
import Banner from '../Banner/banner';
import Filter from '../Filter/Filter';
import Container from '@mui/material/Container';

import './HomePage.css';

function HomePage() {

    const user = 'David';

    return (
        <div className="home">

            <div className='welcome' >
                <h1>Bienvenido {user}</h1>
            </div>

            <NavBar />

            <Banner />

            <Filter />

            <Cards />



        </div>
    );
}

export default HomePage;