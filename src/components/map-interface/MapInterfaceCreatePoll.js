import classNames from "classnames";
import React, { useCallback } from "react";
import { Form, FormGroup, Spinner } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { createPoll } from "../../actions/mapActions";
import { Timer } from "../Timer";

function MapInterfaceCreatePoll({ cityName, errors }) {
  const dispatch = useDispatch();
  const onSubmitCreatePollCbk = useCallback(
    function onSubmitCreatePoll(e) {
      e.preventDefault();
      dispatch(createPoll(cityName, null));
    },
    [cityName]
  );
  return (
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
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    cityName: state.security.city.name,
  };
};

export default connect(mapStateToProps, {})(MapInterfaceCreatePoll);
