import { Marker } from "@react-google-maps/api";
import React from "react";

export default function CitizenLocationMarker({ position1 }) {
  const url1 = "https://cdn-icons-png.flaticon.com/128/8253/8253212.png";
  return (
    <Marker
      position={position1}
      icon={{ url: url1, scaledSize: { width: 30, height: 40 } }}
    />
  );
}
