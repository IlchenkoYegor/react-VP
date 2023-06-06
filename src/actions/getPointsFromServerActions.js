import axios from "axios";
import { handleError } from "./errorActions";
import { mainLoading } from "./loadingActions";
import { GET_CITIES, GET_POINTS, RESET_ALL_POINTS_INFO } from "./types";

export const getAllPointsByCity = (city, currentCount) => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    let count = await axios.get("/admin/getVotesCount", {
      params: { city: city },
    });
    if (count.data !== currentCount) {
      let res = await axios.get("/admin/getVotes", {
        params: { city: city },
      });
      const newRes = res.data.map((e) => ({
        type: "Feature",
        properties: { cluster: false },
        geometry: {
          type: "Point",
          coordinates: [parseFloat(e.longitude), parseFloat(e.latitude)],
        },
      }));
      dispatch({
        type: GET_POINTS,
        payload: newRes,
      });
      dispatch({
        type: RESET_ALL_POINTS_INFO,
        payload: newRes.length,
      });
    }
  } catch (err) {
    dispatch(handleError(err));
  }
  dispatch(mainLoading(false));
};

export const getAllCities = () => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    const res = await axios.get("/volunteers/getCities");
    dispatch({
      type: GET_CITIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch(handleError(err));
  }
  dispatch(mainLoading(false));
};
