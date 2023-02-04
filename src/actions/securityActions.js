import axios from "axios"
import jwtDecode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "../actions/types";
import setJWTToken from "../securityUtils/setJWTToken";

export const createNewUser = (newUser, navigate)=> async dispatch => {
    
    try{
        await axios.post("http://localhost:8080/api/user/register", newUser);
        navigate("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }catch(err){
        if(err.response && err.response.data){
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })   
        }else{
            dispatch({
                type: GET_ERRORS,
                payload: err.message
            })
        }
    }
}

export const loginByCrid = (crident, navigate) => async dispatch => {
    try{
        const res = await axios.post("http://localhost:8080/api/user/login", crident);
        navigate("/main-info");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
        const {token} = res.data;
        localStorage.setItem("jwtToken",token);
        setJWTToken(token);
        const decoded = jwtDecode(token);
        dispatch({type: SET_CURRENT_USER,
        payload:decoded})
    }catch(err){
        if(err.response && err.response.data){
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })   
        }else{
            dispatch({
                type: GET_ERRORS,
                payload: err.message
            })
        }
    }
}

export const logout = () => dispatch =>{
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: null
    })
}