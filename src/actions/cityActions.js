import axios from "axios";
import { mainLoading } from "./loadingActions";
import { GET_ERRORS } from "./types";

export const addCityInfo = (navigate, city) => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    await axios.post("/admin/addCity", city);
    navigate("/main");
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
    console.log(e.response);
  }
  dispatch(mainLoading(false));
};
