import React from "react";
import { Container } from "react-bootstrap";
import LoadingModalForLongActions from "../modal/LoadingModalForLongActions";
import MapInterfaceAmountOfPointsSelector from "./MapInterfaceAmountOfPointsSelector";
import MapInterfaceCreatePoll from "./MapInterfaceCreatePoll";
import MapInterfaceDatePicker from "./MapInterfaceDatePicker";
import MapInterfaceFindFittingPoints from "./MapInterfaceFindFittingPoints";
import MapInterfaceInfo from "./MapInterfaceInfo";
import MapInterfaceSelectedCity from "./MapInterfaceSelectedCity";
import MapInterfaceSetSelectedLocations from "./MapInterfaceSetSelectedLocations";

export default function MapInterface() {
  // const checkTheMapErrors = () =>{
  //     if(!errors){
  //       return errors
  //     }
  //     if(errors.)
  // }

  return (
    <div>
      <LoadingModalForLongActions></LoadingModalForLongActions>
      <Container>
        <MapInterfaceInfo></MapInterfaceInfo>
        <MapInterfaceSelectedCity></MapInterfaceSelectedCity>
        <MapInterfaceAmountOfPointsSelector></MapInterfaceAmountOfPointsSelector>
      </Container>
      <Container>
        <MapInterfaceFindFittingPoints></MapInterfaceFindFittingPoints>
        <MapInterfaceCreatePoll></MapInterfaceCreatePoll>
        <MapInterfaceSetSelectedLocations></MapInterfaceSetSelectedLocations>
        <MapInterfaceDatePicker></MapInterfaceDatePicker>
      </Container>
    </div>
  );
}
