
import propTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { userLogin } from '../reducers/userReducer'

export default function LoginForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    dispatch(userLogin({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <Form>
      <Form.Group id='username'>
        <Form.Control
          type='text'
          value={username}
          name='Username'
          placeholder='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group id='password'>
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
    </Form>
  )
}

LoginForm.propTypes = {
  username: propTypes.string
}
