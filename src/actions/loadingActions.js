import { RESET_MAIN_LOADING, SET_MAIN_LOADING } from "./types";

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
