import React, { useState } from 'react'
import { Button, Tab, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const onSubmit = async (e) =>{
    e.preventDefault();
    const loginForm = {
      username: username,
      password: password  
    }
    console.log(loginForm);
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
