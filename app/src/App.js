import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { DealDetails } from './components/DealDetails'
import Login from './Login'
import Deals from './Deals'
import useDeals from './hooks/useDeals'
// import { Container, AppBar, IconButton, Toolbar } from '@material-ui/core'
import { StyledLink } from './components/StyledLink'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { userSet } from './reducers/userReducer'

const Home = () => <h1>Home Page</h1>
const Users = () => <h1>Users</h1>

// const LinkButton = (props) => <Button color='inherit' component={Link} {...props} />

const App = () => {
  const user = useSelector(state => state.user)
  const { deals } = useDeals()

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
      <header>
        <StyledLink to='/'>
          Home
        </StyledLink>
        <StyledLink to='/deals'>
          Deals
        </StyledLink>
        <StyledLink to='/users'>
          Users
        </StyledLink>{console.log(user)}
        {
          user.username
            ? <em>Logged as {user.name}</em>
            : <StyledLink variant='bold' to='/login'>Login</StyledLink>
        }
      </header>

      <Switch>
        <Route path='/deals/:id'>
          <DealDetails deals={deals} />
        </Route>

        <Route path='/users'>
          <Users />
        </Route>

        <Route path='/deals'>
          <Deals />
        </Route>

        <Route
          path='/login' render={() => {
            return user.username ? <Redirect to='/' /> : <Login />
          }}
        />

        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
