import React from 'react'
import { GoogleMap } from '@react-google-maps/api'
import { useJsApiLoader } from '@react-google-maps/api';
import s from './Map.module.css'
const API_KEY = process.env.REACT_APP_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%'
};


function GMap({center}) {
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
  return (
    isLoaded?<div className={s.container}>
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      </div>
      :
      <div>
      loading...
      </div>
  )
}

export default GMap