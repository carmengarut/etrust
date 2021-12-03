import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { NoteDetail } from './components/NoteDetail'
import Login from './Login'
import Notes from './Notes'
import { useUser } from './hooks/useUser'
import useNotes from './hooks/useNotes'
// import { Container, AppBar, IconButton, Toolbar } from '@material-ui/core'
import { StyledLink } from './components/StyledLink'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

// const LinkButton = (props) => <Button color='inherit' component={Link} {...props} />

const App = () => {
  const { user } = useUser()
  const { notes } = useNotes()

  return (
    <BrowserRouter>
      <header>
        <StyledLink to='/'>
          Home
        </StyledLink>
        <StyledLink to='/notes'>
          Notes
        </StyledLink>
        <StyledLink to='/users'>
          Users
        </StyledLink>
        {
          user
            ? <em>Logged as {user.name}</em>
            : <StyledLink variant='bold' to='/login'>Login</StyledLink>
        }
      </header>

      <Switch>
        <Route path='/notes/:id'>
          <NoteDetail notes={notes} />
        </Route>

        <Route path='/users'>
          <Users />
        </Route>

        <Route path='/notes'>
          <Notes />
        </Route>

        <Route
          path='/login' render={() => {
            return user ? <Redirect to='/' /> : <Login />
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
