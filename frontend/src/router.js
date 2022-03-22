import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingPage from './components/loadingpage/loading'
import Login from './pages/login/login'
import Main from './pages/main/main'
import Profile from './pages/profile/profile'
import RegisterValue from './pages/register-value/register-value'
import Edit from './pages/edit/edit'
import Register from './pages/register/register'
import Home from './pages/home/home'

function Routers() {
  return (
    <Router>
        <Routes>
          <Route path='/cadastrar' element={ <Register /> }/>
          <Route exact path='/login' element={ <Login /> }/>
          <Route path='/perfil' element={ <Profile /> }/>
          <Route path='/main' element={ <Main /> }/>
          <Route exact path='/' element={ <Home /> }/>
          <Route exact path='/registrar-valor' element={ <RegisterValue /> }/>
          <Route path='/editar/:id' element={ <Edit /> }/>
          <Route path='/loading' element={ <LoadingPage /> }/>
        </Routes>
      </Router>
  );
}

export default Routers;