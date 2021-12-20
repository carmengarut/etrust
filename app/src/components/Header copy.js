import { Link, useHistory } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { userLogout } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../public/blue-logo.png'
import '../css/header.css'

export default function Header () {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <Navbar collapseOnSelect expand='lg' sticky='top' className='Header'>
      <Container>
        <Navbar.Brand href='' className='HeaderBrandName' onClick={() => { history.push('/') }}>
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
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link to='/deals' style={{ color: '#FFFFFF' }}>
                Deals
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link to='/users' style={{ color: '#FFFFFF' }}>
                Users
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link to='/profile' style={{ color: '#FFFFFF' }}>
                My Profile
              </Link>
            </Nav.Link>
          </Nav>

          {
              user.email
                ? (

                  <Navbar.Text>
                    Signed in as: {user.name} <a onClick={() => { dispatch(userLogout()) }} variant='link' style={{ color: '#FFFFFF' }} href='#'>Logout</a>
                  </Navbar.Text>

                  )
                : (
                  <>
                    <Nav.Link href='#' as='span'>
                      <Link to='/login' style={{ color: '#FFFFFF' }}>Login</Link>
                    </Nav.Link>
                    <Nav.Link href='#' as='span'>
                      <Link to='/register' style={{ color: '#FFFFFF' }}>Register</Link>
                    </Nav.Link>
                  </>
                  )
            }
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}
