import React from 'react'
import { useDispatch } from 'react-redux';
import { getCardio, getPesas, getPilates } from '../../../redux/actions';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import './Filter.css';

function Filter() {

    const resStackts = useSelector((state) => state.resStackts);

    const dispatch = useDispatch();

    const loadFns = {

        loadCardio: () => {
            dispatch(getCardio());
            console.log(resStackts);
        },

        loadPesas: () => {
            dispatch(getPesas());
            console.log(resStackts);
        },

        loadPilates: () => {
            dispatch(getPilates());
            console.log(resStackts);
        },

    }



    return (
        <Container className='filter'>
            <Stack spacing={2} direction="row" justifyContent="center" margin={4} >

                <Button
                    variant="contained"
                    onClick={loadFns.loadPilates}
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#D9D9D9',
                        color: 'black'
                    }}>
                    Pesas
                    <FitnessCenterIcon />
                </Button>

                <br />

                <Button
                    variant="contained"
                    onClick={loadFns.loadPesas}
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#D9D9D9',
                        color: 'black'
                    }} >
                    Cardio
                    <DirectionsBikeIcon />
                </Button>

                <br />

                <Button
                    variant="contained"
                    onClick={loadFns.loadCardio}
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#D9D9D9',
                        color: 'black'
                    }}>
                    Yoga
                    <SelfImprovementIcon />
                </Button>

            </Stack>
        </Container>
    )
}

export default Filter