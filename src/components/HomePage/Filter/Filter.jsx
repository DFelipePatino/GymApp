import React from 'react'
import { useDispatch } from 'react-redux';
import { getCardio, getContacto, getPilates, getCrossfit, getBoxing, getYoga } from '../../../redux/actions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Filter.css';
import Carousel from 'react-material-ui-carousel';
import { navButtonsWrapperProps2, navButtonsProps2, containerStyles, leftArrowStyles, rightArrowStyles, iconStyles } from './filerStyles';

function Filter() {

    const dispatch = useDispatch();

    const loadFns = {

        loadCardio: () => {
            dispatch(getCardio());
        },

        loadYoga: () => {
            dispatch(getYoga());
        },

        loadPilates: () => {
            dispatch(getPilates());
        },

        loadContacto: () => {
            dispatch(getContacto());
        },

        loadKickBoxing: () => {
            dispatch(getBoxing());
        },

        loadCrossfit: () => {
            dispatch(getCrossfit());
        },

    }

    function Item(props) {

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {props.items.map((item, index) => (
                    <Button
                        variant='contained'
                        key={index}
                        onClick={() => {
                            item.click();
                            window.scrollTo({ top: 380, behavior: 'smooth' });
                        }}
                        className="button"
                    >
                        <p>{item.name}</p>
                        <div>{item.icon}</div>
                        {/* <p>{item.description}</p> */}
                    </Button>
                ))}
            </div>
        );
    }

    const items = [
        {
            icon: <FitnessCenterIcon style={iconStyles.iconStyle1} />,
            click: loadFns.loadPilates,
            name: "Pilates",
            // description: "Probably the most random thing you have ever seen!"
        },
        {
            icon: <DirectionsBikeIcon style={iconStyles.iconStyle2} />,
            click: loadFns.loadCardio,
            name: "Cardio",
            // description: "Hello World!"
        },
        {
            icon: <SelfImprovementIcon style={iconStyles.iconStyle3} />,
            click: loadFns.loadYoga,
            name: "Yoga",
            // description: "Hello World!"
        },
        {
            icon: <SportsGymnasticsIcon style={iconStyles.iconStyle1} />,
            click: loadFns.loadContacto,
            name: "Contacto",
        },
        // description: "Hello World!"

        {
            icon: <SportsKabaddiIcon style={iconStyles.iconStyle2} />,
            click: loadFns.loadKickBoxing,
            name: "Boxing",
        },
        // description: "Hello World!"

        {
            icon: <SportsHandballIcon style={iconStyles.iconStyle3} />,
            click: loadFns.loadCrossfit,
            name: "Crossfit",
            // description: "Hello World!"
        },
    ];

    // Group the items into chunks of 3
    const chunkedItems = items.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 3)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])


    return (
        <Container
            style={containerStyles} >

            {/* <ArrowBackIosNewIcon style={leftArrowStyles} /> */}

            <Carousel

                className="carousel2"
                navButtonsAlwaysVisible={false}
                navButtonsAlwaysInvisible={true}
                animation="slide"
                autoPlay={true}
                stopAutoPlayOnHover={true}
                interval={6000}

                navButtonsProps={navButtonsProps2}
                navButtonsWrapperProps={navButtonsWrapperProps2}
            >

                {
                    chunkedItems.map((itemGroup, i) => <Item key={i} items={itemGroup} />)
                }
            </Carousel>

            {/* <ArrowForwardIosIcon style={rightArrowStyles} /> */}

        </Container >
    )
}


// return (
//     <Container>
//         <Stack spacing={2} direction="row" justifyContent="center" marginTop={4} marginBottom={6}>

//             <Button
//                 variant="contained"
//                 onClick={loadFns.loadPilates}
//                 style={ButtonStyles}>
//                 Pesas
//                 <FitnessCenterIcon />
//             </Button>

//             <br />

//             <Button
//                 variant="contained"
//                 onClick={loadFns.loadPesas}
//                 style={ButtonStyles}>
//                 Cardio
//                 <DirectionsBikeIcon />
//             </Button>

//             <br />

//             <Button
//                 variant="contained"
//                 onClick={loadFns.loadCardio}
//                 style={ButtonStyles}>
//                 Yoga
//                 <SelfImprovementIcon />
//             </Button>

//         </Stack>
//     </Container>
// )
// }

export default Filter