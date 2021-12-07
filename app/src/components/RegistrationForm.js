import propTypes from 'prop-types'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { userRegister } from '../reducers/userReducer'
import Notification from './Notification'

export default function RegistrationForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')

  const dispatch = useDispatch()

  const handleRegister = async () => {
    try {
      dispatch(userRegister({ email, name, password }))
      setEmail('')
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
        <Form.Group id='surname'>
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type='text'
            value={surname}
            name='Surname'
            placeholder='Surname'
            onChange={({ target }) => setSurname(target.value)}
          />
        </Form.Group>
        <Form.Group id='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            value={email}
            name='Email'
            placeholder='Email'
            onChange={({ target }) => setEmail(target.value)}
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
  email: propTypes.string
}
