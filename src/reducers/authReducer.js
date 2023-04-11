import { SET_CITY, SET_CURRENT_USER } from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
  city: {
    name: "",
    area: 0,
    center: {
      lat: 0.0,
      lng: 0.0,
    },
  },
};

const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload,
      };
    case SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};
