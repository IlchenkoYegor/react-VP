import axios from 'axios'
import React, { useCallback, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux'
import { getAllCities } from '../actions/getPointsFromServerActions';
import { getCityData } from '../actions/mapActions';

function CityChoose({cities}) {
  const dispatch = useDispatch();
  
  const useFetching = (e,e2) => useEffect(()=>{
    dispatch(e());
    if(cities[0]){
      dispatch( e2(cities[0]));
    }
    console.log(cities);
  }, []);
  
  useFetching(getAllCities, getCityData);
  const setSelectedCityCbk = useCallback( (e) =>{
    console.log(e)
    
    // console.log(first);
    dispatch(getCityData(e));
  }, [cities])

  return (
    <div className='container p-3 my-3 bg-primary text-white'>
      <h1>Select your city!</h1>
      <Form.Control as="select" aria-label="Default select example" onChange={e=> setSelectedCityCbk(e.target.value)}>
        <option disabled={true}>select the city where you want to process data</option>
        {cities.map(e => <option value={e}>{e.name}</option>)}
      </Form.Control>
    </div>
    
  )
}

const mapStateToProps = (state) =>({
    cities: state.getPoints.cities
} )

export default connect(mapStateToProps, null)(CityChoose);