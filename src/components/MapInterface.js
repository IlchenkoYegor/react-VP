import classNames from "classnames";
import React, { useCallback } from "react";
import { Card, Container, Form, FormGroup, Spinner } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { getAllPointsByCity } from "../actions/getPointsFromServerActions";
import {
  createPoll,
  getBestFittingPoints,
  pushTheResult,
  setMaxLocationsAmount,
} from "../actions/mapActions";
import { Timer } from "./Timer";

function MapInterface({
  errors,
  maxAmountOfPoints,
  setMaxLocationsAmount,
  cityName,
  selectedLocations,
  username,
  amountOfCurrentSelected,
}) {
  const [selectedMax, setSelectedMax] = React.useState(0);

  const dispatch = useDispatch();

  const onSubmitCreatePollCbk = useCallback(
    function onSubmitCreatePoll(e) {
      e.preventDefault();
      dispatch(createPoll(cityName, null));
    },
    [cityName]
  );

  const onSubmitMostFittingCbk = useCallback(
    function onSubmitMostFitting(e) {
      e.preventDefault();
      dispatch(getBestFittingPoints(maxAmountOfPoints, cityName));
    },
    [cityName, maxAmountOfPoints]
  );

  const onSubmitPushResultCbk = useCallback(
    function onSubmitPushTheResult(e) {
      e.preventDefault();
      if (maxAmountOfPoints != amountOfCurrentSelected) {
        return;
      }
      dispatch(
        pushTheResult(
          selectedLocations,
          username,
          cityName,
          maxAmountOfPoints,
          null
        )
      );
    },
    [
      selectedLocations,
      username,
      cityName,
      maxAmountOfPoints,
      amountOfCurrentSelected,
    ]
  );

  // const checkTheMapErrors = () =>{
  //     if(!errors){
  //       return errors
  //     }
  //     if(errors.)
  // }

  function onAmountChange(e) {
    setSelectedMax(e.target.value);
  }

  function onAmountClick(e) {
    setMaxLocationsAmount(Number(e.target.value));
  }

  return (
    <div>
      <Container>
        <Card className="bg-info bg-opacity-75 mb-3">
          <Card.Header className="text-bg-primary fs-3">Why?</Card.Header>
          <Card.Body>
            <p className="mb-3 mt-3 ml-3 text-bg-info">
              From here you can point the destination of aid trucks, using the
              information from polling and start the polling
            </p>
          </Card.Body>
        </Card>
        <Card
          className={
            cityName.length <= 0 ? "text-bg-warning" : "text-bg-success"
          }
        >
          <Card.Header className="text-bg-primary fs-3">
            What is needed to use this?
          </Card.Header>
          <Card.Body>
            <p className="mb-3">
              But firstly you have to choose the city where you wish to set the
              aid centers
            </p>
            <p className="mb-3 fs-4 fw-light">So, choose the city firstly!</p>
            <p className="mb-3 fs-4 fw-light">
              City: {cityName.length > 0 ? cityName : "not chosen"}
            </p>
          </Card.Body>
        </Card>
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
      </Container>
      <Container>
        <Form onSubmit={onSubmitMostFittingCbk} className=" text-center ">
          <FormGroup>
            <button
              className={classNames(
                "btn mt-3 ml-3 btn-secondary btn-lg fw-light ",
                { "btn-danger": errors.amountError }
              )}
            >
              find the most fitting points
            </button>
            {errors.amountError && (
              <div className="text-danger">
                <small>{errors.amountError}</small>
              </div>
            )}
          </FormGroup>
        </Form>

        <Form onSubmit={onSubmitCreatePollCbk} className="text-center ">
          <FormGroup>
            <button
              disabled={errors.pollingTimeout}
              className={classNames(
                "btn btn-secondary btn-lg mt-3 ml-3 fw-light ",
                { "btn-danger": errors.cityError || errors.telegramError }
              )}
            >
              {errors.pollingTimeout ? (
                <div>
                  <Timer lastTime={errors.pollingTimeout} />
                  <Spinner></Spinner>
                </div>
              ) : (
                <div>create poll</div>
              )}
            </button>
            {(errors.cityError || errors.telegramError) && (
              <div className="text-danger">
                <small>
                  {errors.cityError} {errors.telegramError}
                </small>
              </div>
            )}
          </FormGroup>
        </Form>

        <Form onSubmit={onSubmitPushResultCbk} className="text-center ">
          <FormGroup>
            <button
              disabled={errors.sendLocationTimeout}
              className={classNames([
                "btn btn-secondary btn-lg mt-3 ml-3 fw-light ",
                { "btn-danger": errors.cityError || errors.telegramError },
              ])}
            >
              {errors.sendLocationTimeout ? (
                <div>
                  <Timer lastTime={errors.sendLocationTimeout} />
                  <Spinner></Spinner>
                </div>
              ) : (
                <div>send selected locations</div>
              )}
            </button>
            {(errors.cityError || errors.telegramError) && (
              <div className="text-danger">
                <small>
                  {errors.cityError} {errors.telegramError}
                </small>
              </div>
            )}
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    maxAmountOfPoints: state.mapPoints.maxAvailablePoints,
    cityName: state.security.city.name,
    selectedLocations: state.mapPoints.selectedPoints,
    username: state.security.user.username,
    amountOfCurrentSelected: state.mapPoints.amountOfSelectedLocations,
  };
};

export default connect(mapStateToProps, {
  getAllPointsByCity,
  setMaxLocationsAmount,
})(MapInterface);
