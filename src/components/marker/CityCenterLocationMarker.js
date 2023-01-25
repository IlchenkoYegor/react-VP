import { Marker } from '@react-google-maps/api'
import React from 'react'

export default function CityCenterLocationMarker({position}) {
  return (
    <Marker position={position} options={{url:"/public/earth.png"}}></Marker>
  )
}