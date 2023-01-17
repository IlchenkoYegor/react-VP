import React, {useState} from 'react'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'


export default function Register() {

  
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  function validated(){
    return emailValid && usernameValid && passwordValid;
  }

  const onSubmit = async e =>{
    e.preventDefault();
    const register = {
      email: email,
      username: username,
      password: password,
      confirmedPassword: confirmPassword
    } 
    console.log(register);
  }

  function validateAndSetPassword(e){
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    setPasswordValid( regularExpression.test(e));
    setPassword(e);
  }

  function validateAndSetEmail(e){
    //var regularExpression = /^[a-zA-Z0-9]{2,}(?=.[@])[a-z]{2,9}({1,3}=.*[.])}$/;    
    //TODO: Realize the regex mechanism to validate email
    
    setEmailValid(true);
    setEmail(e);
  }

  function validateAndSetUsername(e){
    //TODO: Realize the regex mechanism to validate username
    var regularExpression = /^[a-zA-z]+[a-zA-Z0-9]{6,16}$/;
    setUsernameValid(regularExpression.test(e));
    setPassword(e);
  }

  return (
    <Container>
    <Row>
      <h1 className='text-center mt-4'>Register!</h1>
    </Row>
    <Row>
    <Col></Col>
    <Col xs='8'>
    <Form onSubmit={onSubmit}>
    <FormGroup className='mb-3 mt-3'>
      <Form.Label>Email</Form.Label>
      <Form.Control type='email' onChange={e => validateAndSetEmail(e.target.value)} ></Form.Control>
      <Form.Text style={!emailValid?{color:'red'}:{color:'black'}}>enter your email</Form.Text>
      </FormGroup>
    
    <FormGroup className='mb-3'>
      <Form.Label>Login</Form.Label>
      <Form.Control type='text' onChange={e => validateAndSetUsername(e.target.value)}></Form.Control>
      <Form.Text style={!usernameValid?{color:'red'}:{color:'black'}}>enter your username</Form.Text>
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
    <Button type='submit' disabled={!validated()}> Submit </Button>
    </Form>
    </Col>
    <Col>
    </Col>
    </Row>
    </Container>
    
  )
}
