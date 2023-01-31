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
import useSupercluster from 'use-supercluster';
import { useState } from 'react';
import ClusterMarker from '../marker/ClusterMarker';
const API_KEY = process.env.REACT_APP_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%'
};



const GMap = ({locationCoordinates, selectedPoints, amountOfPoints,amountOfSelectedLocations,center, setLocation, maxPoints, errors, cityName}) => {

  //[])
  const [bounds, setBounds] = useState([])
  const [zoom, setZoom] = useState(10)
  console.log(amountOfPoints);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })
  const mapRef = React.useRef(undefined)
  
  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, [])

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined;
  }, [])
  
  const dispatch = useDispatch();
  
  const useFetching = (e) => useEffect(
    () => {dispatch(e(cityName))},
  [cityName]);
  
  useFetching(getAllPointsByCity);

  const onZoomChangedHdl = () =>{

  }

  const {clusters} = useSupercluster(
    {
      points:locationCoordinates,
      bounds,
      zoom,
      options:{
        radius:100,
        maxZoom:20
      }
    }
  )
//  console.log(center);

 // console.log(cityName)
  function onBoundsChangedHandler(){
    if(mapRef.current){
      const ne= mapRef.current.getBounds().getNorthEast();
      const sw = mapRef.current.getBounds().getSouthWest();
      setBounds([
        sw.lng(),
        sw.lat(),
        ne.lng(),
        ne.lat()
      ]) 
      //console.log(bounds);
    }
  } 

  //console.log(clusters);

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
        onZoomChanged={() => {mapRef.current && setZoom(mapRef.current.getZoom())}}
        onBoundsChanged = {onBoundsChangedHandler}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick = {onMapClick}
      >
        { /* Child components, such as markers, info windows, etc.  onClick1={deleteLocation}*/}
        <></>
        {/* <CitizenLocationMarker position1={}></CitizenLocationMarker> */}
        {clusters.map(cluster => { 
          const [lng, lat] = cluster.geometry.coordinates;
          const {cluster: isCluster, point_count:pointCount} = cluster.properties;
          if(isCluster){
            return(
              <ClusterMarker position={{lng, lat}} pointCount={pointCount}></ClusterMarker>
            )
          }
          return (
            <CitizenLocationMarker position1={{lng,lat}} ></CitizenLocationMarker>
          )
        })}
        {  }
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