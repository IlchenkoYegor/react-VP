import axios from "axios";
import { connect } from "react-redux";
import { GET_ERRORS, GET_POINTS, SET_SUITABLE_POINTS, SUCCESS_MESSAGE } from "./types";

export const getAllPointsByCity = (city, date) => async dispatch =>{
    try {
        const res = await axios.get("http://localhost:8080/getVotes",{params:{city:city, localDate: date}} );
        dispatch({
            type: GET_POINTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload:err
        })
    }
}

export const createPoll = (poll, history) => async dispatch =>{
    try {
        const res = await axios.post("http://localhost:8080/sendMessage");
        dispatch({
            type:SUCCESS_MESSAGE,
            payload: res.data
          })
    } catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    }
}

export const pushTheResult = (coordinatesList,username, city, amountOfPoints, history) => async dispatch => {
    try{
        const res = await axios.post("http://localhost:8080/sendLocation", {adminUsername:username,
         coordinatesList:coordinatesList,
          city:city, 
          amountOfPoints:amountOfPoints  });
          dispatch({
            type:SUCCESS_MESSAGE,
            payload: res.data
          })
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    }
}

export const setLocation = (locationCoordinates)=> {
    try{
        return {
            type: SET_SUITABLE_POINTS,
            payload: locationCoordinates
        }
    }catch{

    }
}
