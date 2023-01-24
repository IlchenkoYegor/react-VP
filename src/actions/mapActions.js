import axios from "axios";
import { connect } from "react-redux";
import { GET_ERRORS, GET_CITY, GET_POINTS, SET_MAX_AMOUNT_OF_POINTS, SET_SUITABLE_POINTS, SUCCESS_MESSAGE } from "./types";



export const createPoll = (poll, history) => async dispatch =>{
    try {
        const res = await axios.post("http://localhost:8080/admin/sendMessage");
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
        const res = await axios.post("http://localhost:8080/admin/sendLocation", {adminUsername:username,
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
    }catch(err){
        return {
            type: GET_ERRORS,
            payload: err
        }
    }
}

export const setMaxLocationsAmount = (amountOfLocations) => {
    try {
        return {
            type:SET_MAX_AMOUNT_OF_POINTS,
            payload: amountOfLocations
        }
    }catch(err){
        return {
            type: GET_ERRORS,
            payload: err
        }       
    }
}
export const getBestFittingPoints = (city) => async dispatch =>{
    try {
        const res = await axios.get("http://localhost:8080/admin/getVotes",{params:{city:city}} );
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


export const getCityData = (city) =>{
    try{
        return {
            type: GET_CITY,
            payload: city
        }
    }catch(err){
        return {
            type: GET_ERRORS,
            payload: err
        }
    }
}