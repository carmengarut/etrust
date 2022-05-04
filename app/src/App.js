import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ReactGA from 'react-ga'

import { userSet } from './reducers/userReducer'
import Header from './components/Header'
import RouterApp from './RouterApp'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import LandingPage from './LandingPage'
import HeaderWeb from './components/HeaderWeb'
import { dealInit } from './reducers/dealReducer'
import { ratingInit } from './reducers/ratingReducer'
import { usersInit } from './reducers/usersReducers'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const userToSet = JSON.parse(loggedUserJSON)
      dispatch(userSet(userToSet))
    }

    dispatch(dealInit())
    dispatch(ratingInit())
    dispatch(usersInit())
    ReactGA.initialize('G-LC9XYJTPPD')
  }, [])

  return (
    <BrowserRouter>
      {user.email
        ? (
          <>
            <Header />
            <Notification />
            <RouterApp />
          </>)
        : (
          <>
            <HeaderWeb />
            <Switch>

              <Route path='/login'>
                <LoginForm />
              </Route>

              <Route path='/register'>
                <RegistrationForm />
              </Route>

              <Route path='/landing'>
                <LandingPage />
              </Route>

              <Route path='/terms-and-conditions'>
                <TermsAndConditions />
              </Route>

              <Route path='/privacy-policy'>
                <PrivacyPolicy />
              </Route>

              <Route path='/'>
                <LandingPage />
              </Route>
            </Switch>
          </>
          )}
    </BrowserRouter>
  )
}

export default App
