import React from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux';
import GMap from '../components/map/GMap'
import MapInterface from '../components/MapInterface';

export default function Map() {
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  return (
    <Row>
    <Col>
      <MapInterface></MapInterface>
    </Col>
    <Col xs={9}>
      <GMap></GMap>
    </Col>
    </Row>
    
)
}


