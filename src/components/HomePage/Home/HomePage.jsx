import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDefault, getMetodo1, getMetodo2, getMetodo3, getMetodo4, getMetodo5, getMetodo6, emptyState } from '../../../redux/actions';
import HeaderNav from '../../HeaderNav/HeaderNav';
import NavBar from '../NavBar/NavBar';
import Banner from '../Banner/banner';
import Filter1 from '../Filter/Filter1';
import Filter2 from '../Filter/Filter2';
import Filter3 from '../Filter/Filter3';
import Filter4 from '../Filter/Filter4';
import Filter5 from '../Filter/Filter5';
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
// import colorPallet from '../../ColorPallet';

function HomePage({ BackToTopButton, headerLoad, bannerLoad, filterLoad, setHeaderLoad, setBannerload, setFilterLoad }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userFisrtName, setUserFirstName] = useState("")
    const [lastNameLetter, setLastLetterName] = useState('')

    const [fadeLoad, setfadeLoad] = useState(true)



    const user = useSelector((state) => state.user);

    const homeContent = localStorage.getItem("homeContent")
    const lastCategory = localStorage.getItem("category")

    const categoryToDispatch = localStorage.getItem("categorytoDispatch")

    useEffect(() => {

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

        const scrolling = () => {
            window.scrollTo({ top: 320, behavior: 'smooth' });
            setInOutStatus(previnOutStatus => !previnOutStatus)
            setTimeout(() => {
                setInOutStatus(previnOutStatus => !previnOutStatus)
            }, 700);
        }


        if (homeContent === "Metodo 1") {
            localStorage.setItem("category", "Metodo 1");
            dispatch(getMetodo1());
            scrolling()
        }
        if (homeContent === "Metodo 2") {
            localStorage.setItem("category", "Metodo 2");
            dispatch(getMetodo2());
            scrolling()
        }
        if (homeContent === "Metodo 3") {
            localStorage.setItem("category", "Metodo 3");
            dispatch(getMetodo3());
            scrolling()
        }
        if (homeContent === "Metodo 4") {
            localStorage.setItem("category", "Metodo 4");
            dispatch(getMetodo4());
            scrolling()
        }
        if (homeContent === "Metodo 5") {
            localStorage.setItem("category", "Metodo 5");
            dispatch(getMetodo5());
            scrolling()
        }
        if (homeContent === "Metodo 6") {
            localStorage.setItem("category", "Metodo 6");
            dispatch(getMetodo6());
            scrolling()
        }

        if (homeContent === "goBack") {
            switch (categoryToDispatch) {
                case 'Metodo 1':
                    dispatch(getMetodo1());
                    scrolling()
                    break;
                case 'Metodo 2':
                    dispatch(getMetodo2());
                    scrolling()
                    break;
                case 'Metodo 3':
                    dispatch(getMetodo3());
                    scrolling()
                    break;
                case 'Metodo 4':
                    dispatch(getMetodo4());
                    scrolling()
                    break;
                case 'Metodo 5':
                    dispatch(getMetodo5());
                    scrolling()
                    break;
                case 'Metodo 6':
                    dispatch(getMetodo6());
                    scrolling()
                    break;
                default:
                    console.log('Unknown category:', categoryToDispatch);
            }
        }
        else if (!homeContent) {
            dispatch(getDefault());
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

    }, [navigate, homeContent]);

    const [inOutStatus1, setInOutStatus1] = useState(true);
    console.log(inOutStatus1, 'inOutStatus1');
    const [inOutStatus2, setInOutStatus2] = useState(true);
    const [inOutStatus3, setInOutStatus3] = useState(true);
    const [inOutStatus4, setInOutStatus4] = useState(true);
    const [inOutStatus5, setInOutStatus5] = useState(true);

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
                    <h1>Bienvenid{lastNameLetter} {userFisrtName}</h1>
                </div>
            </Grow>


            {/* <NavBar /> */}

            <Grow
                in={bannerLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(bannerLoad ? { timeout: 600 } : {})}
            >
                <div>
                    <Banner />
                </div>
            </Grow>

            <Grow
                in={filterLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(filterLoad ? { timeout: 600 } : {})}
            >
                <div
                    className='filterContainerDivHome'
                    style={containerStyles}  >


                    <h3>Tu seleccion</h3>

                    <Filter1
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                    />

                    {inOutStatus1 ?

                        <Cards1 inOutStatus1={inOutStatus1} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                        : null}

                    <br />

                    <h3>Cardio</h3>

                    <Filter2
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                    />

                    {inOutStatus2 ?
                        <Cards2 inOutStatus2={inOutStatus2} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                        : null}


                    <br />

                    <h3>Estiramiento</h3>

                    <Filter3
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                    />

                    {inOutStatus3 ?
                        <Cards3 inOutStatus3={inOutStatus3} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                        : null}


                    <br />

                    <h3>Tips Alimentacion</h3>

                    <Filter4
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                    />

                    {inOutStatus4 ?
                        <Cards4 inOutStatus4={inOutStatus4} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                        : null}

                    <br />

                    <h3>Todo el contenido</h3>

                    <Filter5
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                    />

                    {inOutStatus5 ?
                        <Cards5 inOutStatus5={inOutStatus5} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                        : null}


                </div>

            </Grow>






            {/* <SwipeableEdgeDrawer /> */}

            {/* <BackToTopButton /> */}

        </div>
    );
}

export default HomePage;