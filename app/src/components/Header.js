import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { userLogout } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

export default function Header () {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  return (
    <Navbar sticky='top' bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>
          eTrust
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav>
          <Nav.Link href='#' as='span'>
            <Link to='/' style={{ color: '#FFFFFF' }}>
              Home
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/deals' style={{ color: '#FFFFFF' }}>
              Deals
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/profile' style={{ color: '#FFFFFF' }}>
              My Profile
            </Link>
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className='justify-content-end'>
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
