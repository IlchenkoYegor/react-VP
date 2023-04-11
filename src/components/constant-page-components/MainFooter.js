import React from "react";
import { Container } from "react-bootstrap";

export default function MainFooter() {
  return (
    <div className="text-bg-dark row" style={{ height: "17em" }}>
      <Container className="col-6 text-center align-self-end mb-3">
        <hr></hr>
        <div>© Created by Yehor Ilchenko</div>
        <div> All rights reserved</div>
      </Container>
    </div>
  );
}
