import axios from "axios";
import { handleError } from "./errorActions";
import { mainLoading } from "./loadingActions";
import { SET_USERS_ON_PAGE } from "./types";

const GET_ALL_USERS_URL = "/admin/getAllUsers?page=";
const BLOCK_USER_URL = "/admin/blockUser/";
const ADD_ROLE_USER_URL = "/admin/addRoleToUser/";
const DELETE_ROLE_USER_URL = "/admin/deleteRoleOfUser/";

export const upgradeUser = (username) => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    await axios.patch(ADD_ROLE_USER_URL + username, {
      newUserRole: "VOLUNTEER",
    });
  } catch (e) {
    dispatch(handleError(e));
    dispatch(mainLoading(false));
  }

  dispatch(mainLoading(false));
};
export const downgradeUser = (username) => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    await axios.patch(DELETE_ROLE_USER_URL + username, {
      deletedRole: "VOLUNTEER",
    });
  } catch (e) {
    dispatch(handleError(e));
    dispatch(mainLoading(false));
  }

  dispatch(mainLoading(false));
};
export const blockUser = (username, blocking) => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    await axios.patch(BLOCK_USER_URL + username, { isBlocked: blocking });
  } catch (e) {
    dispatch(handleError(e));
    dispatch(mainLoading(false));
  }

  dispatch(mainLoading(false));
};

export const getAllUsers = (page) => async (dispatch) => {
  dispatch(mainLoading(true));
  try {
    const data = await axios.get(GET_ALL_USERS_URL + page);
    dispatch({ type: SET_USERS_ON_PAGE, payload: data.data });
  } catch (e) {
    dispatch(handleError(e));
  }
  dispatch(mainLoading(false));
};
