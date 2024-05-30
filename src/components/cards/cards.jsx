import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { toggleDrawer } from '../HomePage/CardDrawer/CardDrawer';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCardio } from '../../redux/actions';
import CardDrawer from '../HomePage/CardDrawer/CardDrawer';
import './cards.css';
import { Grow } from '@mui/material';
import { TrainRounded } from '@mui/icons-material';

function cards({ inOutStatus, setHeaderLoad, setBannerload, setFilterLoad }) {

    const [checked, setChecked] = React.useState(true);

    const dispatch = useDispatch();
    const results = useSelector((state) => state.results);

    // useEffect(() => {
    //     setChecked(prevChecked => !prevChecked);
    //     setTimeout(() => {
    //         setChecked(prevChecked => !prevChecked);
    //     }, 500);
    // }, [inOutStatus]);

    return (

        <Container className='results'>
            <Grow
                in={inOutStatus}
                // out={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 400 } : {})}
            >
                <h3 className='resultsTitle'>{results?.category}</h3>
            </Grow>
            <Grow
                in={inOutStatus}
                // out={checked}
                style={{ transformOrigin: '1 1 1' }}
                {...(checked ? { timeout: 400 } : {})}
            >
                <Grid container>
                    {results?.images?.map((image, index) => (
                        <Grid item key={index} xs={6} md={4} lg={4}
                            onClick={toggleDrawer(true)}>
                            <img className='imageresult' src={image} />
                        </Grid>
                    ))}
                </Grid>
            </Grow>
            <CardDrawer setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />
        </Container>
    );
}

export default cards








{/* <Container className='results'>
<Grid container>
    {results.map((result, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}> 
            <Paper>{result}</Paper>
        </Grid>
    ))}

</Grid>
</Container> */}