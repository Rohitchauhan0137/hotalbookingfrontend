import React, { useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userProfile } from '../redux/slices/users';



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const inputData = { ...loginData, [name]: value }
    setLoginData({ ...inputData })
  }

  const onLogin = async () => {
    if (loginData.email !== "" && loginData.password !== "") {
      try {
        const result = (await axios.post('/api/users/login', loginData)).data
        if (result) {
          dispatch(userProfile(result))
          toast.success('Login successfully', { duration: 2000 })
          localStorage.setItem('userName', JSON.stringify(result.name))
          localStorage.setItem('userId', JSON.stringify(result.userId))
          localStorage.setItem('isAdmin', JSON.stringify(result.isAdmin))
          navigate('/home')
        }
      } catch (error) {
        console.log(error);
        toast.error('Sorry, an unexpected error has occured, please try again', { duration: 2000 })
      }
    } else {
      toast.error("Sory, Email or password is empty!, please try again", { duration: 5000 })
    }
  }

  return (
    <>
      <Card className='register-card'>
        <Card.Body className='register-card-body'>
          <div className='register-heading'>Login</div>
          <div className='form-box'>
            <input name='email' placeholder='Email' value={loginData.email} onChange={onInputChange} />
            <input name='password' placeholder='Password' value={loginData.password} onChange={onInputChange} />
            <Button className='register-cta' onClick={onLogin}>Login</Button>
          </div>
          <div className='login-link'>
            <Link to={`/register`} className='login-link'>
              Click here to register
            </Link>
          </div>
        </Card.Body>
      </Card>
      <Toaster />
    </>
  )
}

export default Login