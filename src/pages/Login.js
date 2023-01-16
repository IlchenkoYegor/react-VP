import React from 'react'
import { Button, Tab, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'

export default function Login() {
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
      <Form>
          <FormGroup className='mb-3 mt-3' controlId='emailForm'>
            <Form.Label>enter email</Form.Label>
            <Form.Control type='email' placeholder='example@mail.com'></Form.Control>
          </FormGroup>
          <FormGroup className='mb-3' controlId='emailForm'>
            <Form.Label>enter password</Form.Label>
            <Form.Control type='password' controlId='passwordForm' placeholder='password'></Form.Control>
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
