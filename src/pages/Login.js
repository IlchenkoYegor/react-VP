import axios from 'axios';
import React, { useState } from 'react'
import { Button, Tab, Col, Container, Form, FormGroup, Row, FormText } from 'react-bootstrap'

const HOSTA = "http://localhost:8080";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(true);
  const onSubmit = async (e) =>{
    e.preventDefault();
    const loginForm = {
      username: username,
      password: password  
    }
    const options = {
      headers:{
        "Content-Type": "application/json"
      }
    }
    let response = {
      success: false,
      token: null
    }
    let result = axios.post(HOSTA+"/api/user/login", loginForm, options);
    response = result.then(e => e.data).catch(e=> console.log("error occured" + e))
    if(!response.success){
       setSuccess(false);
    }else{
       setSuccess(true);
    }
  }

  return (
    <Container>
    <Row className='mt-4'>
      <Col></Col>
      <Col className='text-center'>
        <h1 >
            Login!
        </h1>
        </Col>
      <Col>
      </Col>
    </Row>
    <Row>
    <Col></Col>
    <Col>
      <Form onSubmit={onSubmit}>
          <FormGroup className='mb-3 mt-3' controlId='emailForm'>
            <Form.Label>enter email</Form.Label>
            <Form.Control type='email' placeholder='example@mail.com' onChange={e => setUsername(e.target.value)}></Form.Control>
          </FormGroup>
          <FormGroup className='mb-3' controlId='passwordForm'>
            <Form.Label>enter password</Form.Label>
            <Form.Control type='password' onChange={e => setPassword(e.target.value)} placeholder='password'></Form.Control>
          </FormGroup>

          <FormText hidden={success} className="alert alert-danger">
            some trouble with login occured
          </FormText>
          <Button type='submit' >login</Button>
      </Form>
      </Col>    
      <Col>
      </Col>
      </Row>
      <Row></Row>  
    </Container>
  )
}
