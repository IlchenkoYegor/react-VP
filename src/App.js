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
import { Provider } from 'react-redux';
import store from './store';
import jwtDecode from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';
import { logout } from './actions/securityActions';
import { SET_CURRENT_USER } from './actions/types';

const jwtToken = localStorage.jwtToken

if(jwtToken){
  setJWTToken(jwtToken);
  const decoded_jwt = jwtDecode(jwtToken)
  store.dispatch({
    type:SET_CURRENT_USER,
    payload: decoded_jwt
  })
  const currentTime = Date.now()/1000
  if(decoded_jwt.exp<currentTime){
    store.dispatch(logout())
  }
}

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
    <Provider store={store}>
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
      </Provider>
  );
}

export default App;
