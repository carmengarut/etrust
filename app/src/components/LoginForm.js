
import propTypes from 'prop-types'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { userLogin } from '../reducers/userReducer'
import Notification from './Notification'
import { useHistory } from 'react-router-dom'

export default function LoginForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = (event) => {
    dispatch(userLogin({ email, password }))
    setEmail('')
    setPassword('')
  }

  return (
    <Container>
      <br />
      <h2>Login</h2>
      <Notification />
      <Form>
        <Form.Group id='email' className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            name='Email'
            placeholder='Email'
            onChange={({ target }) => setEmail(target.value)}
          />
        </Form.Group>
        <Form.Group id='password' className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button onClick={handleLogin} id='form-login-button'>
          Login
        </Button>
        {' '}{' '}Don't have an account? <a onClick={() => history.push('/register')} href='#'>Sign up</a>
      </Form>
    </Container>
  )
}

LoginForm.propTypes = {
  email: propTypes.string
}
