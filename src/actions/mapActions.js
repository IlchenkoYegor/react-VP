import axios from "axios";
import { connect } from "react-redux";
import { GET_ERRORS, SET_CITY, GET_POINTS, TAKE_DELAY, SET_MAX_AMOUNT_OF_POINTS, SET_SUITABLE_POINTS, SUCCESS_MESSAGE, DELETE_SUITABLE_POINT } from "./types";

const DELAYINMS = process.env.REACT_APP_API_KEY;

export const createPoll = (cityName, history) => async dispatch =>{
    try {
        const res = await axios.post("http://localhost:8080/admin/sendMessage", {city:cityName});
        dispatch({
            type:SUCCESS_MESSAGE,
            payload: res.data
          })
        dispatch({
            type: TAKE_DELAY,
            payload: DELAYINMS 
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

export const deleteLocation = (locationCoordinates) => {
    try{
        return {
            type: DELETE_SUITABLE_POINT,
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
export const getBestFittingPoints = (amountOfPoints, cityName) => async dispatch =>{
    try {
        const res = await axios.get("http://localhost:8080/admin/getVotes",{params:{amountOfPoints:amountOfPoints, cityName:cityName}} );
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
    console.log(city);
    if(!city.name){
        return {
            type: GET_ERRORS,
            payload: {}
        }
    }
    console.log(city.name);
    console.log(city)
    const normilizedSelectedCity = {
        name: city.name,
        area:city.area,
        center: {
            lat: city.center.latitude,
            lng: city.center.longitude
        }
    }
    try{
        return {
            type: SET_CITY,
            payload: normilizedSelectedCity
        }
    }catch(err){
        return {
            type: GET_ERRORS,
            payload: err
        }
    }
}