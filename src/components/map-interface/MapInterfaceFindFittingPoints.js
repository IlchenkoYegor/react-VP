import classNames from "classnames";
import React, { useCallback } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { getBestFittingPoints } from "../../actions/mapActions";

function MapInterfaceFindFittingPoints({
  maxAmountOfPoints,
  cityName,
  errors,
}) {
  const dispatch = useDispatch();
  const onSubmitMostFittingCbk = useCallback(
    function onSubmitMostFitting(e) {
      e.preventDefault();
      dispatch(getBestFittingPoints(maxAmountOfPoints, cityName));
    },
    [cityName, maxAmountOfPoints]
  );

  return (
    <Form onSubmit={onSubmitMostFittingCbk} className=" text-center ">
      <FormGroup>
        <button
          className={classNames(
            "btn mt-3 ml-3 btn-secondary btn-lg fw-light ",
            {
              "btn-danger": errors.amountError,
            }
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
  );
}
const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    maxAmountOfPoints: state.mapPoints.maxAvailablePoints,
    cityName: state.security.city.name,
  };
};

export default connect(mapStateToProps, {})(MapInterfaceFindFittingPoints);
