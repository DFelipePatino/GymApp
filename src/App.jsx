import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogIn from './components/LogIn/LogIn.jsx';
import HomePage from './components/HomePage/Home/HomePage';
import Profile from './components/Perfil/Profile.jsx';
import Profile2 from './components/Perfil/Profile2.jsx';
import ProfileEdit from './components/Perfil/ProfileEdit';
import Registro from './components/LogIn/Registro/Registro.jsx';
import Test from './components/test/test';
import Cards from './components/cards/cards';
import ProfileCard from './components/Perfil/profileCard';
import Chat from './components/Chat/Chat.jsx';
import Layout from './components/Layout/Layout';
import SimpleGrow from './components/test/test.jsx';
import BackToTopButton from './components/backToTopButton/BackToTopButton.jsx';
import ContentPlayer from './components/HomePage/Home/ContentPlayer/ContentPlayer.jsx';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [playerLoad, setPlayerLoad] = useState(false)

  const localUser = localStorage.getItem("localUserName");
  const userForTesting = {
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
    dietPlan: "/plandedieta.pdf"
  };

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/registro" && <Layout localUser={localUser} setPlayerLoad={setPlayerLoad} playerLoad={playerLoad} />}
      <Routes>
        <Route path='/test' element={<SimpleGrow />} />
        <Route path='/' element={<LogIn />} />
        <Route path='/registro' element={<Registro BackToTopButton={BackToTopButton} />} />
        <Route path='/home' element={<HomePage BackToTopButton={BackToTopButton} localUser={localUser} />} />
        <Route path='/player' element={<ContentPlayer setPlayerLoad={setPlayerLoad} playerLoad={playerLoad} />} />
        <Route path='/profile' element={<Profile localUser={localUser} />} />
        <Route path='/profile2' element={<Profile2 BackToTopButton={BackToTopButton} name={localUser} userForTesting={userForTesting} />} />
        <Route path='/profileedit' element={<ProfileEdit BackToTopButton={BackToTopButton} profilePicture="/Perfil.png" localUser={localUser} />} />
        <Route path='/test' element={<Test />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/profileCard' element={<ProfileCard />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
