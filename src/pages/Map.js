import React from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux';
import GMap from '../components/map/GMap'
import MapInterface from '../components/MapInterface';
import { isNotEmpty } from '../isNotEmpty';

function Map({errors}) {
  console.log(errors);
  console.log(isNotEmpty(errors))
  return (
    <div>
    <Row>
      <Col>
            {errors.cityError && <Alert key='warning' variant='warning'> Carefully! some error occured: {errors.cityError}</Alert>} 
      </Col>
    </Row>
    <Row>
    <Col>
      <MapInterface></MapInterface>
    </Col>
    <Col xs={9}>
      <GMap></GMap>
    </Col>
    </Row>
    </div>
)
}


const mapStateToProps = (state) =>({
  errors : state.errors
})

export default connect(mapStateToProps, null)(Map)