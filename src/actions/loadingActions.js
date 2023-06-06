import {
  RESET_LONG_LOADING_WITH_TEXT,
  RESET_MAIN_LOADING,
  SET_LONG_LOADING_WITH_TEXT,
  SET_MAIN_LOADING,
} from "./types";

export const mainLoading = (enabled) => {
  if (enabled) {
    return {
      type: SET_MAIN_LOADING,
    };
  } else {
    return {
      type: RESET_MAIN_LOADING,
    };
  }
};

export const longLoading = (enabled, text) => {
  if (enabled) {
    return {
      type: SET_LONG_LOADING_WITH_TEXT,
      payload: text,
    };
  } else {
    return {
      type: RESET_LONG_LOADING_WITH_TEXT,
    };
  }
};
