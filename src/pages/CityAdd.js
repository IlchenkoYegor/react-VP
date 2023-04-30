import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCityInfo } from "../actions/cityActions";
import styles from "../heights.module.css";

function CityAdd({ errors }) {
  const [cityName, setCityName] = useState("");
  const [cityCenter, setCityCenter] = useState({ longitude: 0, latitude: 0 });
  const [citySquare, setCitySquare] = useState(0);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const onSubmitCbk = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        addCityInfo(navigator, {
          name: cityName,
          locationCoordinates: cityCenter,
          area: citySquare,
        })
      );
      console.log(cityCenter);
    },
    [cityName, cityCenter, citySquare]
  );

  return (
    <div
      className={styles["page-height"].concat(
        " d-flex flex-column justify-content-between"
      )}
    >
      <Container className="mt-4">
        <Card>
          <Card.Header className="text-bg-primary">
            <p className="display-3 text-center">Add a new city!</p>
          </Card.Header>
          <Card.Body>
            <Container className="text-center">
              <Form onSubmit={onSubmitCbk}>
                <FormGroup className="mb-3 mt-4">
                  <Form.Label>City Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setCityName(e.target.value)}
                    className={classNames({ "is-invalid": errors.name })}
                  ></Form.Control>
                  <Form.Text>
                    Enter the name of city in English. Consider that the first
                    letter should be capitalized
                  </Form.Text>
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Square</Form.Label>
                  <Form.Control
                    className={classNames({ "is-invalid": errors.area })}
                    type="text"
                    onChange={(e) => setCitySquare(e.target.value)}
                  ></Form.Control>
                  <Form.Text>Enter the area of city</Form.Text>
                  {errors.area && (
                    <div className="invalid-feedback">{errors.area}</div>
                  )}
                </FormGroup>
                <div className="d-flex justify-content-evenly">
                  <FormGroup className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        setCityCenter((prev) => {
                          return { ...prev, longitude: e.target.value };
                        })
                      }
                      className={classNames({
                        "is-invalid": errors.locationCoordinates,
                      })}
                    ></Form.Control>
                    <Form.Text>Enter the longitude of city center</Form.Text>
                    {errors.locationCoordinates && (
                      <div className="invalid-feedback">
                        {errors.locationCoordinates}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        setCityCenter((prev) => {
                          return { ...prev, latitude: e.target.value };
                        })
                      }
                      className={classNames({
                        "is-invalid": errors.locationCoordinates,
                      })}
                    ></Form.Control>
                    <Form.Text>Enter the latitude of city center</Form.Text>
                    {errors.locationCoordinates && (
                      <div className="invalid-feedback">
                        {errors.locationCoordinates}
                      </div>
                    )}
                  </FormGroup>
                </div>
                <Button className="mb-4" type="submit">
                  Add the city
                </Button>
              </Form>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {})(CityAdd);
