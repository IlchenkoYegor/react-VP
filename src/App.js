import logo from './logo.svg';
import './App.css';
import Main from './pages/Main';
import GMap from './components/map/GMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './context/AuthContext';
import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import MainNavbar from './components/MainNavbar';
import { Button } from 'react-bootstrap';
import Map from './pages/Map';
import CityChoose from './pages/CityChoose';



function App() {
  const [authState, setAuthState]= React.useState({authorized: false, role:'guest'});
  let changeState  = () =>{
    if(authState == null || authState.authorized){
    
      console.log('here was a ' + authState )
      setAuthState({authorized: false, role:'guest'})
    }
    else{
      console.log('here was a ' + authState )
      setAuthState({authorized: true, role:'user'})
    }
  }
  
  return (
    <div>
    <Button onClick={changeState}>
      test button 
    </Button>    
      <MainNavbar isAuthorized={authState.authorized}></MainNavbar>
      <Routes>
        <Route path='/' element ={<Main/>}/>
        <Route path='/register' element={<Register/>}>
        </Route>
        <Route path='/login' element={<Login/>}>
        </Route>
        <Route path='/map' element={<Map/>}>
        </Route>
        <Route path='/main' element={<Main/>}>
        </Route>
        <Route path='/city' element={<CityChoose/>}>

        </Route>
      </Routes>
      </div>
  );
}

export default App;
