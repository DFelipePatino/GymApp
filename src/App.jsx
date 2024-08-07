import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogIn from './components/LogIn/LogIn.jsx';
import HomePage from './components/HomePage/Home/HomePage';
import Profile from './components/Perfil/Profile.jsx';
import Profile2 from './components/Perfil/Profile2.jsx';
import ProfileEdit from './components/Perfil/ProfileEdit.jsx';
import Registro from './components/LogIn/Registro/Registro.jsx';
import ProfileCard from './components/Perfil/profileCard';
import Chat from './components/Chat/Chat.jsx';
import Layout from './components/Layout/Layout.jsx';
import DropDownCategorias from './components/Perfil/DropDownCategorias.jsx';
import BackToTopButton from './components/backToTopButton/BackToTopButton.jsx';
import ContentPlayer from './components/HomePage/Home/ContentPlayer/ContentPlayer.jsx';
import { getMethods, getBanner, getCategories, getEntrenamientoActual, getGoogle } from './redux/actions.js';
import Testtt from './components/test/Testtt.jsx';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  const [headerLoad, setHeaderLoad] = useState(false)
  const [bannerLoad, setBannerload] = useState(false)
  const [filterLoad, setFilterLoad] = useState(false)

  const [headerMountIn, setHeaderMountIn] = useState(false)
  const [contentMountIn, setContentMountIn] = useState(false)
  const [navigateAway, setNavigateAway] = useState(false)

  const [playerLoad, setPlayerLoad] = useState(false)

  const localUser = localStorage.getItem("localUser");
  // console.log(localUser, "localUser in App.js");

  let usuario = JSON.parse(localStorage.getItem("localUser"));
 


  // const profilefoto = usuario?.foto;
  // console.log(profilefoto, "profilefoto in App.js");

  // console.log(id_token, "id_token in App.js");

  const userForTesting = { // eventually this will be replaced by the user's data
    Name: localUser,
    DOB: "1990-01-01",
    Age: "31",
    Email: "email@gmail.com",
    Gender: "Male",
    Categorias: ['GANA MASA MUSCULAR ', 'MEJORAR ESTADO DE SALUD   ', 'REDUCIR PORCENTAJES DE GRASA ', 'MEJORAR RENDIMIENTO DEPORTIVO  ', 'TENER SU CUERPO TONIFICADO ', 'MEJORAR  ESTADO FISICO  '],
    Premium: true,
    Entrenamiento: [' GIMNASIO EN CASA ', ' GIMNASIO ', ' HOGAR '],
    Objetivo: [' SALUD ', ' ACONDICIONAMIENTO FISICO ', ' DISMINUCION PORCENTAJE DE GRASA '],
    ProfilePicture: "/Perfil.png",
    NivelDeExperiencia: "Intermedio",
    FrecuenciaDeEntrenamiento: "2 veces por semana",
    Nutricion: "Come bien",
    Patologias: "Fracturas",
    Peso: "70KG",
    Talla: "Medium",
    DietPlan: "/plandedieta.pdf",
  };

  const todasLasCategorias = useSelector(state => state.allCategories)


  // const updateLocalUser = async () => {
  //   console.log('updating local user2');

  //   await getGoogle();
  //   localStorage.setItem('localUser', googleResponse);
  // }


  useEffect(async () => {
    // dispatch(getMethods());
    // dispatch(getBanner());
    // dispatch(getCategories());
    const token = await localStorage.getItem("id_token");
    if(token){
      try{
        let pUsuario = await getGoogle();
        console.log(pUsuario, "pUsuario in App.js");
        await localStorage.setItem('localUser', JSON.stringify(pUsuario));
      }catch(err){
        navigate('/');
        return;
      }
      
      usuario = JSON.parse(localStorage.getItem("localUser"));
      console.log(usuario, "usuario in App.js");
      dispatch(getEntrenamientoActual());
    }else{
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
  const scrollToFilter2 = () => {
    if (filterRef2.current) {
      filterRef2.current.scrollToComponent();
      // console.log('scrolling f2?');
    }
  };
  const scrollToFilter3 = () => {
    if (filterRef3.current) {
      filterRef3.current.scrollToComponent();
      // console.log('scrolling f3?');
    }
  };
  const scrollToFilter4 = () => {
    if (filterRef4.current) {
      filterRef4.current.scrollToComponent();
      // console.log('scrolling f4?');
    }
  };
  const scrollToFilter5 = () => {
    if (filterRef5.current) {
      filterRef5.current.scrollToComponent();
      // console.log('scrolling f5?');
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
          scrollToFilter2={scrollToFilter2}
          scrollToFilter3={scrollToFilter3}
          scrollToFilter4={scrollToFilter4}
          scrollToFilter5={scrollToFilter5}

          usuario={usuario} />}

      <Routes>

        <Route path='/' element={<LogIn />} />

        {/* <Route path='/testeo' element={<Testtt profilefoto={profilefoto} />} /> */}

        <Route path='/registro' element={<Registro
          BackToTopButton={BackToTopButton}
          usuario={usuario}
          todasLasCategorias={todasLasCategorias}
        />} />

        <Route path='/home' element={<HomePage
          headerLoad={headerLoad}
          bannerLoad={bannerLoad}
          filterLoad={filterLoad}
          setHeaderLoad={setHeaderLoad}
          setBannerload={setBannerload}
          setFilterLoad={setFilterLoad}
          BackToTopButton={BackToTopButton}
          localUser={localUser}
          scrollToFilter1={scrollToFilter1}
          scrollToFilter2={scrollToFilter2}
          scrollToFilter3={scrollToFilter3}
          scrollToFilter4={scrollToFilter4}
          scrollToFilter5={scrollToFilter5}
          filterRef1={filterRef1}
          filterRef2={filterRef2}
          filterRef3={filterRef3}
          filterRef4={filterRef4}
          filterRef5={filterRef5}
        />} />

        <Route path='/player/:entrenamientoId' element={<ContentPlayer
          setPlayerLoad={setPlayerLoad}
          playerLoad={playerLoad} />} />

        <Route path='/profile' element={<Profile
          localUser={localUser} />} />

        <Route path='/profile2' element={<Profile2
          headerMountIn={headerMountIn}
          contentMountIn={contentMountIn}
          setHeaderMountIn={setHeaderMountIn}
          setContentMountIn={setContentMountIn}
          navigateAway={navigateAway}
          setNavigateAway={setNavigateAway}
          BackToTopButton={BackToTopButton}
          name={localUser}
          userForTesting={userForTesting}
          usuario={usuario}
          todasLasCategorias={todasLasCategorias} />} />

        <Route path='/profileedit' element={<ProfileEdit
          headerMountIn={headerMountIn}
          contentMountIn={contentMountIn}
          setHeaderMountIn={setHeaderMountIn}
          setContentMountIn={setContentMountIn}
          BackToTopButton={BackToTopButton}
          profilePicture="/Perfil.png"
          localUser={localUser}
          userForTesting={userForTesting}
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
