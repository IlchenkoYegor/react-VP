import axios from "axios";
import { handleError } from "./errorActions";
import { mainLoading } from "./loadingActions";

export const addCityInfo = (navigate, city) => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    await axios.post("/admin/addCity", city);
    navigate("/main");
  } catch (e) {
    dispatch(handleError(e));
  }
  dispatch(mainLoading(false));
};
