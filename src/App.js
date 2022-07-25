import React from 'react';
import Home from './Component/Home';
import AddUser from './Component/AddUser';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/add-user' element={<AddUser />}></Route>
      </Routes>

    </>
  )
}

export default App