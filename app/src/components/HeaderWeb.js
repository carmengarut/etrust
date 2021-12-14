import { useHistory } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
import '../css/headerWeb.css'
import logo from '../public/blue-logo.png'

export default function HeaderWeb () {
  const history = useHistory()

  return (
    <Navbar collapseOnSelect expand='lg' sticky='top' className='Navbar'>
      <Container>
        <Navbar.Brand href='/' className='BrandName'>
          <img
            alt=''
            src={logo}
            width='45'
            height='45'
            className='d-inline-block align-center'
          />{' '}
          eTrust
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <button className='SignUpButton' onClick={() => history.push('/register')}>
            Sign Up
          </button>
          <button className='SignInButton' onClick={() => history.push('/login')}>
            Sign In
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
