import propTypes from 'prop-types'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { userRegister } from '../reducers/userReducer'
import Notification from './Notification'
import CropImageModal from './CropImageModal'

export default function RegistrationForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [profileImg, setProfileImg] = useState(null)

  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const handleClick = ({ target }) => {
    setShow(true)
  }

  const handleRegister = async () => {
    // const formData = new FormData()
    // formData.append('email', email)
    // formData.append('name', name)
    // formData.append('surname', surname)
    // formData.append('password', password)
    // formData.append('profileImg', profileImg)

    try {
      dispatch(userRegister({ email, password, name, surname, profileImg }))
      setEmail('')
      setPassword('')
      setName('')
      setSurname('')
      setProfileImg('')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Container>
      <br />
      <h2>Register</h2>
      <Notification />
      <Form>
        <Form.Group id='name' className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={name}
            name='Name'
            placeholder='Name'
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Group>
        <Form.Group id='surname' className='mb-3'>
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type='text'
            value={surname}
            name='Surname'
            placeholder='Surname'
            onChange={({ target }) => setSurname(target.value)}
          />
        </Form.Group>
        <Form.Group id='email' className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
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
        <Form.Group id='profileImg' className='mb-3'>
          <Form.Label>Profile image</Form.Label>
          <br />
          {profileImg
            ? (
              <>
                <img src={profileImg} />
                <Button onClick={handleClick} variant='light'>
                  Cambiar imagen
                </Button>
              </>
              )
            : (
              <Button onClick={handleClick} variant='light'>
                Subir imagen
              </Button>
              )}
        </Form.Group>
        <br />
        <Button onClick={handleRegister} id='form-login-button'>
          Register
        </Button>
      </Form>

      <CropImageModal show={show} setShow={setShow} setProfileImg={setProfileImg} />

    </Container>
  )
}

RegistrationForm.propTypes = {
  email: propTypes.string
}
