import propTypes from 'prop-types'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { userRegister } from '../reducers/userReducer'
import Notification from './Notification'

export default function RegistrationForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const handleRegister = async () => {
    try {
      dispatch(userRegister({ username, name, password }))
      setUsername('')
      setPassword('')
      setName('')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Container>
      <Notification />
      <Form>
        <Form.Group id='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={name}
            name='Name'
            placeholder='Name'
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Group>
        <Form.Group id='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group id='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button onClick={handleRegister} id='form-login-button'>
          Register
        </Button>
      </Form>
    </Container>
  )
}

RegistrationForm.propTypes = {
  username: propTypes.string
}
