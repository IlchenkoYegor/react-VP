import axios from "axios";
import { mainLoading } from "./loadingActions";
import {
  DELETE_SUITABLE_POINT,
  GET_BEST_SUITABLE_POINTS,
  GET_ERRORS,
  SET_CITY,
  SET_MAX_AMOUNT_OF_POINTS,
  SET_NO_ERRORS,
  SET_SUITABLE_POINTS,
  SUCCESS_MESSAGE,
  TAKE_DELAY,
} from "./types";

// eslint-disable-next-line no-undef
const DELAYINMS = process.env.REACT_APP_API_KEY;

export const createPoll = (cityName) => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    const res = await axios.get("http://localhost:8080/admin/sendMessage", {
      params: { city: cityName },
    });
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: res.data,
    });
    dispatch({
      type: TAKE_DELAY,
      payload: DELAYINMS,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });

    new Promise((resolve) => {
      setTimeout(() => resolve(), 5000);
    }).then(() => {
      dispatch({
        type: SET_NO_ERRORS,
      });
    });
  }
  dispatch(mainLoading(false));
};

export const pushTheResult =
  (coordinatesList, username, city, amountOfPoints) => async (dispatch) => {
    console.log(coordinatesList);
    dispatch(mainLoading(true));
    try {
      const newList = coordinatesList.map((e) => {
        return { longitude: e.lng(), latitude: e.lat() };
      });
      const res = await axios.post("http://localhost:8080/admin/sendLocation", {
        adminUsername: username,
        coordinatesList: newList,
        cityName: city,
        amountOfPoints: amountOfPoints,
      });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });

      new Promise((resolve) => {
        setTimeout(() => resolve(), 5000);
      }).then(() => {
        dispatch({
          type: SET_NO_ERRORS,
        });
      });
    }
    dispatch(mainLoading(false));
  };

export const setLocation = (locationCoordinates) => {
  try {
    return {
      type: SET_SUITABLE_POINTS,
      payload: locationCoordinates,
    };
  } catch (err) {
    return {
      type: GET_ERRORS,
      payload: err,
    };
  }
};

export const deleteLocation = (locationCoordinates) => {
  try {
    return {
      type: DELETE_SUITABLE_POINT,
      payload: locationCoordinates,
    };
  } catch (err) {
    return {
      type: GET_ERRORS,
      payload: err,
    };
  }
};

export const setMaxLocationsAmount =
  (amountOfLocations) => async (dispatch) => {
    try {
      dispatch({
        type: SET_MAX_AMOUNT_OF_POINTS,
        payload: amountOfLocations,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
      new Promise((resolve) => {
        setTimeout(() => resolve(), 5000);
      }).then(() => {
        dispatch({
          type: SET_NO_ERRORS,
        });
      });
    }
  };
export const getBestFittingPoints =
  (amountOfPoints, cityName) => async (dispatch) => {
    dispatch(mainLoading(true));
    try {
      const res = await axios.get("http://localhost:8080/admin/getBestPoints", {
        params: { amountOfPoints: amountOfPoints, cityName: cityName },
      });
      const newRes = res.data.map((e) => {
        return { lng: e.longitude, lat: e.latitude };
      });
      dispatch({
        type: GET_BEST_SUITABLE_POINTS,
        payload: newRes,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      new Promise((resolve) => {
        setTimeout(() => resolve(), 5000);
      }).then(() => {
        dispatch({
          type: SET_NO_ERRORS,
        });
      });
    }
    dispatch(mainLoading(false));
  };

export const getCityData = (username, city) => {
  console.log(city);
  if (!city || !city.name) {
    return {
      type: GET_ERRORS,
      payload: {},
    };
  }
  localStorage.setItem("city", city.name);
  const citydata = {
    username: username,
    city: city.name,
  };
  console.log(citydata);
  axios.patch("http://localhost:8080/admin/resetCity", citydata);
  console.log(city.name);
  console.log(city);
  const normilizedSelectedCity = {
    name: city.name,
    area: city.area,
    center: {
      lat: city.center.latitude,
      lng: city.center.longitude,
    },
  };
  try {
    return {
      type: SET_CITY,
      payload: normilizedSelectedCity,
    };
  } catch (err) {
    return {
      type: GET_ERRORS,
      payload: err,
    };
  }
};

export const initCityData = (city) => async (dispatch) => {
  console.log(city);
  if (!city) {
    return {
      type: GET_ERRORS,
      payload: {},
    };
  }

  axios.get("http://localhost:8080/admin/getCity?city=" + city).then((res) => {
    city = res.data;
    console.log(city.name);
    console.log(city);
    const normilizedSelectedCity = {
      name: city.name,
      area: city.area,
      center: {
        lat: city.center.latitude,
        lng: city.center.longitude,
      },
    };
    try {
      dispatch({
        type: SET_CITY,
        payload: normilizedSelectedCity,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    }
  });
};
