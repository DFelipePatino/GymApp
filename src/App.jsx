import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import HomePage from './components/HomePage/Home/HomePage';
import Perfil from './components/Perfil/Perfil';
import Test from './components/test/test';
import Cards from './components/cards/cards';

function App() {


  return (
    <>

      {/* {location.pathname !== "/" && location.pathname !== "/form" && <Nav setApiDbFilter={setApiDbFilter} apiDbFilter={apiDbFilter} setWeigthOrderType={setWeigthOrderType} weigthOrderType={weigthOrderType} setOrderType={setOrderType} orderType={orderType} selectedTemp={selectedTemp} setSelectedTemp={setSelectedTemp} resetSelection={resetSelection} alltemperaments={alltemperaments} filterDogsByTemp={filterDogsByTemp}
        onSearch={onSearch} onHomeClick={onHomeClick} />} */}

      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile' element={<Perfil />} />
        <Route path='/test' element={<Test />} />
        <Route path='/cards' element={<Cards />} />
      </Routes>
    </>
  );
}

export default App;