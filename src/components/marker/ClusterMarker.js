import { Marker } from "@react-google-maps/api";
import React from "react";

export default function ClusterMarker({ position, pointCount }) {
  return (
    <Marker
      position={position}
      label={{ text: "" + pointCount, className: "cluster-marker" }}
    ></Marker>
  );
}
