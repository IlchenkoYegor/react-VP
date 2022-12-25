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



function App() {


  let authState1 ={authorized: false, role:'guest'}
  let changeState  = (roleg) =>{
    if(roleg==null){
    
      console.log('here was a ' + roleg )
      authState1 ={authorized: false, role:'guest'}
    }
    else{
      console.log('here was a ' + roleg )
      authState1 = {authorized: true, role:roleg}
    }
  }
  let authState ={auth : authState1,
  stateHook: changeState}
  
  return (
    <div>
    <Button onClick={authState.stateHook.apply('admin')}>
      test button 
    </Button>
    <AuthContext.Provider value = {authState} >
      
      <MainNavbar></MainNavbar>
      <Routes>
        <Route path='/' element ={<Main/>}/>
        <Route path='/register' element={<Register/>}>
        </Route>
        <Route path='/login' element={<Login/>}>
        </Route>
        <Route path='/map' element={<Map/>}>
        </Route>
      </Routes>
      </AuthContext.Provider>
      </div>
  );
}

export default App;
