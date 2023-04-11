import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { getAllCities } from "../actions/getPointsFromServerActions";
import { getCityData } from "../actions/mapActions";

function CityChoose({ cities, cityName, username }) {
  const dispatch = useDispatch();
  let [selectedCity, setSelectedCity] = useState("");
  const useFetching = (e) =>
    useEffect(() => {
      dispatch(e());
      //console.log(cities)
      if (cities[0]) {
        //  dispatch( e2(cities[0]));
        setSelectedCity(0);
      }
      //console.log(cities);
    }, [JSON.stringify(cities)]);
  console.log(JSON.stringify(selectedCity));
  useFetching(getAllCities, getCityData);
  const setSelectedCityCbk = useCallback(
    (e) => {
      console.log(toString(e));

      // console.log(first);
      dispatch(getCityData(username, cities[e]));
    },
    [JSON.stringify(cities)]
  );

  return (
    <div className="container p-3 my-3">
      <Card>
        <Card.Header className="text-bg-primary">
          <p className="display-3 text-center">Select your city!</p>
        </Card.Header>
        <Card.Body>
          <Form.Control
            as="select"
            aria-label="Default select example"
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option disabled={true}>
              select the city where you want to process data
            </option>
            {cities.map((e, id) => (
              <option value={id} key={id}>
                {e.name}
              </option>
            ))}
          </Form.Control>
          <p className="fs-3">
            your city now: {cityName.length > 0 ? cityName : "is not chosen!"}
          </p>
          <Container className="mt-3 text-center">
            <Button
              className="btn btn-secondary text-center fs-3 fw-light"
              onClick={() => setSelectedCityCbk(selectedCity)}
            >
              Choose selected city
            </Button>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cities: state.getPoints.cities,
  cityName: state.security.city.name,
  username: state.security.user.username,
});

export default connect(mapStateToProps, null)(CityChoose);
