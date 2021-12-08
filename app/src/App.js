import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { userSet } from './reducers/userReducer'
import Header from './components/Header'
import RouterApp from './RouterApp'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const userToSet = JSON.parse(loggedUserJSON)
      dispatch(userSet(userToSet))
    }
  }, [])

  return (
    <BrowserRouter>
      {user.email
        ? (
          <>
            <Header />
            <RouterApp />
          </>)
        : (
          <Switch>

            <Route path='/login'>
              <LoginForm />
            </Route>

            <Route path='/register'>
              <RegistrationForm />
            </Route>

            <Route path='/'>
              <LoginForm />
            </Route>
          </Switch>
          )}
    </BrowserRouter>
  )
}

export default App
