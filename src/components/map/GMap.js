import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import useSupercluster from "use-supercluster";
import { getAllPointsByCity } from "../../actions/getPointsFromServerActions";
import { deleteLocation, setLocation } from "../../actions/mapActions";
import { GET_ERRORS } from "../../actions/types";
import CitizenLocationMarker from "../marker/CitizenLocationMarker";
import ClusterMarker from "../marker/ClusterMarker";
import SelectedLocationMarker from "../marker/SelectedLocationMarker";
import s from "./Map.module.css";
// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const GMap = ({
  locationCoordinates,
  selectedPoints,
  amountOfPoints,
  amountOfSelectedLocations,
  center,
  setLocation,
  maxPoints,
  cityName,
}) => {
  //[])
  const [bounds, setBounds] = useState([]);
  const [zoom, setZoom] = useState(10);
  console.log(amountOfPoints);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });
  const mapRef = React.useRef(undefined);
  //const zoomRef = React.useRef(null);
  useEffect(onBoundsChangedHandler, [zoom]);
  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined;
  }, []);

  const dispatch = useDispatch();

  const useFetching = (e) =>
    useEffect(() => {
      dispatch(e(cityName));
    }, [cityName]);

  useFetching(getAllPointsByCity);

  // eslint-disable-next-line no-unused-vars
  const onZoomChangedHdl = () => {};

  const { clusters } = useSupercluster({
    points: locationCoordinates,
    bounds,
    zoom,
    options: {
      radius: 100,
      maxZoom: 20,
    },
  });
  //  console.log(center);

  // console.log(cityName)
  function onBoundsChangedHandler() {
    if (mapRef.current) {
      const ne = mapRef.current.getBounds().getNorthEast();
      const sw = mapRef.current.getBounds().getSouthWest();
      setBounds(() => {
        return [sw.lng(), sw.lat(), ne.lng(), ne.lat()];
      });
    }
  }

  //console.log(clusters);

  const onMapClick = (e) => {
    e.domEvent.preventDefault();
    if (amountOfSelectedLocations < maxPoints) {
      const latLong = e.latLng;
      setLocation(latLong);
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: {
          data: "you cannot modify add more points than you have set",
        },
      });
    }
  };

  const onMarkerClick = (coordinates) => {
    dispatch(deleteLocation(coordinates));
  };
  return isLoaded ? (
    <div className={s.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onZoomChanged={() => {
          mapRef.current && setZoom(mapRef.current.getZoom());
        }}
        //onBoundsChanged=
        onDragEnd={onBoundsChangedHandler}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        {/* Child components, such as markers, info windows, etc.  onClick1={deleteLocation}*/}
        <></>
        {/* <CitizenLocationMarker position1={}></CitizenLocationMarker> */}
        {clusters.map((cluster, id) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          if (isCluster) {
            return (
              <ClusterMarker
                key={id}
                position={{ lng, lat }}
                pointCount={pointCount}
              ></ClusterMarker>
            );
          }
          return (
            <CitizenLocationMarker
              key={id}
              position1={{ lng, lat }}
            ></CitizenLocationMarker>
          );
        })}
        {}
        {amountOfSelectedLocations > 0 &&
          selectedPoints.map((e, id) => {
            return (
              <SelectedLocationMarker
                key={id}
                position1={e}
                onClick={() => onMarkerClick(e)}
              ></SelectedLocationMarker>
            );
          })}
      </GoogleMap>
    </div>
  ) : (
    <div>
      <Spinner></Spinner>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    locationCoordinates: state.getPoints.points,
    selectedPoints: state.mapPoints.selectedPoints,
    amountOfPoints: state.getPoints.amountOfPoints,
    amountOfSelectedLocations: state.mapPoints.amountOfSelectedLocations,
    center: state.mapPoints.city.center,
    cityName: state.mapPoints.city.name,
    maxPoints: state.mapPoints.maxAvailablePoints,
    errors: state.errors,
  };
};

const actions = {
  setLocation,
  deleteLocation,
};

export default connect(mapStateToProps, actions)(GMap);
