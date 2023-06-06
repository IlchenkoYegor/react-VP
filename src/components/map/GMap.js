import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import useSupercluster from "use-supercluster";
import { handleError } from "../../actions/errorActions";
import { geocode } from "../../actions/geocodingActions";
import { getAllPointsByCity } from "../../actions/getPointsFromServerActions";
import { mainLoading } from "../../actions/loadingActions";
import {
  deleteLocation,
  setLocation,
  setMaxLocationsAmount,
} from "../../actions/mapActions";
import useInterval from "../../hooks";
import CitizenLocationMarker from "../marker/CitizenLocationMarker";
import ClusterMarker from "../marker/ClusterMarker";
import SelectedLocationMarker from "../marker/SelectedLocationMarker";
import s from "./Map.module.css";
// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY;

const POINTS_AMOUNT_ERROR_MSG =
  "Careful! Amount of selected and indicated points must match!";

const LOCATION_MISMATCH_ERROR_MSG =
  "Careful! Selected point is not situated in specified city!";

const containerStyle = {
  width: "100%",
  height: "100%",
};
const DELAY_INTERVAL = 40_000;

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
  const [bounds, setBounds] = useState([]);
  const [zoom, setZoom] = useState(10);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });
  const dispatch = useDispatch();
  const mapRef = React.useRef(undefined);

  useEffect(onBoundsChangedHandler, [zoom, mapRef.current]);
  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback() {
    dispatch(setMaxLocationsAmount(0));
    mapRef.current = undefined;
  }, []);

  const useFetching = (e) =>
    useEffect(() => {
      dispatch(e(cityName, amountOfPoints));
    }, [cityName]);
  useFetching(getAllPointsByCity);
  useInterval(() => {
    dispatch(getAllPointsByCity(cityName, amountOfPoints));
  }, DELAY_INTERVAL);

  const { clusters } = useSupercluster({
    points: locationCoordinates,
    bounds,
    zoom,
    options: {
      radius: 100,
      maxZoom: 20,
    },
  });
  function onBoundsChangedHandler() {
    if (mapRef.current && mapRef.current.getBounds()) {
      const ne = mapRef.current.getBounds().getNorthEast();
      const sw = mapRef.current.getBounds().getSouthWest();
      setBounds(() => {
        return [sw.lng(), sw.lat(), ne.lng(), ne.lat()];
      });
    }
  }
  const onMapClick = (e) => {
    e.domEvent.preventDefault();
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    dispatch(mainLoading(true));
    geocode(lat, lng)
      .then((selectedCity) => {
        if (
          amountOfSelectedLocations < maxPoints &&
          selectedCity === cityName
        ) {
          const latLong = { lat: lat, lng: lng };
          setLocation(latLong);
        } else if (selectedCity !== cityName) {
          dispatch(handleError(null, LOCATION_MISMATCH_ERROR_MSG));
        } else {
          dispatch(handleError(null, POINTS_AMOUNT_ERROR_MSG));
        }
        dispatch(mainLoading(false));
      })
      .catch(() => {
        dispatch(mainLoading(false));
      });
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
        onDragEnd={onBoundsChangedHandler}
        onLoad={(e) => {
          onLoad(e);
        }}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
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
    <div className="d-flex justify-content-center" style={{ height: "100%" }}>
      <div className="align-self-center">
        <Spinner style={{ height: "5em", width: "5em" }}></Spinner>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    locationCoordinates: state.getPoints.points,
    selectedPoints: state.mapPoints.selectedPoints,
    amountOfPoints: state.getPoints.amountOfPoints,
    amountOfSelectedLocations: state.mapPoints.amountOfSelectedLocations,
    center: state.security.city.center,
    cityName: state.security.city.name,
    maxPoints: state.mapPoints.maxAvailablePoints,
    errors: state.errors,
  };
};

const actions = {
  setLocation,
  deleteLocation,
};

export default connect(mapStateToProps, actions)(GMap);
