import React, { useState } from 'react'
import propTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import { Button } from '@material-ui/core'

const useField = ({ type }) => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export default function LoginForm (props) {
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })
  return (
    <Form onSubmit={props.handleLogin}>
      <Form.Group id='username'>
        <Form.Control
          {... username}
          name='Username'
          placeholder='Username'
        />
      </Form.Group>
      <Form.Group id='password'>
        <Form.Control
          {... password}
          name='Password'
          placeholder='Password'
        />
      </Form.Group>
      <Button color='primary' variant='outlined' id='form-login-button'>
        Login
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  username: propTypes.string
}
