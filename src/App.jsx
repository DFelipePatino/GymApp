import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogIn from './components/LogIn/LogIn.jsx';
import HomePage from './components/HomePage/Home/HomePage';
import Profile from './components/Perfil/Profile.jsx';
import Profile2 from './components/Perfil/Profile2.jsx';
import ProfileEdit from './components/Perfil/ProfileEdit.jsx';
import Registro from './components/LogIn/Registro/Registro.jsx';
import Test from './components/test/test';
import ProfileCard from './components/Perfil/profileCard';
import Chat from './components/Chat/Chat.jsx';
import Layout from './components/Layout/Layout.jsx';
import SimpleGrow from './components/test/test.jsx';
import BackToTopButton from './components/backToTopButton/BackToTopButton.jsx';
import ContentPlayer from './components/HomePage/Home/ContentPlayer/ContentPlayer.jsx';
import { getMethods } from './redux/actions.js';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [headerLoad, setHeaderLoad] = useState(false)
  const [bannerLoad, setBannerload] = useState(false)
  const [filterLoad, setFilterLoad] = useState(false)

  const [headerMountIn, setHeaderMountIn] = useState(false)
  const [contentMountIn, setContentMountIn] = useState(false)
  const [navigateAway, setNavigateAway] = useState(true)

  const [playerLoad, setPlayerLoad] = useState(false)

  const localUser = localStorage.getItem("localUserName");

  const userForTesting = { // eventually this will be replaced by the user's data
    name: "John Doe",
    dob: "1990-01-01",
    age: "31",
    email: "email@gmail.com",
    profilePicture: "/Perfil.png",
    goals: "Run a marathon",
    healthStatus: "Healthy",
    height: "180cm",
    weight: "75kg",
    gender: "Male",
    bloodType: "O+",
    hairColor: "Brown",
    eyeColor: "Blue",
    skinColor: "Fair",
    bodyType: "Athletic",
    shoeSize: "10",
    clothingSize: "Medium",
    dietPlan: "/plandedieta.pdf",
    premium: true,
    entrenamiento: [' GIMNASIO EN CASA ', ' GIMNASIO ', ' HOGAR '],
    objetivo: [' SALUD ', ' ACONDICIONAMIENTO FISICO ', ' ACONDICIONAMIENTO FISICO ', ' DISMINUCION PORCENTAJE DE GRASA '],

  };

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getMethods())
  });

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


          localUser={localUser} />}

      <Routes>

        <Route path='/test' element={<SimpleGrow />} />

        <Route path='/' element={<LogIn />} />

        <Route path='/registro' element={<Registro
          BackToTopButton={BackToTopButton} />} />

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

        <Route path='/player' element={<ContentPlayer
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
          userForTesting={userForTesting} />} />

        <Route path='/profileedit' element={<ProfileEdit
          headerMountIn={headerMountIn}
          contentMountIn={contentMountIn}
          setHeaderMountIn={setHeaderMountIn}
          setContentMountIn={setContentMountIn}
          BackToTopButton={BackToTopButton}
          profilePicture="/Perfil.png"
          localUser={localUser} />} />

        <Route path='/test' element={<Test />} />

        <Route path='/profileCard' element={<ProfileCard />} />

        <Route path='/chat' element={<Chat />} />

      </Routes>
    </>
  );
}

export default App;
