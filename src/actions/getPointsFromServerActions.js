import axios from "axios";
import {GET_CITIES, GET_ERRORS, GET_POINTS } from "./types";

export const getAllPointsByCity = (city) => async dispatch =>{
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
            payload: err
        })
    }
}

