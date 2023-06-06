import {
  RESET_BUTTON_LOADING,
  RESET_LONG_LOADING_WITH_TEXT,
  RESET_MAIN_LOADING,
  SET_BUTTON_LOADING,
  SET_LONG_LOADING_WITH_TEXT,
  SET_MAIN_LOADING,
} from "../actions/types";

const initialState = {
  mainLoading: false,
  buttonLoading: false,
  textOfLongLoading: "",
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LONG_LOADING_WITH_TEXT:
      return { ...state, textOfLongLoading: action.payload };
    case RESET_LONG_LOADING_WITH_TEXT:
      return { ...state, textOfLongLoading: "" };
    case SET_MAIN_LOADING:
      return { ...state, mainLoading: true };
    case RESET_MAIN_LOADING:
      return { ...state, mainLoading: false };
    case SET_BUTTON_LOADING:
      return { ...state, buttonLoading: true };
    case RESET_BUTTON_LOADING:
      return { ...state, buttonLoading: false };
    default:
      return state;
  }
};
