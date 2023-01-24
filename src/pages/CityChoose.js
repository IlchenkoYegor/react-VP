import axios from 'axios'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux'
import { getAllCities } from '../actions/getPointsFromServerActions';
import { getCityData } from '../actions/mapActions';

function CityChoose({cities}) {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllCities());
  }, [])

  const setSelectedCity = (e) =>{
    const [first, ...rest] = cities.filter(r => r.name==e.target.name)
    dispatch(getCityData(first))
  }

  return (
    <div className='container p-3 my-3 bg-primary text-white'>
      <h1>Select your city!</h1>
      <Form.Select aria-label="Default select example" onChange={setSelectedCity}>
      <option disabled={true}>select the city where you want to process data</option>
      {cities.map(e => <option value={e.name}>{e.name}</option>)}
    </Form.Select>
    </div>
    
  )
}

const mapStateToProps = (state) =>({
    cities: state.getPoints.cities
} )

export default connect(mapStateToProps, null)(CityChoose);