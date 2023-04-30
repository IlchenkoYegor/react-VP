import classNames from "classnames";
import React, { useCallback } from "react";
import { Form, FormGroup, Spinner } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { pushTheResult } from "../../actions/mapActions";
import { GET_ERRORS } from "../../actions/types";
import { Timer } from "../Timer";

function MapInterfaceSetSelectedLocations({
  maxAmountOfPoints,
  selectedLocations,
  username,
  cityName,
  amountOfCurrentSelected,
  errors,
  timeOfDelivering,
}) {
  const dispatch = useDispatch();
  const onSubmitPushResultCbk = useCallback(
    function onSubmitPushTheResult(e) {
      e.preventDefault();
      if (maxAmountOfPoints != amountOfCurrentSelected) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            pointsNotSelectedError:
              "amount of actually selected points is not equal the one you have indicated above",
          },
        });
        return;
      } else if (!timeOfDelivering || timeOfDelivering < Date.now()) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            timeOfDeliveringError:
              "You didn`t enter the time of aid delivering",
          },
        });
        return;
      }
      dispatch(
        pushTheResult(
          selectedLocations,
          username,
          cityName,
          maxAmountOfPoints,
          timeOfDelivering
        )
      );
    },
    [
      selectedLocations,
      username,
      cityName,
      maxAmountOfPoints,
      amountOfCurrentSelected,
      timeOfDelivering,
    ]
  );
  return (
    <Form onSubmit={onSubmitPushResultCbk} className="text-center ">
      <FormGroup>
        <button
          disabled={errors.sendLocationTimeout}
          className={classNames([
            "btn btn-secondary btn-lg mt-3 ml-3 fw-light ",
            {
              "btn-danger":
                errors.cityError ||
                errors.telegramError ||
                errors.timeOfDeliveringError ||
                errors.pointsNotSelectedError,
            },
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
        {(errors.cityError ||
          errors.telegramError ||
          errors.timeOfDeliveringError ||
          errors.pointsNotSelectedError) && (
          <div className="text-danger">
            <small>
              {errors.cityError} {errors.telegramError}
              {errors.timeOfDeliveringError}
              {errors.pointsNotSelectedError}
            </small>
          </div>
        )}
      </FormGroup>
    </Form>
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
    timeOfDelivering: state.mapPoints.timeOfDelivering,
  };
};

export default connect(mapStateToProps, {})(MapInterfaceSetSelectedLocations);
