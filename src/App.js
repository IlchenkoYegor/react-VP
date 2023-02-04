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
import SecureRoute from './securityUtils/secureRoute';
import ForUnAuthorized from './securityUtils/forUnAuthorized';
import MainLoadingModal from './components/MainLoadingModal';

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
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <div>   
      <MainLoadingModal></MainLoadingModal>
        <MainNavbar></MainNavbar>
        <Routes>
          <Route path='/' element ={<Main/>}/>
          <Route path='/register' element={<ForUnAuthorized><Register/></ForUnAuthorized>}>
          </Route>
          <Route path='/login' element={<ForUnAuthorized><Login/></ForUnAuthorized>}>
          </Route>
          
            <Route path='/map' element={<SecureRoute requeredRole="ADMIN"><Map/></SecureRoute>}>
            </Route>
          <Route path='/main' element={<Main/>}>
          </Route>
          
            <Route path='/city' element={<SecureRoute requeredRole="VOLUNTEER"><CityChoose/></SecureRoute>}>
          </Route>
        </Routes>
        </div>
      </Provider>
  );
}

export default App;
