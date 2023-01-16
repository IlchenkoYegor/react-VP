import React, {useState} from 'react'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'


export default function Register() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [username, setUsername] = useState("");
  const [validUsername, setUsernameValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  function validateAndSetPassword(e){
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    setPasswordValid( regularExpression.test(e));
  }
  return (
    <Container>
    <Row>
      <h1 className='text-center mt-4'>Register!</h1>
    </Row>
    <Row>
    <Col></Col>
    <Col xs='8'>
    <Form>
    <FormGroup className='mb-3 mt-3'>
      <Form.Label>Email</Form.Label>
      <Form.Control type='email' ></Form.Control>
      <Form.Text>enter your email</Form.Text>
      </FormGroup>
    
    <FormGroup className='mb-3'>
      <Form.Label>Login</Form.Label>
      <Form.Control type='text' ></Form.Control>
      <Form.Text>enter your username</Form.Text>
    </FormGroup>
    <FormGroup className='mb-3'>
    <Form.Label>Password</Form.Label>
      <Form.Control type='password' onChange={e => validateAndSetPassword(e.target.value)}></Form.Control>
      <Form.Text style={!passwordValid?{color:'red'}:{color:'black'}}>enter your password, consider the fact that it should consist of at least 8 letters, 1 character, 1 digit </Form.Text>
    </FormGroup>

    <FormGroup className='mb-3'>
    <Form.Label>Confirm password</Form.Label>
      <Form.Control type='password' ></Form.Control>
      <Form.Text>confirm your password, enter it again</Form.Text>
    </FormGroup>
    <Button type='submit'> Submit </Button>
    </Form>
    </Col>
    <Col>
    </Col>
    </Row>
    </Container>
    
  )
}
