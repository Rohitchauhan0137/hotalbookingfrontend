import React, { useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { BsCheckCircle } from "react-icons/bs";
import './Register.css'

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [show, setShow] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const inputData = { ...registerData, [name]: value }
    setRegisterData({ ...inputData })
  }

  const onRegister = async () => {
    if (registerData.password === registerData.confirmPassword) {
      try {
        const result = (await axios.post('/api/users/register', registerData)).data
        if(result) {
          setShow(true)
        }
      } catch (error) {
        console.log(error);
        setShow(false)
      }
    }
  }

  const onContinue = () => {
    setShow(false)
    navigate("/login")
  }

  return (
    <>
      <Card className='register-card'>
        <Card.Body className='register-card-body'>
          <div className='register-heading'>Register</div>
          <div className='form-box'>
            <input name='name' placeholder='Name' value={registerData.name} onChange={onInputChange} />
            <input name='email' placeholder='Email' value={registerData.email} onChange={onInputChange} />
            <input name='password' placeholder='Password' type='password' value={registerData.password} onChange={onInputChange} />
            <input name='confirmPassword' placeholder='Confirm Password' type='password' value={registerData.confirmPassword} onChange={onInputChange} />
            <Button className='register-cta' onClick={onRegister}>Register</Button>
          </div>
          <div className='login-link'>
            <Link to={`/login`} className='login-link'>
              Click here to login
            </Link>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} className='register-modal'>
        <Modal.Header className='register-modal-header'>
          <Modal.Title className='register-modal-title'>
            <BsCheckCircle className='success-icon' />
            <p>{'REGISTRATION SUCCESS'}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className='modal-body-desc'>{"Congratulations, your account has been successfully created."}</p>
          </div>
        </Modal.Body>
        <Modal.Footer className='register-modal-footer'>
          <Button variant="dark" onClick={onContinue}>
            CONTINUE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Register