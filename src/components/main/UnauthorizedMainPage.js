import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UnauthorizedMainPage() {
  const [loading, setLoading] = useState(true);
  const isLoaded = () => {
    setLoading(false);
  };
  return (
    <div className="bg-info bg-gradient page-height">
      <Card className="text-center text-bg-info">
        <Row>
          <Card.Header className="text-bg-primary">
            <p className="p-4 text-center display-4">Welcome to Myhac</p>
          </Card.Header>
        </Row>
        <Row>
          <Col className="col-md-5">
            <Card.Img
              // eslint-disable-next-line no-undef
              src={`${process.env.PUBLIC_URL}/assets/delivery-truck-goods-publicdomainvectors.org.svg`}
              alt="logo"
              style={{ display: loading ? "none" : "inherit" }}
              onLoad={isLoaded}
            ></Card.Img>
            <div
              style={{ display: loading ? "block" : "none", height: "50em" }}
            >
              <Skeleton
                variant="rectangular"
                style={{ height: "100%" }}
              ></Skeleton>
            </div>
          </Col>
          <Col className="my-auto">
            <Card.Text>
              <div className="col text-center display-6">
                it is so important to be aware of adding a new functionality on
                this web site, so login to be connected
              </div>
            </Card.Text>
            <Card.Body>
              <div className="row"></div>
              <div className="row">
                <div className="col text-end">
                  <Button
                    as={Link}
                    className="w-50 fs-2 fw-light"
                    to="/register"
                  >
                    {" "}
                    sign up!
                  </Button>
                </div>
                <div className="col text-start">
                  <Button as={Link} className="w-50 fs-2 fw-light" to="/login">
                    login!
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
