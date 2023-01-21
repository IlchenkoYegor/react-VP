import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import {mapReducer} from "./mapReducer"

export default combineReducers({
    errors: errorReducer,
    mapPoints: mapReducer
})