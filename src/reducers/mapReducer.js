import { GET_BEST_SUITABLE_POINTS, GET_CITY, GET_POINTS, SET_CURRENT_USER, SET_MAX_AMOUNT_OF_POINTS, SET_SUITABLE_POINTS } from "../actions/types";

const initialState = {
    
    selectedPoints:[],
    amountOfPoints: 0,
    amountOfSelectedLocations:0,
    city:{
        name:"",
        area:0,
        center:{
            lat:0.0,
            lng:0.0
        }
    },
    maxAvailablePoints: 0
}

export const mapReducer = (state = initialState, action) => {
        switch(action.type){
            case SET_SUITABLE_POINTS:
                return {...state, selectedPoints: state.selectedPoints.concat( action.payload), amountOfSelectedLocations: state.amountOfSelectedLocations+1};
            case SET_MAX_AMOUNT_OF_POINTS:
                return {
                    ...state, maxAvailablePoints: action.payload
                }
            case GET_CITY:
                return {
                    ...state, city:action.payload
                }
            case GET_BEST_SUITABLE_POINTS:
                return {
                    ...state, selectedPoints: action.payload, amountOfSelectedLocations: action.payload.length
                };
            default: return state;
            
        }
}