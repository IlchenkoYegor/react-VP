import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useJsApiLoader } from '@react-google-maps/api';
import s from './Map.module.css'
import { connect, useDispatch } from 'react-redux';
import { mapReducer } from '../../reducers/mapReducer';
import {setLocation, deleteLocation} from "../../actions/mapActions"
import { getAllPointsByCity } from '../../actions/getPointsFromServerActions';
import { GET_ERRORS } from '../../actions/types';
import { isNotEmpty } from '../../isNotEmpty';
import ModalComponent from '../ModalComponent';
import CitizenLocationMarker from '../marker/CitizenLocationMarker';
import SelectedLocationMarker from '../marker/SelectedLocationMarker';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
const API_KEY = process.env.REACT_APP_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%'
};



const GMap = ({locationCoordinates, selectedPoints, amountOfPoints,amountOfSelectedLocations,center, setLocation, maxPoints, errors, cityName}) => {

  //[])

  console.log(amountOfPoints);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })
  const mapRef = React.useRef(undefined)
  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, [])
//  console.log(center);

  console.log(cityName)
  
  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined;
  }, [])
  const dispatch = useDispatch();
  const useFetching = (e) => useEffect(
    () => {dispatch(e(cityName));},
  [cityName]);
  useFetching(getAllPointsByCity);
  const onMapClick = (e)=>{
    e.domEvent.preventDefault();
    if(amountOfSelectedLocations<maxPoints){
      const latLong = e.latLng;
      setLocation(latLong); 
    }else{
      dispatch({
        type:GET_ERRORS,
        payload: {data: "you cannot modify add more points than you have set"}
      })
    }
  }

  const onMarkerClick = (coordinates) =>{
      dispatch(deleteLocation(coordinates));
  }
  return (
    isLoaded?
    <div className={s.container}>
    {errors.data && <Alert key='warning' variant='warning'><Container>{errors.data}</Container></Alert>}
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onZoomChanged={null}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick = {onMapClick}
      >
        { /* Child components, such as markers, info windows, etc.  onClick1={deleteLocation}*/}
        <></>
        {/* <CitizenLocationMarker position1={}></CitizenLocationMarker> */}
        {amountOfPoints>0 && locationCoordinates.map(e=>{console.log(e); return <CitizenLocationMarker position1={e} ></CitizenLocationMarker>}) }
        {amountOfSelectedLocations>0 && selectedPoints.map(e=>{return <SelectedLocationMarker position1={e} onClick={click => onMarkerClick(e)} ></SelectedLocationMarker>}) }
      </GoogleMap>
      </div>
      :
      <div>
      <Spinner></Spinner>
      </div>
  )
}

const mapStateToProps = state =>{
  return {
    locationCoordinates: state.getPoints.points,
    selectedPoints: state.mapPoints.selectedPoints,
    amountOfPoints: state.getPoints.amountOfPoints,
    amountOfSelectedLocations: state.mapPoints.amountOfSelectedLocations,
    center: state.mapPoints.city.center,
    cityName: state.mapPoints.city.name,
    maxPoints: state.mapPoints.maxAvailablePoints,
    errors: state.errors
  }
}

const actions = {
  setLocation,
  deleteLocation
}

export default connect(  mapStateToProps,actions)(GMap)