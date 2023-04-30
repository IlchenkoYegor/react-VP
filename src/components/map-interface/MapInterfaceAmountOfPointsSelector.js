import classNames from "classnames";
import React from "react";
import { Card, Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setMaxLocationsAmount } from "../../actions/mapActions";

function MapInterfaceAmountOfPointsSelector({
  setMaxLocationsAmount,
  maxAmountOfPoints,
  errors,
}) {
  const [selectedMax, setSelectedMax] = React.useState(0);
  function onAmountChange(e) {
    setSelectedMax(e.target.value);
  }

  function onAmountClick(e) {
    setMaxLocationsAmount(Number(e.target.value));
  }
  return (
    <Card className="text-bg-secondary mt-3">
      <Card.Header>
        Enter the amount of points which you want to set
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            {/*   */}
            <Form.Range
              min={1}
              max={100}
              onChange={onAmountChange}
              onClick={onAmountClick}
            ></Form.Range>
            <Form.Label>{selectedMax}</Form.Label>
          </Form.Group>
          <Container
            className={classNames({ "text-danger": errors.amountError })}
          >
            <p>current max amount {maxAmountOfPoints}</p>
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    maxAmountOfPoints: state.mapPoints.maxAvailablePoints,
  };
};

export default connect(mapStateToProps, {
  setMaxLocationsAmount,
})(MapInterfaceAmountOfPointsSelector);
