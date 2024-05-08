import React from 'react';
import NavBar from '../NavBar/NavBar';
import Cards from '../../cards/cards'
import Banner from '../Banner/banner';
import Filter from '../Filter/Filter';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import './HomePage.css';

function HomePage() {

    const user = 'David';

    return (
        <div className="home">

            <div className='welcome' >
                <h1>Bienvenido {user}</h1>
            </div>

            {/* <div container className='dotContainer'>

                <FiberManualRecordIcon style={{ color: 'red' }} />
                <FiberManualRecordIcon style={{ color: 'blue' }} />

            </div>

            <div container className='dotContainer2'>

                <FiberManualRecordIcon style={{ color: 'grey' }} />
                <FiberManualRecordIcon style={{ color: 'lightgrey' }} />

            </div> */}

            <NavBar />

            <Banner />

            <Filter />

            <Cards />

        </div>
    );
}

export default HomePage;