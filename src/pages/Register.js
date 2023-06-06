import classNames from "classnames";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../actions/securityActions";
import { isNotEmpty } from "../isNotEmpty";

function Register({ errors, createNewUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [secondName, setSecondName] = useState("");
  const [secondNameValid, setSecondNameValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  function validated() {
    return emailValid && firstNameValid && secondNameValid && passwordValid;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const register = {
      username: email,
      firstName: firstName,
      secondName: secondName,
      password: password,
      repeatPassword: confirmPassword,
    };
    createNewUser(register, navigate);
  };

  function validateAndSetPassword(e) {
    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    setPasswordValid(regularExpression.test(e));
    setPassword(e);
  }

  function validateAndSetEmail(e) {
    var regularExpression =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //TODO: Realize the regex mechanism to validate email
    if (regularExpression.test(e.toLowerCase())) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setEmail(e);
  }

  function validateAndSetFirstName(e) {
    //TODO: Realize the regex mechanism to validate username
    var regularExpression = /^[a-zA-z]{3,16}$/;
    setFirstNameValid(regularExpression.test(e));
    setFirstName(e);
  }

  function validateAndSetSecondName(e) {
    //TODO: Realize the regex mechanism to validate username
    var regularExpression = /^[a-zA-z]{3,16}$/;
    setSecondNameValid(regularExpression.test(e));
    setSecondName(e);
  }

  return (
    <Container>
      <Card className="pb-3 mt-3 mb-3">
        <Card.Header className="text-bg-primary">
          <Row>
            <p className="text-center display-3">Register!</p>
          </Row>
        </Card.Header>
        <Card.Body>
          {isNotEmpty(errors) && (
            <Row>
              <Alert key="warning" variant="warning">
                Some error with registration occured
              </Alert>
            </Row>
          )}
          <Row>
            <Col></Col>
            <Col>
              <Form onSubmit={onSubmit}>
                <FormGroup className="mb-3 mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => validateAndSetEmail(e.target.value)}
                    className={classNames({ "is-invalid": errors.username })}
                  ></Form.Control>
                  <Form.Text
                    style={!emailValid ? { color: "red" } : { color: "black" }}
                  >
                    enter your email
                  </Form.Text>
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </FormGroup>

                <FormGroup className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    className={classNames({ "is-invalid": errors.firstName })}
                    onChange={(e) => validateAndSetFirstName(e.target.value)}
                  ></Form.Control>
                  <Form.Text
                    style={
                      !firstNameValid ? { color: "red" } : { color: "black" }
                    }
                  >
                    enter your firstname
                  </Form.Text>
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Second Name</Form.Label>
                  <Form.Control
                    type="text"
                    className={classNames({
                      "is-invalid": errors.secondName,
                    })}
                    onChange={(e) => validateAndSetSecondName(e.target.value)}
                  ></Form.Control>
                  {errors.secondName && (
                    <div className="invalid-feedback">{errors.secondName}</div>
                  )}
                  <Form.Text
                    style={
                      !secondNameValid ? { color: "red" } : { color: "black" }
                    }
                  >
                    enter your secondname
                  </Form.Text>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className={classNames({ "is-invalid": errors.password })}
                    onChange={(e) => validateAndSetPassword(e.target.value)}
                  ></Form.Control>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                  <Form.Text
                    style={
                      !passwordValid ? { color: "red" } : { color: "black" }
                    }
                  >
                    enter your password, consider the fact that it should
                    consist of at least 8 letters, 1 character, 1 digit{" "}
                  </Form.Text>
                </FormGroup>

                <FormGroup className="mb-3">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    className={classNames({
                      "is-invalid": errors.repeatPassword,
                    })}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                  {errors.repeatPassword && (
                    <div className="invalid-feedback">
                      {errors.repeatPassword}
                    </div>
                  )}
                  <Form.Text>confirm your password, enter it again</Form.Text>
                </FormGroup>
                <Button type="submit" disabled={!validated()}>
                  {" "}
                  Submit{" "}
                </Button>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createNewUser })(Register);
