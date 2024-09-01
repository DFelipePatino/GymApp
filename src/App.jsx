import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogIn from './components/LogIn/LogIn.jsx';
import HomePage from './components/HomePage/Home/HomePage';
import Profile2 from './components/Perfil/Profile2.jsx';
import ProfileEdit from './components/Perfil/ProfileEdit.jsx';
import Registro from './components/LogIn/Registro/Registro.jsx';
import ProfileCard from './components/Perfil/profileCard';
import Chat from './components/Chat/Chat.jsx';
import Layout from './components/Layout/Layout.jsx';
import DropDownCategorias from './components/Perfil/DropDownCategorias.jsx';
import WAButton from './components/WAButton/WAButton.jsx';
import ContentPlayer from './components/HomePage/Home/ContentPlayer/ContentPlayer.jsx';
import { getCategories, getProgresoActual, getGoogle } from './redux/actions.js';
import ContentPlayerCE from './components/HomePage/Home/ContentPlayer/ContentPlayerCE.jsx';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  const [headerLoad, setHeaderLoad] = useState(false)
  const [bannerLoad, setBannerload] = useState(false)
  const [filterLoad, setFilterLoad] = useState(false)
  const [infoPremium, setInfoPremium] = useState(false)
  const [activeButton, setActiveButton] = useState("");
  const [headerMountIn, setHeaderMountIn] = useState(false)
  const [contentMountIn, setContentMountIn] = useState(false)
  const [navigateAway, setNavigateAway] = useState(false)
  const [reload, setReload] = useState(false)

  console.log(infoPremium, 'infoPremium app');
  

  const [playerLoad, setPlayerLoad] = useState(false)

  const localUser = localStorage.getItem("localUser");

  const todasLasCategorias = useSelector(state => state.allCategories)

  let usuario = JSON.parse(localStorage.getItem("localUser"));

  function calculateAge(dobString) {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    // Adjust age if the current date is before the birthday in the current year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }

  const callActions = () => {
    dispatch(getCategories());
    dispatch(getProgresoActual());
  }



  useEffect(async () => {

    callActions();

    const token = await localStorage.getItem("id_token");
    if (token) {

      try {
        let pUsuario = await getGoogle();

        const age = calculateAge(pUsuario.fechaNacimiento);

        const updatedRespuesta = {
          ...pUsuario,
          age: age
        };

        await localStorage.setItem('localUser', JSON.stringify(updatedRespuesta));

      } catch (err) {
        navigate('/');
        return;
      }

      usuario = JSON.parse(localStorage.getItem("localUser"));

    } else {
      navigate('/');
    }

  }, []);


  const scrollToFilter1 = () => {
    if (filterRef1.current) {
      filterRef1.current.scrollToComponent();
      console.log('scrolling f1?');
      // dispatch(getMetodo1(0));
    }
  };
  const scrollToCardio = () => {
    console.log('scrolling f2?');
    if (filterRef2.current) {
      filterRef2.current.scrollToComponent();
    }
  };
  const scrollToEstiramiento = () => {
    if (filterRef3.current) {
      filterRef3.current.scrollToComponent();
      console.log('scrolling f3?');
    }
  };
  const scrollToFilter4 = () => {
    if (filterRef4.current) {
      filterRef4.current.scrollToComponent();
      console.log('scrolling f4?');
    }
  };
  const scrollToTodos = () => {
    if (filterRef5.current) {
      filterRef5.current.scrollToComponent();
      console.log('scrolling f5?');
    }
  };

  const filterRef1 = useRef(null);
  const filterRef2 = useRef(null);
  const filterRef3 = useRef(null);
  const filterRef4 = useRef(null);
  const filterRef5 = useRef(null);

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/registro" &&
        <Layout
          headerLoad={headerLoad}
          bannerLoad={bannerLoad}
          filterLoad={filterLoad}
          setHeaderLoad={setHeaderLoad}
          setBannerload={setBannerload}
          setFilterLoad={setFilterLoad}

          setPlayerLoad={setPlayerLoad}
          playerLoad={playerLoad}

          headerMountIn={headerMountIn}
          contentMountIn={contentMountIn}
          setHeaderMountIn={setHeaderMountIn}
          setContentMountIn={setContentMountIn}
          navigateAway={navigateAway}
          setNavigateAway={setNavigateAway}

          scrollToFilter1={scrollToFilter1}
          scrollToCardio={scrollToCardio}
          scrollToEstiramiento={scrollToEstiramiento}
          scrollToFilter4={scrollToFilter4}
          scrollToTodos={scrollToTodos}

          activeButton={activeButton}
          setActiveButton={setActiveButton}

          setInfoPremium={setInfoPremium}
          infoPremium={infoPremium}

          usuario={usuario} />}

      <Routes>

        <Route path='/' element={<LogIn />} />

        {/* <Route path='/testeo' element={<Testtt profilefoto={profilefoto} />} /> */}

        <Route path='/registro' element={<Registro
          setReload={setReload}
          WAButton={WAButton}
          usuario={usuario}
          todasLasCategorias={todasLasCategorias}
        />} />

        <Route path='/home' element={<HomePage
          reload={reload}
          headerLoad={headerLoad}
          bannerLoad={bannerLoad}
          filterLoad={filterLoad}
          setHeaderLoad={setHeaderLoad}
          setBannerload={setBannerload}
          setFilterLoad={setFilterLoad}
          WAButton={WAButton}
          localUser={localUser}
          scrollToFilter1={scrollToFilter1}
          scrollToCardio={scrollToCardio}
          scrollToEstiramiento={scrollToEstiramiento}
          scrollToFilter4={scrollToFilter4}
          scrollToTodos={scrollToTodos}
          filterRef1={filterRef1}
          filterRef2={filterRef2}
          filterRef3={filterRef3}
          filterRef4={filterRef4}
          filterRef5={filterRef5}
          setInfoPremium={setInfoPremium}
          usuario={usuario}
        />} />

        <Route path='/player/:entrenamientoId' element={<ContentPlayer
          usuario={usuario}
          setReload={setReload}
          setPlayerLoad={setPlayerLoad}
          playerLoad={playerLoad} />}
          WAButton={WAButton} />

        <Route path='/playerCE' element={<ContentPlayerCE
          setReload={setReload}
          setPlayerLoad={setPlayerLoad}
          playerLoad={playerLoad}
          WAButton={WAButton} />} />

        {/* <Route path='/profile' element={<Profile
          localUser={localUser} />} /> */}

        <Route path='/profile' element={<Profile2
          reload={reload}
          headerMountIn={headerMountIn}
          contentMountIn={contentMountIn}
          setHeaderMountIn={setHeaderMountIn}
          setContentMountIn={setContentMountIn}
          navigateAway={navigateAway}
          setNavigateAway={setNavigateAway}
          WAButton={WAButton}
          name={localUser}
          usuario={usuario}
          todasLasCategorias={todasLasCategorias}
          setInfoPremium={setInfoPremium}
          infoPremium={infoPremium}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />} />

        <Route path='/profileedit' element={<ProfileEdit
          setReload={setReload}
          headerMountIn={headerMountIn}
          contentMountIn={contentMountIn}
          setHeaderMountIn={setHeaderMountIn}
          setContentMountIn={setContentMountIn}
          WAButton={WAButton}
          profilePicture="/Perfil.png"
          localUser={localUser}
          usuario={usuario}
          todasLasCategorias={todasLasCategorias}
        />} />

        <Route path='/test' element={<DropDownCategorias
          todasLasCategorias={todasLasCategorias}
        />} />

        <Route path='/profileCard' element={<ProfileCard />} />

        <Route path='/chat' element={<Chat />} />

      </Routes>
    </>
  );
}

export default App;
