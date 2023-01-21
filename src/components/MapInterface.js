import React, { useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import RequestAFittingPointsButton from './RequestAFittingPointsButton'
import SendResultsButton from './SendResultsButton'


function MapInterface({errors}) {
  const [amount, setAmount] = useState();
  function onSubmitMostFitting(e){
      e.preventDefault();
      console.log("http://localhost:8000/findLocation");
  }

  function onSubmitMostSendSelected(e){
    e.preventDefault();
    console.log("http://localhost:8000/sendPoints");
  }
  
  // const checkTheMapErrors = () =>{
  //     if(!errors){
  //       return errors
  //     }
  //     if(errors.)
  // }

  function onAmountChange(e){
    setAmount(e.target.value);
  }  

  return (
       <div>
       {errors &&<Alert key='warning' variant='warning'>error occured </Alert>} 
    <div className='text-center '>Map</div>
    <p className='mb-3 mt-3 ml-3'>From here you can point the destination of aid trucks, using the information from polling and start the polling</p>
    <p className='mb-3'>But firstly you have to choose the city where you wish to set the aid centers</p>
        <Form onSubmit={onSubmitMostFitting}>
          <button className='btn mb-3'>find the most fitting points</button>
          </Form>
          <Form onSubmit={onSubmitMostSendSelected}>
          <button className='btn mt-3 ml-3'>send selected locations</button>
        </Form>
        <Form>
          <Form.Text>Enter the amount of points which you want to set</Form.Text>
          <Form.Range min={1} max={100} onChange={onAmountChange}></Form.Range>
          <Form.Label className='ctr'>{amount}</Form.Label>
        </Form>
    </div>
    
  )
}

const mapStateToProps = state =>{
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps, null)(MapInterface)