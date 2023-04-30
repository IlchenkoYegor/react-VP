import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import errorReducer from "./errorReducer";
import getDataFromServerReducer from "./getDataFromServerReducer";
import { loadingReducer } from "./loadingReducer";
import { mapReducer } from "./mapReducer";
import { usersListReducer } from "./usersListReducer";
export default combineReducers({
  errors: errorReducer,
  mapPoints: mapReducer,
  security: authReducer,
  getPoints: getDataFromServerReducer,
  loading: loadingReducer,
  userList: usersListReducer,
});
