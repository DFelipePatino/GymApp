import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/actions';
import LogIn from './components/LogIn/LogIn';
import HomePage from './components/HomePage/Home/HomePage';
import Perfil from './components/Perfil/Perfil';
import Test from './components/test/test';
import Cards from './components/cards/cards';
import ProfileCard from './components/Perfil/profileCard';
import HeaderNav from './components/HeaderNav/HeaderNav';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();

  const localUser = localStorage.getItem("localUserName")
  console.log(localUser, "lu en app");




  return (
    <>

      {location.pathname !== "/"  && <HeaderNav localUser={localUser}/>}

      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/home' element={<HomePage localUser={localUser}/>} />
        <Route path='/profile' element={<Perfil localUser={localUser}/>} />
        <Route path='/test' element={<Test />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/profileCard' element={<ProfileCard />} />
      </Routes>
    </>
  );
}

export default App;