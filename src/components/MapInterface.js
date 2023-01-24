import React, { useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux';
import { isNotEmpty } from '../isNotEmpty';
import RequestAFittingPointsButton from './RequestAFittingPointsButton'
import SendResultsButton from './SendResultsButton'
import { setMaxLocationsAmount } from '../actions/mapActions';
import { getAllPointsByCity } from '../actions/getPointsFromServerActions';
import ModalComponent from './ModalComponent';

function MapInterface({errors, maxAmountOfPoints, setMaxLocationsAmount}) {

  function onSubmitMostFitting(e){
      e.preventDefault();
  }

  function onSubmitMostSendSelected(e){
    e.preventDefault();
    
  }
  
  // const checkTheMapErrors = () =>{
  //     if(!errors){
  //       return errors
  //     }
  //     if(errors.)
  // }

  function onAmountChange(e){
    setMaxLocationsAmount(Number(e.target.value));
  }  

  return (
       <div>
       {isNotEmpty(errors) && <ModalComponent error={errors}></ModalComponent>}
       {isNotEmpty(errors) &&<Alert key='warning' variant='warning'>error occured </Alert>} 
    <div className='text-center '>Map</div>
    <p className='mb-3 mt-3 ml-3'>From here you can point the destination of aid trucks, using the information from polling and start the polling</p>
    <p className='mb-3'>But firstly you have to choose the city where you wish to set the aid centers</p>
        <Form onSubmit={onSubmitMostFitting}>
          <button className='btn mb-3'>find the most fitting points</button>
          </Form>
          <Form onSubmit={e=>{}}>
          <button className='btn mt-3 ml-3'>send selected locations</button>
        </Form>
        <Form>
          <Form.Text>Enter the amount of points which you want to set</Form.Text>
          <Form.Range min={1} max={100} onChange={onAmountChange}></Form.Range>
          <Form.Label>{maxAmountOfPoints}</Form.Label>
        </Form>
    </div>
    
  )
}

const mapStateToProps = state =>{
  return {
    errors: state.errors,
    maxAmountOfPoints: state.mapPoints.maxAvailablePoints
  }
}

export default connect(mapStateToProps, {getAllPointsByCity, setMaxLocationsAmount})(MapInterface)