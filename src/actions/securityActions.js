import axios from "axios";
import jwtDecode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "../actions/types";
import setJWTToken from "../securityUtils/setJWTToken";
import { handleError } from "./errorActions";
import { initCityData } from "./mapActions";

export const createNewUser = (newUser, navigate) => async (dispatch) => {
  try {
    await axios.post("api/user/register", newUser);
    navigate("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch(handleError(err));
  }
};

export const loginByCrid = (crident, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/login", crident);
    navigate("/main-info");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWTToken(token);
    const decoded = jwtDecode(token);
    if (decoded.city) {
      localStorage.setItem("city", decoded.city);
      dispatch(initCityData(decoded.city));
    }
    dispatch({ type: SET_CURRENT_USER, payload: decoded });
  } catch (err) {
    dispatch(handleError(err));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("city");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: null,
  });
};
