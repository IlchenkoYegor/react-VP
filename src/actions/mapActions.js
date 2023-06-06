import axios from "axios";
import dayjs from "dayjs";
import { handleError } from "./errorActions";
import { longLoading } from "./loadingActions";
import {
  DELETE_SUITABLE_POINT,
  GET_BEST_SUITABLE_POINTS,
  GET_ERRORS,
  SET_CITY,
  SET_MAX_AMOUNT_OF_POINTS,
  SET_SUITABLE_POINTS,
  SET_TIME_OF_DELIVERING,
  SUCCESS_MESSAGE,
  TAKE_DELAY,
} from "./types";

// eslint-disable-next-line no-undef
const DELAYINMS = process.env.REACT_APP_API_KEY;

const POLL_MESSAGE_TEXT =
  "CREATING THE POLL... PLEASE WAIT! YOU WILL KNOW WHEN IT ENDS!";
const BEST_POINTS_TEXT =
  "FINDING THE BEST POINTS... PLEASE WAIT! YOU WILL SEE THEM AS SOON AS IT ENDS!";
const SEND_MESSAGE_TEXT =
  "SENDING THE LOCATION YOU HAVE PICKED... PLEASE WAIT! AFTER THIS WINDOW CLOSES ALL OF THEM WILL BE INFORMED!";

export const createPoll = (cityName) => async (dispatch) => {
  dispatch(longLoading(true, POLL_MESSAGE_TEXT));
  try {
    const res = await axios.get("/admin/sendMessage", {
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
    dispatch(handleError(err));
  }
  dispatch(longLoading(false));
};

export const pushTheResult =
  (coordinatesList, username, city, amountOfPoints, timeOfDelivering) =>
  async (dispatch) => {
    dispatch(longLoading(true, SEND_MESSAGE_TEXT));
    try {
      const newList = coordinatesList.map((e) => {
        return { longitude: e.lng, latitude: e.lat };
      });
      const res = await axios.post("/admin/sendLocation", {
        adminUsername: username,
        coordinatesList: newList,
        cityName: city,
        amountOfPoints: amountOfPoints,
        timeOfDelivering: timeOfDelivering,
      });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: res.data,
      });
    } catch (err) {
      dispatch(handleError(err));
    }
    dispatch(longLoading(false));
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

export const setTimeOfAidDelivering = (time) => {
  dayjs(time).isAfter(Date.now());
  return {
    type: SET_TIME_OF_DELIVERING,
    payload: time,
  };
};

export const setMaxLocationsAmount =
  (amountOfLocations) => async (dispatch) => {
    try {
      dispatch({
        type: SET_MAX_AMOUNT_OF_POINTS,
        payload: amountOfLocations,
      });
    } catch (err) {
      dispatch(handleError(err));
    }
  };
export const getBestFittingPoints =
  (amountOfPoints, cityName) => async (dispatch) => {
    dispatch(longLoading(true, BEST_POINTS_TEXT));
    try {
      const res = await axios.get("/admin/getBestPoints", {
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
      dispatch(handleError(err));
    }
    dispatch(longLoading(false));
  };

export const getCityData = (username, city) => {
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
  axios.patch("/admin/resetCity", citydata);
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
  if (!city) {
    return {
      type: GET_ERRORS,
      payload: {},
    };
  }

  axios.get("/admin/getCity?city=" + city).then((res) => {
    city = res.data;
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
      dispatch(handleError(err));
    }
  });
};
