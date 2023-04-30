import { SET_USERS_ON_PAGE } from "../actions/types";

const initialState = [];

export const usersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_ON_PAGE:
      return action.payload;
    default:
      return state;
  }
};
