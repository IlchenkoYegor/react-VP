import { GET_POINTS, GET_CITIES } from "../actions/types";

const initialState = {
  center: {
    lat: -3.744,
    lng: -38.521,
  },
  points: [],
  cities: [],
};

export default function getDataFromServerReducer(state = initialState, action) {
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
}
