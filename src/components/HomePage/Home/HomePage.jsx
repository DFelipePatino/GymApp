import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDefault, getMetodo1, getProgresoActual, getMethods, getBanner, getCategories, getCardio, getEstiramientos } from '../../../redux/actions';
import Banner from '../Banner/banner';
import CarruselMetodos from '../Filter/CarruselMetodos';
import Cardio from '../Filter/Cardio';
import Estiramiento from '../Filter/Estiramiento';
import Test4 from '../Filter/Test4';
import Seleccionado from '../Filter/Seleccionado';
import BotonesCarrulesMetodos from '../../cards/BotonesCarrulesMetodos'
import Cards3 from '../../cards/Cards3'
import Cards4 from '../../cards/Cards4'
import BotonesCarruselSeleccionado from '../../cards/BotonesCarruselSeleccionado'
import './HomePage.css';
import { Fade, Grow, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import { containerStyles } from '../Filter/filterStyles';


function HomePage({ BackToTopButton, headerLoad, bannerLoad, filterLoad, setHeaderLoad, setBannerload, setFilterLoad, scrollToFilter1, filterRef1, scrollToCardio, filterRef2, scrollToEstiramiento, filterRef3, scrollToFilter4, filterRef4, scrollToTodos, filterRef5, reload, setInfoPremium, usuario }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const reLoad = reload;

    const metodoSelected = useSelector((state) => state.metodoSelected);



    const homeContent = localStorage.getItem("homeContent")
    const lastCategory = localStorage.getItem("category")
    const categoryToDispatch = localStorage.getItem("categorytoDispatch")



    const [mostrarElementos, setMostrarElementos] = useState(true);
    const [userFisrtName, setUserFirstName] = useState("")
    const [lastNameLetter, setLastLetterName] = useState('')
    const [fadeLoad, setfadeLoad] = useState(true)
    const [inOutStatus1, setInOutStatus1] = useState(false);
    const [inOutStatus2, setInOutStatus2] = useState(false);
    const [inOutStatus3, setInOutStatus3] = useState(false);
    const [inOutStatus4, setInOutStatus4] = useState(false);
    const [inOutStatus5, setInOutStatus5] = useState(false);

    const isMounted = useRef(true);


    const [dynamicStyle, setDynamicStyle] = useState({ marginBottom: '-80px' });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                if (isMounted.current) setDynamicStyle({ marginBottom: '-10px' }); // Adjust style for smaller screens
            } else {
                if (isMounted.current) setDynamicStyle({ marginBottom: '-80px' }); // Default style for larger screens
            }
        };

        // Set the initial style based on the current window width
        handleResize();


        // Add event listener
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    const shouldReload = (reLoad) => {
        if (reLoad) {
            window.location.reload();
        }
    };


    useEffect(() => {
        isMounted.current = true;

        setTimeout(() => {
            shouldReload(reLoad)
        }, 1500);


        dispatch(getProgresoActual());
        dispatch(getMethods());
        dispatch(getBanner());
        dispatch(getCategories());
        dispatch(getCardio());
        dispatch(getEstiramientos());

        // localStorage.removeItem('entrenamientoSeleccionado');
        // localStorage.removeItem('CardIndex');

        if (!reLoad) {

            setTimeout(() => {
                if (isMounted.current) setfadeLoad(false);
            }, 900);
            setTimeout(() => {
                if (isMounted.current) setHeaderLoad(true);
            }, 600);
            setTimeout(() => {
                if (isMounted.current) setBannerload(true);
            }, 500);
            setTimeout(() => {
                if (isMounted.current) setFilterLoad(true);
            }, 300);
        }


        if (homeContent === "Tu Seleccion") {
            // dispatch(getMetodo1(0));
            scrollToFilter1();
        }

        if (homeContent === "Metodo 1") {
            localStorage.setItem("category", "Metodo 1");
            // dispatch(getMetodo1(0));
            scrollToFilter1();
        }
        if (homeContent === "Metodo 2") {
            localStorage.setItem("category", "Metodo 2");
            // dispatch(getMetodo1(1));
            scrollToFilter1();
        }
        if (homeContent === "Metodo 3") {
            localStorage.setItem("category", "Metodo 3");
            // dispatch(getMetodo1(2));
            scrollToFilter1();
        }
        if (homeContent === "Metodo 4") {
            localStorage.setItem("category", "Metodo 4");
            // dispatch(getMetodo1(3));
            scrollToFilter1();
        }
        if (homeContent === "Metodo 5") {
            localStorage.setItem("category", "Metodo 5");
            // dispatch(getMetodo1(4));
            scrollToFilter1();
        }
        if (homeContent === "Metodo 6") {
            localStorage.setItem("category", "Metodo 6");
            // dispatch(getMetodo1(5));
            scrollToFilter1();
        }

        if (homeContent === "Cardio") {
            // localStorage.setItem("category", "Metodo 6");
            // dispatch(getMetodo1(5));
            scrollToCardio();
        }

        if (homeContent === "Estiramiento") {
            // localStorage.setItem("category", "Metodo 6");
            // dispatch(getMetodo1(5));
            scrollToEstiramiento();
        }

        if (homeContent === "Tips Alimentacion") {
            // localStorage.setItem("category", "Metodo 6");
            // dispatch(getMetodo1(5));
            scrollToFilter4();
        }

        if (homeContent === "Todos") {
            // localStorage.setItem("category", "Metodo 6");
            // dispatch(getMetodo1(5));
            scrollToTodos();
        }

        // console.log('homeContent:', homeContent);
        // console.log('lastCategory:', lastCategory);
        // console.log('categoryToDispatch:', categoryToDispatch);

        if (homeContent === "goBack") {
            switch (lastCategory) {
                // case 'Metodo 1':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1();
                //     break;
                // case 'Metodo 2':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1();
                //     break;
                // case 'Metodo 3':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1();
                //     break;
                // case 'Metodo 4':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1();
                //     break;
                // case 'Metodo 5':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1();
                //     break;
                // case 'Metodo 6':
                //     dispatch(getMetodo1(0));
                //     scrollToFilter1();
                //     break;
                case 'Tu Seleccion':
                    dispatch(getMetodo1(0));
                    scrollToFilter1();
                    break;
                case 'Cardio':
                    // dispatch(getMetodo1(5));
                    scrollToCardio();
                    break;
                case 'Estiramiento':
                    // dispatch(getMetodo1(5));
                    scrollToEstiramiento();
                    break;
                case 'Tips Alimentacion':
                    // dispatch(getMetodo1(5));
                    scrollToFilter4();
                    break;
                case 'Todos':
                    // dispatch(getMetodo1(5));
                    scrollToTodos();
                    break;
                default:
                    console.log('Unknown category:', lastCategory);
            }
        } else if (!homeContent) {
            dispatch(getDefault());
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        return () => {
            isMounted.current = false;
        };
    }, [navigate, homeContent, reLoad]);


    return (


        <div className="home">


            <Fade in={fadeLoad} timeout={600}>

                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>

            </Fade>



            <Grow
                in={bannerLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(bannerLoad ? { timeout: 1000 } : {})}
            >
                <div
                    style={dynamicStyle}
                >
                    <Banner
                        setInfoPremium={setInfoPremium} />
                </div>
            </Grow>


            <Grow
                in={filterLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(filterLoad ? { timeout: 1800 } : {})}
            >
                <div
                    className='filterContainerDivHome'
                    style={containerStyles}  >


                    {mostrarElementos ? (
                        <>
                            <h3>Tu seleccion</h3>
                            <Seleccionado
                                usuario={usuario}
                                setInOutStatus1={setInOutStatus1}
                                setInOutStatus2={setInOutStatus2}
                                setInOutStatus3={setInOutStatus3}
                                setInOutStatus4={setInOutStatus4}
                                setInOutStatus5={setInOutStatus5}
                                setMostrarElementos={setMostrarElementos}
                                ref={filterRef1}
                            />
                            {inOutStatus5 && (
                                <BotonesCarruselSeleccionado
                                    inOutStatus5={inOutStatus5}
                                    setHeaderLoad={setHeaderLoad}
                                    setBannerload={setBannerload}
                                    setFilterLoad={setFilterLoad}
                                    setInOutStatus5={setInOutStatus5}
                                    metodoSelected={metodoSelected}
                                />
                            )}
                        </>
                    ) : null}

                    <br />


                    <h3>Todo el contenido</h3>
                    <CarruselMetodos
                        usuario={usuario}
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                        ref={filterRef5}
                    />



                    {inOutStatus1 ?
                        <BotonesCarrulesMetodos inOutStatus1={inOutStatus1} setInOutStatus1={setInOutStatus1} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} metodoSelected={metodoSelected} />

                        : null}

                    <br />

                    <h3>Cardio</h3>
                    <Cardio
                        setInOutStatus1={setInOutStatus1}
                        setInOutStatus2={setInOutStatus2}
                        setInOutStatus3={setInOutStatus3}
                        setInOutStatus4={setInOutStatus4}
                        setInOutStatus5={setInOutStatus5}
                        ref={filterRef2}
                    />


                    <br />

                    <h3>Estiramiento</h3>
                    <Estiramiento
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
                    <br />




                </div>

            </Grow >

        </div >
    );
}

export default HomePage;