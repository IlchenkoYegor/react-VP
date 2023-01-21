import { GET_BEST_SUITABLE_POINTS, GET_POINTS, SET_CURRENT_USER, SET_SUITABLE_POINTS } from "../actions/types";

const initialState = {
    points:[],
    selectedPoints:[],
    amountOfPoints: 0,
    amountOfSelectedLocations:0,
    center: {
        lat: -3.744,
        lng: -38.521
      }
}

export const mapReducer = (state = initialState, action) => {
        switch(action.type){
            case GET_POINTS:
                return {...state, points: action.payload, amountOfPoints: action.payload.length};
            case SET_SUITABLE_POINTS:
                return {...state, selectedPoints: state.selectedPoints.concat( action.payload), amountOfSelectedLocations: state.amountOfSelectedLocations+1};
            case GET_BEST_SUITABLE_POINTS:
                return {
                    ...state, selectedPoints: action.payload, amountOfSelectedLocations: action.payload.length
                };
            default: return state;
            
        }
}