import { GET_CITIES, GET_POINTS } from "../actions/types";

const initialState = {
  center: {
    lat: -3.744,
    lng: -38.521,
  },
  points: [],
  cities: [],
};

export const getDataFromServerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POINTS:
      return {
        ...state,
        points: action.payload,
        amountOfPoints: action.payload.length,
      };
    case GET_CITIES:
      return { ...state, cities: action.payload };
    default:
      return state;
  }
};
