import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';

import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';

import CardDrawer from '../HomePage/CardDrawer/CardDrawer';
import './cards.css';
import { Grow } from '@mui/material';

import MetodoCard from './MetodoCard';

function BotonesCarrulesMetodos({ inOutStatus1, setHeaderLoad, setBannerload, setFilterLoad, setInOutStatus1, metodoSelected }) {

    const [checked, setChecked] = React.useState(true);


    return (
        <Container className='results'>

            <Grow
                in={inOutStatus1}
                style={{ transformOrigin: '1 1 1' }}
                {...(checked ? { timeout: 400 } : {})}
            >
                <Grid container>
                    <MetodoCard setInOutStatus1={setInOutStatus1} inOutStatus1={inOutStatus1} metodoSelected={metodoSelected} />
                </Grid>

            </Grow>

            <CardDrawer setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />


        </Container >
    );
}

export default BotonesCarrulesMetodos








{/* <Container className='results'>
<Grid container>
    {results.map((result, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}> 
            <Paper>{result}</Paper>
        </Grid>
    ))}

</Grid>
</Container> */}