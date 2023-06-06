import React from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import MapInterface from "../components/map-interface/MapInterface";
import GMap from "../components/map/GMap";

function Map({ errors }) {
  return (
    <Card
      className="text-bg-info bg-gradient m-2"
      style={{ maxWidth: "99%", maxHeight: "99%" }}
    >
      <Card.Header className="shadow text-bg-primary text-center display-3 p-4">
        <Row>
          <Col>
            <p>Map</p>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {errors.data && (
          <Alert key="warning" variant="warning">
            <Container>{errors.data}</Container>
          </Alert>
        )}
        <Row>
          <Col>
            {errors.cityError && (
              <Alert key="warning" variant="warning">
                {" "}
                Carefully! some error occured: {errors.cityError}
              </Alert>
            )}
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
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, null)(Map);
