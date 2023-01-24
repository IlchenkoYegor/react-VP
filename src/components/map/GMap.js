import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useJsApiLoader } from '@react-google-maps/api';
import s from './Map.module.css'
import { connect, useDispatch } from 'react-redux';
import { mapReducer } from '../../reducers/mapReducer';
import {setLocation} from "../../actions/mapActions"
import { getAllPointsByCity } from '../../actions/getPointsFromServerActions';
import { GET_ERRORS } from '../../actions/types';
import { isNotEmpty } from '../../isNotEmpty';
import ModalComponent from '../ModalComponent';
const API_KEY = process.env.REACT_APP_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%'
};



const GMap = ({locationCoordinates, selectedPoints, amountOfPoints,amountOfSelectedLocations,center, setLocation, maxPoints, errors}) => {

  //[])
  const somePoints = [
    {
      lat: -3.745,
      lng: -38.523
    },
    
    {
      lat: -3.743,
      lng: -38.524
    },
    
    {
      lat: -3.744,
      lng: -38.521
    },
    
    {
      lat: -3.740,
      lng: -38.523
    },
    
  ]
  console.log(amountOfPoints);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })
  const mapRef = React.useRef(undefined)
  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, [])
  console.log(center);

  
  
  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined;
  }, [])
  const dispatch = useDispatch();
  dispatch(getAllPointsByCity("Sumy"));
  const onMapClick = (e)=>{
    e.domEvent.preventDefault();
    if(selectedPoints<maxPoints){
      const latLong = e.latLng;
      setLocation(latLong); 
    }else{
      dispatch({
        type:GET_ERRORS,
        payload: {data: "you cannot modify add more points than you have set"}
      })
    }
  }
  console.log(errors);
  return (
    isLoaded?
    <div className={s.container}>
    {isNotEmpty(errors) && <ModalComponent error={errors}></ModalComponent>}
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onZoomChanged={null}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick = {onMapClick}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        {amountOfPoints>0 && locationCoordinates.map(e=>{return <Marker position={e}></Marker>}) }
        {amountOfSelectedLocations>0 && selectedPoints.map(e=>{return <Marker position={e}></Marker>}) }
      </GoogleMap>
      </div>
      :
      <div>
      loading...
      </div>
  )
}

const mapStateToProps = state =>{
  return {
    locationsCoordinates: state.mapPoints.locationCoordinates,
    selectedPoints: state.mapPoints.selectedPoints,
    amountOfPoints: state.mapPoints.amountOfPoints,
    amountOfSelectedLocations: state.mapPoints.amountOfSelectedLocations,
    center: state.mapPoints.city.center,
    maxPoints: state.mapPoints.maxAvailablePoints,
    errors: state.errors
  }
}

const actions = {
  setLocation
}

export default connect(  mapStateToProps,actions)(GMap)