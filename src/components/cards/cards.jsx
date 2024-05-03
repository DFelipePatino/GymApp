import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCardio } from '../../redux/actions';
import './cards.css';

function cards() {


    const dispatch = useDispatch();
    const results = useSelector((state) => state.results);
    console.log(results, "this are the results");

    // useEffect(() => {
    //     dispatch(getCardio());
    // }, [dispatch]);


    return (

        <Container className='results'>

            <Grid container>
                {results.map((result, index) => (
                    <Grid item key={index} xs={6} md={6} lg={4}>
                        <Paper >{result}</Paper>
                    </Grid>
                ))}
            </Grid>


        </Container>
    )
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