import axios from "axios";
import { mainLoading } from "./loadingActions";
import {
  GET_CITIES,
  GET_ERRORS,
  GET_POINTS,
  RESET_ALL_POINTS_INFO,
  SET_NO_ERRORS,
} from "./types";

export const getAllPointsByCity = (city) => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    let res = await axios.get("http://localhost:8080/admin/getVotes", {
      params: { city: city },
    });
    const newRes = res.data.map((e) => ({
      type: "Feature",
      properties: { cluster: false },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(e.longitude), parseFloat(e.latitude)],
      },
    }));
    console.log(newRes);
    dispatch({
      type: GET_POINTS,
      payload: newRes,
    });
    dispatch({
      type: RESET_ALL_POINTS_INFO,
      payload: newRes.length,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    new Promise((resolve) => {
      setTimeout(() => resolve(), 5000);
    }).then(
      dispatch({
        type: SET_NO_ERRORS,
      })
    );
  }
  dispatch(mainLoading(false));
};

export const getAllCities = () => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    const res = await axios.get("http://localhost:8080/volunteers/getCities");
    dispatch({
      type: GET_CITIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    new Promise((resolve) => {
      setTimeout(() => resolve(), 5000);
    }).then(
      dispatch({
        type: SET_NO_ERRORS,
      })
    );
  }
  dispatch(mainLoading(false));
};
