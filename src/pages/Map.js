import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import GMap from '../components/map/GMap'

export default function Map() {
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  return (
    <Row>
    <Col>
      <div>Map</div>
    </Col>
    <Col xs={9}>
      <GMap center={center}></GMap>
    </Col>
    </Row>
    
  )
}
