import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { userLogout } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../public/white-logo-grande.png'

export default function Header () {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  return (
    <Navbar collapseOnSelect expand='lg' sticky='top' bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>
          <img
            alt=''
            src={logo}
            width='30'
            height='30'
            className='d-inline-block align-top'
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
