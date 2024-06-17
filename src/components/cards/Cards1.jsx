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

function Cards1({ inOutStatus1, setHeaderLoad, setBannerload, setFilterLoad }) {

    const [checked, setChecked] = React.useState(true);

    const resultsFiltered = useSelector((state) => state.resultsFiltered);

    return (
        <Container className='results'>
            <Grow
                in={inOutStatus1}
                // out={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 400 } : {})}
            >
                {resultsFiltered?.nombre ?

                    <h2 className='resultsTitle'>{resultsFiltered?.nombre}</h2>
                    : <h3 className='resultsTitle'></h3>}

            </Grow>
            <Grow
                in={inOutStatus1}
                // out={checked}
                style={{ transformOrigin: '1 1 1' }}
                {...(checked ? { timeout: 400 } : {})}
            >
                <Grid container>

                    {/* <Card
                        style={{
                            // margin: '10px',
                            borderRadius: '20px',
                            fontSize: '1.2rem',
                            width: '100%',
                            padding: '10px',
                            backgroundColor: 'transparent',
                            color: 'rgb(146, 144, 144)',
                            paddingTop: '0',
                            paddingBottom: '10',
                            marginLeft: '5%'
                        }}
                    >

                        <p
                            style={{ marginTop: '0', marginBottom: '0' }}
                        >{resultsFiltered?.duración}</p>

                        {resultsFiltered?.repeticiones ?
                            <p
                                style={{ marginTop: '0', marginBottom: '0' }}
                            >{resultsFiltered?.repeticiones} Repeticiones</p> : null}

                    </Card> */}

                    <MetodoCard resultsFiltered={resultsFiltered} />

                </Grid>


            </Grow>


            <CardDrawer setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />


        </Container >
    );
}

export default Cards1








{/* <Container className='results'>
<Grid container>
    {results.map((result, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}> 
            <Paper>{result}</Paper>
        </Grid>
    ))}

</Grid>
</Container> */}