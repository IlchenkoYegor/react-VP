import React from 'react'
import RequestAFittingPointsButton from './RequestAFittingPointsButton'
import SendResultsButton from './SendResultsButton'


export default function MapInterface() {
  return (
       <div> 
    <div className='text-center '>Map</div>
    <p className='mb-3'>From here you can point the destination of aid trucks, using the information from polling and start the polling</p>
    <p className='mb-3'>But firstly you have to choose the city where you wish to set the aid centers</p>
        <RequestAFittingPointsButton className='mb-3'>find the most fitting points</RequestAFittingPointsButton>
        <SendResultsButton>send selected locations</SendResultsButton>
    </div>
    
  )
}
