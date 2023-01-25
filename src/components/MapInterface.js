import React, { useState } from 'react'
import { Alert, Container, Form } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux';
import { isNotEmpty } from '../isNotEmpty';
import RequestAFittingPointsButton from './RequestAFittingPointsButton'
import SendResultsButton from './SendResultsButton'
import { createPoll, pushTheResult, setMaxLocationsAmount } from '../actions/mapActions';
import { getAllPointsByCity } from '../actions/getPointsFromServerActions';
import ModalComponent from './ModalComponent';
import { useCallback } from 'react';

function MapInterface({errors, maxAmountOfPoints, setMaxLocationsAmount,cityName, selectedLocations, username}) {

  const [selectedMax, setSelectedMax] = React.useState(0);

  const dispatch = useDispatch();

  const onSubmitMostFittingCbk = useCallback( function onSubmitMostFitting(e){
      e.preventDefault();
      dispatch(createPoll(cityName, null));
  },[cityName])

  const onSubmitMostSendSelectedCbk = useCallback( function onSubmitMostSendSelected(e){
    e.preventDefault();
    if(maxAmountOfPoints>selectedLocations){
      return;
    }
    
    dispatch(pushTheResult(selectedLocations,username,cityName,maxAmountOfPoints,null));
  },[]
  )
  
  // const checkTheMapErrors = () =>{
  //     if(!errors){
  //       return errors
  //     }
  //     if(errors.)
  // }

  function onAmountChange(e){
    setSelectedMax(e.target.value);
  }  

  function onAmountClick(e){
    setMaxLocationsAmount(Number(e.target.value));
  }

  return (
       <div>
       {isNotEmpty(errors) && <ModalComponent error={errors}></ModalComponent>}
       {isNotEmpty(errors) &&<Alert key='warning' variant='warning'>error occured </Alert>} 
    <div className='text-center '>Map</div>
    <Container>
    <p className='mb-3 mt-3 ml-3'>From here you can point the destination of aid trucks, using the information from polling and start the polling</p>
    <p className='mb-3'>But firstly you have to choose the city where you wish to set the aid centers</p>
    </Container>
    <Container>
        <Form onSubmit={onSubmitMostFittingCbk}>
          <button className='btn mb-3'>find the most fitting points</button>
          </Form>
          <Form onSubmit={onSubmitMostSendSelectedCbk}>
          <button className='btn mt-3 ml-3'>send selected locations</button>
        </Form>
      </Container>
      <Container>
        <Form>
        <Form.Group>
          <Form.Text>Enter the amount of points which you want to set</Form.Text>
          {/*   */}
          <Form.Range min={1} max={100} onChange={onAmountChange} onClick={onAmountClick}></Form.Range>
          <Form.Label >{selectedMax}</Form.Label>
          </Form.Group>
          <Container><p>current max amount {maxAmountOfPoints}</p></Container>
        </Form>
        </Container>
    </div>
    
  )
}

const mapStateToProps = state =>{
  return {
    errors: state.errors,
    maxAmountOfPoints: state.mapPoints.maxAvailablePoints,
    cityName: state.mapPoints.city.name,
    selectedLocations: state.mapPoints.selectedPoints,
    username: state.security.user.username,
    amountOfCurrentSelected: state.mapPoints.amountOfSelectedLocations
  }
}

export default connect(mapStateToProps, {getAllPointsByCity, setMaxLocationsAmount})(MapInterface)