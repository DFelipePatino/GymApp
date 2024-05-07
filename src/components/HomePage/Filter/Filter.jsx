import React from 'react'
import { useDispatch } from 'react-redux';
import { getCardio, getPesas, getPilates } from '../../../redux/actions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import './Filter.css';
import Carousel from 'react-material-ui-carousel';

function Filter() {

    const dispatch = useDispatch();

    const loadFns = {

        loadCardio: () => {
            dispatch(getCardio());
        },

        loadPesas: () => {
            dispatch(getPesas());
        },

        loadPilates: () => {
            dispatch(getPilates());
        },

        loadContacto: () => {
            dispatch(getCardio());
        },

        loadKickBoxing: () => {
            dispatch(getCardio());
        },

        loadCrossfit: () => {
            dispatch(getCardio());
        },

    }


    function Item(props) {

        // const ButtonStyles = {
        //     borderRadius: '20px',
        //     backgroundColor: '#D9D9D9',
        //     color: 'black',
        //     margin: '0 10px',
        //     paddingBottom: '70px',
        //     paddingRight: '120px',
        //     display: 'flex',
        //     justifyContent: 'space-between',
        // }

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {props.items.map((item, index) => (
                    <Button
                        variant='contained'
                        key={index}
                        onClick={item.click}
                        // style={ButtonStyles}
                        className="button"
                    >

                        <p>{item.name}</p>
                        <br />
                        <icon>{item.icon}</icon>

                        {/* <p>{item.description}</p> */}
                    </Button>
                ))}
            </div>
        );
    }

    const items = [
        {
            icon: <FitnessCenterIcon />,
            click: loadFns.loadPilates,
            name: "Pilates",
            // description: "Probably the most random thing you have ever seen!"
        },
        {
            icon: <DirectionsBikeIcon />,
            click: loadFns.loadPesas,
            name: "Cardio",
            // description: "Hello World!"
        },
        {
            icon: <SelfImprovementIcon />,
            click: loadFns.loadCardio,
            name: "Yoga",
            // description: "Hello World!"
        },
        {
            icon: <SportsGymnasticsIcon />,
            click: loadFns.loadContacto,
            name: "Contacto",
            // description: "Hello World!"
        },
        {
            icon: <SportsKabaddiIcon style={{ backgroundColor: 'red' }} />,
            click: loadFns.loadKickBoxing,
            name: "Kick Boxing",
        },
            // description: "Hello World!"
        
        {
            icon: <SportsHandballIcon />,
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
        <Container style={{ display: 'flex', justifyContent: 'center' }} >
            <Carousel className="carousel2"
                navButtonsAlwaysVisible={true}
                navButtonsAlwaysInvisible={false}
                animation="slide"
                autoPlay={false}
                navButtonsProps={{          
                    style: {
                        backgroundColor: 'transparent',
                        color: 'black',
                    }
                }}
                // itemPadding={[5]} // Add a gap between items
                navButtonsWrapperProps={{
                    style: {
                        bottom: '0',
                        top: '0',
                        transform: 'none',
                        height: '100%',
                        position: "relative"
                    }
                }}
            >

                {
                    chunkedItems.map((itemGroup, i) => <Item key={i} items={itemGroup} />)
                }
            </Carousel>
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