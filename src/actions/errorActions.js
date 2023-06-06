import { GET_ERRORS, SET_NO_ERRORS } from "./types";

export const handleError =
  (error, msg = null) =>
  async (dispatch) => {
    if (error && error.response.data) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    } else {
      if (msg) {
        dispatch({
          type: GET_ERRORS,
          payload: { data: msg },
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { data: "error occured" },
        });
      }
    }
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("foo");
      }, 5000);
    }).then(() => {
      dispatch({
        type: SET_NO_ERRORS,
      });
    });
  };
