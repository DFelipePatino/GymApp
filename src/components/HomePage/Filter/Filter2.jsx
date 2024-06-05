import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMetodo1, getMetodo2, getMetodo3, getMetodo4, getMetodo5, getMetodo6, emptyState, setMetodoID } from '../../../redux/actions';
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
import { navButtonsWrapperProps2, navButtonsProps2, containerStyles, leftArrowStyles, rightArrowStyles, iconStyles } from './filterStyles';

function Filter2({ setInOutStatus1, setInOutStatus2, setInOutStatus3, setInOutStatus4, setInOutStatus5 }) {

    const dispatch = useDispatch();

    const results = useSelector((state) => state.results);
    // console.log(results, 'results en filter');

    const loadFns = {

        loadM1: (index) => {
            const metodoIndex = index
            dispatch(setMetodoID(metodoIndex))

            dispatch(getMetodo1(index));
            // console.log(index, 'index en loadM1');
            // localStorage.setItem("category", "Metodo1");
        },


    }

    function Item(props) {




        return (
            <div
                style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%', width: '100%', padding: '0px' }}
            >
                {props.items.map((item, index) => (
                    <Button
                        style={{ width: '200px', height: '170px', padding: '0px', margin: '5px', color: 'white' }}
                        // className="button"
                        // variant='contained'
                        color='error'
                        key={index}
                        onClick={() => {
                            window.scrollTo({ top: 580, behavior: 'smooth' });
                            setInOutStatus2(false)
                            setInOutStatus1(false)
                            setInOutStatus3(false)
                            setInOutStatus4(false)
                            setInOutStatus5(false)
                            setTimeout(() => {
                                setInOutStatus2(true)
                            }, 500);
                            // setTimeout(() => {
                            //     item.click(index);
                            // }, 400);
                        }}
                    >
                        <p>{item.name}</p>
                        <div>{item.icon}</div>
                        {/* <p>{item.description}</p> */}
                    </Button>
                ))}
            </div>
        );
    }


    // Group the items into chunks of 3


    let items = results?.data?.map((item, index) => {

        return {
            // icon: <SportsHandballIcon style={iconStyles.iconStyle3} />,
            icon: <img src={'public/DavidB&W.png'} alt="David" />, icon: <img src={'public/DavidB&W.png'} alt="David"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }} />, click: loadFns.loadM1,
            // name: item.nombre ? item.nombre : "Loading",
            id: item.id
        }
    });

    // console.log(items, 'items en filter');

    if (!items) {
        items = [
            {
                // icon: <FitnessCenterIcon style={iconStyles.iconStyle1} />,
                click: loadFns.loadM1(0),
                name: "Loading",
                id: 1
            },
        ]
    }

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
        >

            {/* <ArrowBackIosNewIcon style={leftArrowStyles} /> */}

            <Carousel

                // className="carousel2"
                navButtonsAlwaysVisible={true}
                // navButtonsAlwaysInvisible={false}
                animation="slide"
                autoPlay={false}
                stopAutoPlayOnHover={true}
                interval={6000}
                cycleNavigation={true}
                indicators={false}
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


export default Filter2