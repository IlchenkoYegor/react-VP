import axios from 'axios'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux'
import { getAllCities } from '../actions/getPointsFromServerActions';
import { getCityData } from '../actions/mapActions';

function CityChoose({cities, getCityData}) {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllCities());
    if(cities[0]){
    getCityData(cities[0])
    }
  }, [cities])

  const setSelectedCity = (e) =>{
    console.log(e)
    const [first] = cities.filter(r => r.name==e)
     console.log(first);
    getCityData(first);
  }

  return (
    <div className='container p-3 my-3 bg-primary text-white'>
      <h1>Select your city!</h1>
      <Form.Control as="select" aria-label="Default select example" onChange={e=> setSelectedCity(e.target.value)}>
        <option disabled={true}>select the city where you want to process data</option>
        {cities.map(e => <option value={e.name}>{e.name}</option>)}
      </Form.Control>
    </div>
    
  )
}

const mapStateToProps = (state) =>({
    cities: state.getPoints.cities
} )

export default connect(mapStateToProps, {getCityData})(CityChoose);