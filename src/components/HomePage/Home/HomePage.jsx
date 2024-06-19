import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDefault, getMetodo1, getMetodo2, getMetodo3, getMetodo4, getMetodo5, getMetodo6, emptyState } from '../../../redux/actions';
import HeaderNav from '../../HeaderNav/HeaderNav';
import NavBar from '../NavBar/NavBar';
import Banner from '../Banner/banner';
// import Filter1 from '../Filter/Filter1';
// import Filter2 from '../Filter/Filter2';
// import Filter3 from '../Filter/Filter3';
// import Filter4 from '../Filter/Filter4';
// import Filter5 from '../Filter/Filter5';
import Test1 from '../Filter/Test1';
import Test2 from '../Filter/Test2';
import Test3 from '../Filter/Test3';
import Test4 from '../Filter/Test4';
import Test5 from '../Filter/Test5';
import Cards1 from '../../cards/Cards1'
import Cards2 from '../../cards/Cards2'
import Cards3 from '../../cards/Cards3'
import Cards4 from '../../cards/Cards4'
import Cards5 from '../../cards/Cards5'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './HomePage.css';
import CardDrawer from '../CardDrawer/CardDrawer';
import { Fade, Grow, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import { containerStyles } from '../Filter/filterStyles';
import { TroubleshootRounded } from '@mui/icons-material';
// import colorPallet from '../../ColorPallet';

function HomePage({ BackToTopButton, headerLoad, bannerLoad, filterLoad, setHeaderLoad, setBannerload, setFilterLoad, scrollToFilter1, filterRef1, scrollToFilter2, filterRef2, scrollToFilter3, filterRef3, scrollToFilter4, filterRef4, scrollToFilter5, filterRef5 }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const results = useSelector((state) => state.results.data);
    const favs = useSelector((state) => state.favorites);


    const homeContent = localStorage.getItem("homeContent")
    const lastCategory = localStorage.getItem("category")
    const categoryToDispatch = localStorage.getItem("categorytoDispatch")



    const [userFisrtName, setUserFirstName] = useState("")
    const [lastNameLetter, setLastLetterName] = useState('')
    const [fadeLoad, setfadeLoad] = useState(true)
    const [inOutStatus1, setInOutStatus1] = useState(false);
    const [inOutStatus2, setInOutStatus2] = useState(false);
    const [inOutStatus3, setInOutStatus3] = useState(false);
    const [inOutStatus4, setInOutStatus4] = useState(false);
    const [inOutStatus5, setInOutStatus5] = useState(false);


    // const addFav = (newFav) => {
    //     setFavs((prevFavs) => {
    //         // Check if the array already contains an object with the same id
    //         const exists = prevFavs.some(fav => fav.id === newFav.id);
    //         // If it does not exist, add the newFav object to the array
    //         if (!exists) {
    //             return [...prevFavs, newFav];
    //         }
    //         // If it exists, return the previous array without adding the new object
    //         return prevFavs;
    //     });
    // };

    // const removeFav = (item) => {
    //     // console.log(item, 'item en removeFav');
    //     setFavs((prevFavs) => {
    //         return prevFavs.filter((fav) => fav.id !== item.id);
    //     });
    // }


    useEffect(() => {

        localStorage.removeItem('entrenamientoSeleccionado')
        // localStorage.removeItem('CardIndex')

        setTimeout(() => {
            setfadeLoad(false)
        }, 900);
        setTimeout(() => {
            setHeaderLoad(true)
        }, 600);
        setTimeout(() => {
            setBannerload(true)
        }, 500);
        setTimeout(() => {
            setFilterLoad(true)
        }, 300);

        const localUser = localStorage.getItem("localUserName")

        if (localUser.split(' ')[0].endsWith('a')) {
            setLastLetterName('a');
        } else {
            setLastLetterName('o');
        }

        const verifyLogin = (localUser) => {
            if (!localUser) {
                navigate("/");

            } else
                setUserFirstName(localUser.split(' ')[0]);

        }
        verifyLogin(localUser);

        // const scrolling = () => {
        //     window.scrollTo({ top: 320, behavior: 'smooth' });
        //     console.log('scrolling done');
        //     setTimeout(() => {
        //         setInOutStatus1(true);
        //     }, 700);
        // }


        if (homeContent === "Tu Seleccion") {
            // dispatch(getMetodo1(0));
            scrollToFilter1()
        }

        if (homeContent === "Metodo 1") {
            localStorage.setItem("category", "Metodo 1");
            // dispatch(getMetodo1(0));
            scrollToFilter1()
        }
        if (homeContent === "Metodo 2") {
            localStorage.setItem("category", "Metodo 2");
            // dispatch(getMetodo1(1));
            scrollToFilter1()
        }
        if (homeContent === "Metodo 3") {
            localStorage.setItem("category", "Metodo 3");
            // dispatch(getMetodo1(2));
            scrollToFilter1()
        }
        if (homeContent === "Metodo 4") {
            localStorage.setItem("category", "Metodo 4");
            // dispatch(getMetodo1(3));
            scrollToFilter1()
        }
        if (homeContent === "Metodo 5") {
            localStorage.setItem("category", "Metodo 5");
            // dispatch(getMetodo1(4));
            scrollToFilter1()
        }
        if (homeContent === "Metodo 6") {
            localStorage.setItem("category", "Metodo 6");
            // dispatch(getMetodo1(5));
            scrollToFilter1()
        }

        if (homeContent === "Cardio") {
            // localStorage.setItem("category", "Metodo 6");
            // dispatch(getMetodo1(5));
            scrollToFilter2()
        }

        if (homeContent === "Estiramiento") {
            // localStorage.setItem("category", "Metodo 6");
            // dispatch(getMetodo1(5));
            scrollToFilter3()
        }

        if (homeContent === "Tips Alimentacion") {
            // localStorage.setItem("category", "Metodo 6");
            // dispatch(getMetodo1(5));
            scrollToFilter4()
        }

        if (homeContent === "Todos") {
            // localStorage.setItem("category", "Metodo 6");
            // dispatch(getMetodo1(5));
            scrollToFilter5()
        }

        console.log('homeContent:', homeContent);
        console.log('lastCategory:', lastCategory);
        console.log('categoryToDispatch:', categoryToDispatch);


        if (homeContent === "goBack") {
            switch (lastCategory) {
                // case 'Metodo 1':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1()
                //     break;
                // case 'Metodo 2':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1()
                //     break;
                // case 'Metodo 3':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1()
                //     break;
                // case 'Metodo 4':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1()
                //     break;
                // case 'Metodo 5':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1()
                //     break;
                // case 'Metodo 6':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1()
                //     break;
                case 'Tu Seleccion':
                    dispatch(getMetodo1(0));
                    scrollToFilter1()
                    break;
                case 'Cardio':
                    // dispatch(getMetodo1(5));
                    scrollToFilter2()
                    break;
                case 'Estiramiento':
                    // dispatch(getMetodo1(5));
                    scrollToFilter3()
                    break;
                case 'Tips Alimentacion':
                    // dispatch(getMetodo1(5));
                    scrollToFilter4()
                    break;
                case 'Todos':
                    // dispatch(getMetodo1(5));
                    scrollToFilter5()
                    break;
                default:
                    console.log('Unknown category:', lastCategory);
            }
        }
        else if (!homeContent) {
            dispatch(getDefault());
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

    }, [navigate, homeContent]);


    return (


        <div className="home">


            <Fade in={fadeLoad} timeout={600}>

                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>

            </Fade>

            <Grow
                in={headerLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(headerLoad ? { timeout: 800 } : {})}
            >
                <div className='welcomeUser' >
                    {/* <h1>Bienvenid{lastNameLetter} {userFisrtName}</h1> */}
                    <br />
                    <br />
                </div>
            </Grow>


            {/* <NavBar /> */}

            <Grow
                in={bannerLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(bannerLoad ? { timeout: 600 } : {})}
            >
                <div

                >
                    <Banner />
                </div>
            </Grow>



            {/* <div
                style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', paddingLeft: '50px', paddingRight: '50px', fontSize: '0.8rem', color: 'rgb(146, 144, 144)', paddingBottom: '20px' }}
            >
                <button onClick={scrollToFilter1}>Tu Seleccion</button>
                <button onClick={scrollToFilter2}>Estiramiento</button>
                <button onClick={scrollToFilter3}>Tips Alimentacion</button>
                <button onClick={scrollToFilter4}>Cardio</button>
                <button onClick={scrollToFilter5}>Todos</button>
            </div> */}

            <Grow
                in={filterLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(filterLoad ? { timeout: 600 } : {})}
            >
                <div
                    className='filterContainerDivHome'
                    style={containerStyles}  >




                    {/* <Filter1
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                        ref={filterRef1}
                        /> */}

                    {favs.length > 0 ? <h3>Tu seleccion</h3> : null}

                    <Test5
                        favs={favs}
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                        ref={filterRef1}
                    />




                    {inOutStatus5 ?
                        <Cards5 inOutStatus5={inOutStatus5} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                        : null}

                    <br />



                    <h3>Cardio</h3>

                    {/* <Filter2
    setInOutStatus1={setInOutStatus1}
    setInOutStatus2={setInOutStatus2}
    setInOutStatus3={setInOutStatus3}
    setInOutStatus4={setInOutStatus4}
    setInOutStatus5={setInOutStatus5}
    ref={filterRef2}
/> */}


                    <Test2
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                        ref={filterRef2}
                    />


                    {inOutStatus2 ?
                        <Cards2 inOutStatus2={inOutStatus2} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                        : null}


                    <br />

                    <h3>Estiramiento</h3>

                    {/* <Filter3
    setInOutStatus1={setInOutStatus1}
    setInOutStatus2={setInOutStatus2}
    setInOutStatus3={setInOutStatus3}
    setInOutStatus4={setInOutStatus4}
    setInOutStatus5={setInOutStatus5}
    ref={filterRef3}
/> */}



                    <Test3
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                        ref={filterRef3}
                    />


                    {inOutStatus3 ?
                        <Cards3 inOutStatus3={inOutStatus3} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                        : null}


                    <br />

                    <h3>Tips Alimentacion</h3>

                    {/* <Filter4
    setInOutStatus1={setInOutStatus1}
    setInOutStatus2={setInOutStatus2}
    setInOutStatus3={setInOutStatus3}
    setInOutStatus4={setInOutStatus4}
    setInOutStatus5={setInOutStatus5}
    ref={filterRef4}
/> */}


                    <Test4
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                        ref={filterRef4}
                    />


                    {inOutStatus4 ?
                        <Cards4 inOutStatus4={inOutStatus4} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                        : null}


                    {/* //here goes the rest of the code// */}

                    <br />

                    <h3>Todo el contenido</h3>

                    {/* <Filter5
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                        ref={filterRef5}
                    /> */}


                    <Test1
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                        ref={filterRef5}
                    />



                    {inOutStatus1 ?

                        <Cards1 inOutStatus1={inOutStatus1} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                        : null}


                </div>

            </Grow >






            {/* <SwipeableEdgeDrawer /> */}

            {/* <BackToTopButton /> */}

        </div >
    );
}

export default HomePage;