import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

function MapInterfaceSelectedCity({ cityName }) {
  return (
    <Card
      className={cityName.length <= 0 ? "text-bg-warning" : "text-bg-success"}
    >
      <Card.Header className="text-bg-primary fs-3">
        What is needed to use this?
      </Card.Header>
      <Card.Body>
        <p className="mb-3">
          But firstly you have to choose the city where you wish to set the aid
          centers
        </p>
        <p className="mb-3 fs-4 fw-light">So, choose the city firstly!</p>
        <p className="mb-3 fs-4 fw-light">
          City: {cityName.length > 0 ? cityName : "not chosen"}
        </p>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return { cityName: state.security.city.name };
};
export default connect(mapStateToProps)(MapInterfaceSelectedCity);
