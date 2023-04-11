import { library } from "@fortawesome/fontawesome-svg-core";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { initCityData } from "./actions/mapActions";
import { logout } from "./actions/securityActions";
import { SET_CURRENT_USER } from "./actions/types";
import MainFooter from "./components/constant-page-components/MainFooter";
import MainNavbar from "./components/constant-page-components/MainNavbar";
import MainLoadingModal from "./components/modal/MainLoadingModal";
import "./heights.module.css";
import AdditionalInfo from "./pages/AdditionalInfo";
import CityChoose from "./pages/CityChoose";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Map from "./pages/Map";
import Register from "./pages/Register";
import ForUnAuthorized from "./securityUtils/forUnAuthorized";
import SecureRoute from "./securityUtils/secureRoute";
import setJWTToken from "./securityUtils/setJWTToken";
import store from "./store";

library.add(faTelegram);

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwt = jwtDecode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwt,
  });
  const city = localStorage.city ? localStorage.city : false;
  if (city) {
    store.dispatch(initCityData(city));
  }
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
          <Route
            path="/"
            element={
              <>
                <Main />
                <MainFooter />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <ForUnAuthorized>
                <Register />
              </ForUnAuthorized>
            }
          ></Route>
          <Route
            path="/main-info"
            element={
              <SecureRoute requeredRole="USER">
                <AdditionalInfo></AdditionalInfo>
                <MainFooter />
              </SecureRoute>
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
                <MainFooter />
              </SecureRoute>
            }
          ></Route>
          <Route
            path="/main"
            element={
              <>
                <Main />
                <MainFooter />
              </>
            }
          ></Route>

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
