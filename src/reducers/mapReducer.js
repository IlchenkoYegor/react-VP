import {
  DELETE_SUITABLE_POINT,
  GET_BEST_SUITABLE_POINTS,
  RESET_ALL_POINTS_INFO,
  SET_MAX_AMOUNT_OF_POINTS,
  SET_SUITABLE_POINTS,
  SET_TIME_OF_DELIVERING,
} from "../actions/types";

const initialState = {
  selectedPoints: [],
  amountOfPoints: 0,
  amountOfSelectedLocations: 0,
  timeOfDelivering: "",
  maxAvailablePoints: 0,
};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ALL_POINTS_INFO:
      return {
        ...state,
        selectedPoints: [],
        amountOfPoints: action.payload,
        timeOfDelivering: "",
        amountOfSelectedLocations: 0,
      };
    case SET_SUITABLE_POINTS:
      return {
        ...state,
        selectedPoints: state.selectedPoints.concat(action.payload),
        amountOfSelectedLocations: state.amountOfSelectedLocations + 1,
      };
    case SET_MAX_AMOUNT_OF_POINTS:
      return {
        ...state,
        amountOfSelectedLocations:
          state.amountOfSelectedLocations > action.payload
            ? action.payload
            : state.amountOfSelectedLocations,
        selectedPoints: state.selectedPoints.slice(0, action.payload),
        maxAvailablePoints: action.payload,
      };
    case SET_TIME_OF_DELIVERING:
      return {
        ...state,
        timeOfDelivering: action.payload,
      };
    case GET_BEST_SUITABLE_POINTS:
      return {
        ...state,
        selectedPoints: action.payload,
        amountOfSelectedLocations: action.payload.length,
      };
    case DELETE_SUITABLE_POINT:
      return {
        ...state,
        selectedPoints: state.selectedPoints.filter(
          (e) => e.lat !== action.payload.lat && e.lng !== action.payload.lng
        ),
        amountOfSelectedLocations: state.amountOfSelectedLocations - 1,
      };
    default:
      return state;
  }
};
