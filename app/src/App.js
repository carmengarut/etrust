import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import { DealDetails } from './components/DealDetails'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import DealForm from './components/DealForm'
import Deals from './Deals'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { userSet, userLogout } from './reducers/userReducer'
import { Navbar, Container, Nav } from 'react-bootstrap'

const Home = () => <h1>Home Page</h1>
const Profile = () => <h1>Profile</h1>

const App = () => {
  const user = useSelector(state => state.user)
  const deals = useSelector(state => state.deals)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const userToSet = JSON.parse(loggedUserJSON)
      dispatch(userSet(userToSet))
    }
  }, [])

  return (

    <BrowserRouter>
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
              user.username
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
      <Container>
        <br />
        <Switch>
          <Route path='/deals/:id'>
            <DealDetails deals={deals} />
          </Route>

          <Route path='/profile'>
            <Profile />
          </Route>

          <Route path='/deals'>
            <Deals />
          </Route>

          <Route path='/create-deal'>
            <DealForm />
          </Route>

          <Route
            path='/login' render={() => {
              return user.username ? <Redirect to='/' /> : <LoginForm />
            }}
          />

          <Route
            path='/register' render={() => {
              return user.username ? <Redirect to='/' /> : <RegistrationForm />
            }}
          />

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
