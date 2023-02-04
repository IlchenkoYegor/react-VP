import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import {mapReducer} from "./mapReducer"
import {authReducer} from "./authReducer";
import getDataFromServerReducer from "./getDataFromServerReducer";
import { loadingReducer } from "./loadingReducer";
export default combineReducers({
    errors: errorReducer,
    mapPoints: mapReducer,
    security: authReducer,
    getPoints: getDataFromServerReducer,
    loading: loadingReducer
})