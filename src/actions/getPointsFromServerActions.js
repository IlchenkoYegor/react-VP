import axios from "axios";
import {GET_CITIES, GET_ERRORS, GET_POINTS, SET_NO_ERRORS } from "./types";

export const getAllPointsByCity = (city) => async dispatch =>{
    try {
        let res = await axios.get("http://localhost:8080/admin/getVotes",{params:{city:city}} );
        const newRes = res.data.map(e => {return {lng:e.longitude, lat:e.latitude}});
        console.log(newRes);
        dispatch({
            type: GET_POINTS,
            payload: newRes
        })
    } catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
        new Promise((resolve, reject) => {setTimeout(() => resolve(),5000)}).then(
            dispatch({
                type:SET_NO_ERRORS
            })
        )
    }
}


export const getAllCities = () => async dispatch =>{
    try{
        const res = await axios.get("http://localhost:8080/volunteers/getCities");
        dispatch({
            type: GET_CITIES,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        new Promise((resolve, reject) => {setTimeout(() => resolve(),5000)}).then(
            dispatch({
                type:SET_NO_ERRORS
            })
        )
    }
}

