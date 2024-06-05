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

function Filter1({ setInOutStatus1, setInOutStatus2, setInOutStatus3, setInOutStatus4, setInOutStatus5 }) {

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

        // loadM2: () => {
        //     dispatch(getMetodo2());
        //     localStorage.setItem("category", "Metodo2");
        // },

        // loadM3: () => {
        //     dispatch(getMetodo3());
        //     localStorage.setItem("category", "Metodo3");
        // },

        // loadM4: () => {
        //     dispatch(getMetodo4());
        //     localStorage.setItem("category", "Metodo4");
        // },

        // loadM5: () => {
        //     dispatch(getMetodo5());
        //     localStorage.setItem("category", "Metodo5");
        // },

        // loadM6: () => {
        //     dispatch(getMetodo6());
        //     localStorage.setItem("category", "Metodo6");
        // },

    }

    function Item(props) {




        return (
            <div
                style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%', width: '100%', padding: '0px' }}
            >
                {props.items.map((item, index) => (
                    <Button
                        style={{ width: '200px', height: '170px', padding: '0px', margin: '5px', color: 'white', borderRadius: '20px', }}
                        // className="button"
                        // variant='contained'
                        color='error'
                        key={index}
                        onClick={() => {
                            window.scrollTo({ top: 320, behavior: 'smooth' });
                            setInOutStatus1(false)
                            setInOutStatus2(false)
                            setInOutStatus3(false)
                            setInOutStatus4(false)
                            setInOutStatus5(false)
                            setTimeout(() => {
                                setInOutStatus1(true)
                            }, 500);
                            setTimeout(() => {
                                item.click(index);
                            }, 400);
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

    // const items = [


    //     {
    //         icon: <FitnessCenterIcon style={iconStyles.iconStyle1} />,
    //         click: loadFns.loadM1,
    //         name: results?.data && results?.data.length > 0 ? results?.data[0].nombre : "Loading",
    //         // description: "Probably the most random thing you have ever seen!"
    //     },
    //     {
    //         icon: <DirectionsBikeIcon style={iconStyles.iconStyle2} />,
    //         click: loadFns.loadM2,
    //         name: results?.data && results?.data.length > 0 ? results?.data[1].nombre : "Loading",
    //         // description: "Hello World!"
    //     },
    //     {
    //         icon: <SelfImprovementIcon style={iconStyles.iconStyle3} />,
    //         click: loadFns.loadM3,
    //         name: results?.data && results?.data.length > 0 ? results?.data[2].nombre : "Loading",
    //         // description: "Hello World!"
    //     },
    //     {
    //         icon: <SportsGymnasticsIcon style={iconStyles.iconStyle1} />,
    //         click: loadFns.loadM4,
    //         name: results?.data && results?.data.length > 0 ? results?.data[3].nombre : "Loading",
    //     },
    //     // description: "Hello World!"

    //     {
    //         icon: <SportsKabaddiIcon style={iconStyles.iconStyle2} />,
    //         click: loadFns.loadM5,
    //         name: results?.data && results?.data.length > 0 ? results?.data[4].nombre : "Loading",
    //     },
    //     // description: "Hello World!"

    //     {
    //         icon: <SportsHandballIcon style={iconStyles.iconStyle3} />,
    //         click: loadFns.loadM6,
    //         name: results?.data && results?.data.length > 0 ? results?.data[5].nombre : "Loading",
    //         // description: "Hello World!"
    //     },
    // ];







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


export default Filter1