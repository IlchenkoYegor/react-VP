import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import {mapReducer} from "./mapReducer"
import {authReducer} from "./authReducer";
export default combineReducers({
    errors: errorReducer,
    mapPoints: mapReducer,
    security: authReducer
})