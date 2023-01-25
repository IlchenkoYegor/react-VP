import { Marker } from '@react-google-maps/api'
import React from 'react'

export default function SelectedLocationMarker({position1, onClick}) {
  
const url1 = 'https://cdn-icons-png.flaticon.com/128/8765/8765367.png';

    return (
    <Marker position={position1} icon={{url:url1, scaledSize:{width:30, height:40}}} onClick={onClick} />
  )
}
