import React, { useState } from 'react'
import { Alert, Container, Form, FormGroup, Spinner } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux';
import { isNotEmpty } from '../isNotEmpty';
import RequestAFittingPointsButton from './RequestAFittingPointsButton'
import SendResultsButton from './SendResultsButton'
import { createPoll, getBestFittingPoints, pushTheResult, setMaxLocationsAmount } from '../actions/mapActions';
import { getAllPointsByCity } from '../actions/getPointsFromServerActions';
import ModalComponent from './ModalComponent';
import { useCallback } from 'react';
import classNames from 'classnames';
import { Timer } from './Timer';

function MapInterface({errors, maxAmountOfPoints, setMaxLocationsAmount,cityName, selectedLocations, username, amountOfCurrentSelected}) {

  const [selectedMax, setSelectedMax] = React.useState(0);

  const dispatch = useDispatch();

  const onSubmitCreatePollCbk = useCallback( function onSubmitCreatePoll(e){
    e.preventDefault();
    dispatch(createPoll(cityName, null));
  },[cityName])

  const onSubmitMostFittingCbk = useCallback( function onSubmitMostFitting(e){
      e.preventDefault();
      dispatch(getBestFittingPoints(maxAmountOfPoints, cityName));
  },[cityName, maxAmountOfPoints])

  const onSubmitPushResultCbk = useCallback( function onSubmitPushTheResult(e){
    e.preventDefault();
    if(maxAmountOfPoints>selectedLocations){
      return;
    }
    dispatch(pushTheResult(selectedLocations,username,cityName,maxAmountOfPoints,null));
  },[selectedLocations,username,cityName,maxAmountOfPoints]
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

    
    <Container>
    <h3 className='text-center '>Map</h3>
    <p className='mb-3 mt-3 ml-3'>From here you can point the destination of aid trucks, using the information from polling and start the polling</p>
    <p className='mb-3'>But firstly you have to choose the city where you wish to set the aid centers</p>
    </Container>
    <Container>
    
    
        <Form onSubmit={onSubmitMostFittingCbk}>
        <FormGroup>
          <button className={classNames('btn mt-3 ml-3 ',{"btn-danger":errors.amountError})}>find the most fitting points</button>
          { errors.amountError && (<div className='text-danger'><small>{errors.amountError}</small></div>)}
          </FormGroup>
          </Form>
          
          <Form onSubmit={onSubmitCreatePollCbk}>
          <FormGroup>
          <button disabled={errors.pollingTimeout} className={classNames('btn mt-3 ml-3 ',{"btn-danger":errors.cityError || errors.telegramError})}>
          { errors.pollingTimeout ?
            <div>
              <Timer lastTime={errors.pollingTimeout}/>
              <Spinner></Spinner>
            </div> : 
            <div>create poll</div> }
          </button>
          {(errors.cityError || errors.telegramError) && (<div className='text-danger'><small>{errors.cityError} {errors.telegramError}</small></div>)}
          </FormGroup>
          </Form>
          
          <Form onSubmit={onSubmitPushResultCbk}>
          <FormGroup>
          <button disabled={errors.sendLocationTimeout} className={classNames(['btn mt-3 ml-3 ',{"btn-danger":errors.cityError || errors.telegramError}])}>
              { 
              errors.sendLocationTimeout ?<div><Timer lastTime={errors.sendLocationTimeout}/>
              <Spinner></Spinner></div> 
              : <div>send selected locations</div>
            }
           </button>
          {(errors.cityError || errors.telegramError) && (<div className='text-danger'><small>{errors.cityError} {errors.telegramError}</small></div>)}
        </FormGroup></Form>
        
      </Container>
      <Container>
        <Form>
        <Form.Group>
          <Form.Text>Enter the amount of points which you want to set</Form.Text>
          {/*   */}
          <Form.Range min={1} max={100} onChange={onAmountChange} onClick={onAmountClick}></Form.Range>
          <Form.Label >{selectedMax}</Form.Label>
          </Form.Group>
          <Container className={classNames({"text-danger":errors.amountError})}><p>current max amount {maxAmountOfPoints}</p></Container>
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