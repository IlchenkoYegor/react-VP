import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { logout } from "./actions/securityActions";
import { SET_CURRENT_USER } from "./actions/types";
import MainLoadingModal from "./components/MainLoadingModal";
import MainNavbar from "./components/MainNavbar";
import CityChoose from "./pages/CityChoose";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Map from "./pages/Map";
import Register from "./pages/Register";
import ForUnAuthorized from "./securityUtils/forUnAuthorized";
import SecureRoute from "./securityUtils/secureRoute";
import setJWTToken from "./securityUtils/setJWTToken";
import store from "./store";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwt = jwtDecode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwt,
  });
  const currentTime = Date.now() / 1000;
  if (decoded_jwt.exp < currentTime) {
    store.dispatch(logout());
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
          <Route path="/" element={<Main />} />
          <Route
            path="/register"
            element={
              <ForUnAuthorized>
                <Register />
              </ForUnAuthorized>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <ForUnAuthorized>
                <Login />
              </ForUnAuthorized>
            }
          ></Route>

          <Route
            path="/map"
            element={
              <SecureRoute requeredRole="ADMIN">
                <Map />
              </SecureRoute>
            }
          ></Route>
          <Route path="/main" element={<Main />}></Route>

          <Route
            path="/city"
            element={
              <SecureRoute requeredRole="VOLUNTEER">
                <CityChoose />
              </SecureRoute>
            }
          ></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
