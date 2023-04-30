import React from "react";
import { Card } from "react-bootstrap";

export default function MapInterfaceInfo() {
  return (
    <Card className="bg-info bg-opacity-75 mb-3">
      <Card.Header className="text-bg-primary fs-3">Why?</Card.Header>
      <Card.Body>
        <p className="mb-3 mt-3 ml-3 text-bg-info">
          From here you can point the destination of aid trucks, using the
          information from polling and start the polling
        </p>
      </Card.Body>
    </Card>
  );
}
