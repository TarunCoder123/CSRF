import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Header from './pages/header/Header'
import Dashboard from './pages/dahboard/Dashboard'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login';  

const App = () => {
  return (
    <>
    <Header></Header>
    <Routes>
    <Route path="/login" element={<Login></Login>}></Route>
    <Route path="/register" element={<Signup></Signup>}></Route>
    <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
    </Routes>
    </>
  );
}

export default App
