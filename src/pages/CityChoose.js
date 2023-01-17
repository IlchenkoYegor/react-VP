import axios from 'axios'
import React, { useEffect } from 'react'

export default function CityChoose() {
  useEffect(()=>{
    axios.get("http://localhost:8000/cities")
  })

  return (
    <div>CityChoose</div>
  )
}
