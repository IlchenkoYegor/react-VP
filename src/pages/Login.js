import axios from 'axios';
import React, { useState } from 'react'
import { Button, Tab, Col, Container, Form, FormGroup, Row, FormText, Alert } from 'react-bootstrap'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { loginByCrid } from '../actions/securityActions';
import { isNotEmpty } from '../isNotEmpty';

const HOSTA = "http://localhost:8080";
 
function Login({errors, loginByCrid}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const onSubmit = async (e) =>{
    e.preventDefault();
    const loginForm = {
      username: username,
      password: password  
    }
    loginByCrid(loginForm, navigate);
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
      {isNotEmpty(errors) && <Row><Alert key='warning' variant='warning' >Some error with login occured</Alert></Row>}
          <FormGroup className='mb-3 mt-3' controlId='emailForm'>
            <Form.Label>enter email</Form.Label>
            <Form.Control type='email' placeholder='example@mail.com' className={classNames({"is-invalid":errors.username})} onChange={e => setUsername(e.target.value)}></Form.Control>
            {errors.username && (<div className='invalid-feedback'>{errors.username}</div>)}
          </FormGroup>
          <FormGroup className='mb-3' controlId='passwordForm'>
            <Form.Label>enter password</Form.Label>
            <Form.Control type='password' onChange={e => setPassword(e.target.value)} className={classNames({"is-invalid":errors.password})} placeholder='password'></Form.Control>
            {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
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

const mapStateToProps = (state) => ({
  errors: state.errors 
})

export default connect(mapStateToProps, {loginByCrid}) (Login)