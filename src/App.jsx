import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/actions';
import LogIn from './components/LogIn/LogIn.jsx'
import HomePage from './components/HomePage/Home/HomePage';
import Profile from './components/Perfil/Profile.jsx';
import Profile2 from './components/Perfil/Profile2.jsx'
import ProfileEdit from './components/Perfil/ProfileEdit';
import Test from './components/test/test';
import Cards from './components/cards/cards';
import ProfileCard from './components/Perfil/profileCard';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Layout from './components/Layout/Layout'


function App() {

  const dispatch = useDispatch();
  const location = useLocation();

  const localUser = localStorage.getItem("localUserName")
  console.log(localUser, "lu en app");




  return (
    <>

      {location.pathname !== "/" && <Layout localUser={localUser} />}

      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/home' element={<HomePage localUser={localUser} />} />
        <Route path='/profile' element={<Profile localUser={localUser} />} />

        <Route path='/profile2' element={<Profile2
          name="John Doe"
          dob="1990-01-01"
          age="31"
          email="email@gmail.com"
          profilePicture="url_to_profile_picture"
          goals="Run a marathon"
          healthStatus="Healthy" />} />

        <Route path='/profileedit' element={<ProfileEdit localUser={localUser} />} />
        <Route path='/test' element={<Test />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/profileCard' element={<ProfileCard />} />
      </Routes>
    </>
  );
}

export default App;