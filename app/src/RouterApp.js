import { Route, Switch, Redirect } from 'react-router-dom'
import { DealDetails } from './components/DealDetails'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import DealForm from './components/DealForm'
import RatingForm from './components/RatingForm'
import Deals from './Deals'
import Profile from './Profile'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Users from './Users'
import LandingPage from './LandingPage'

export default function RouterApp () {
  const user = useSelector(state => state.user)
  const deals = useSelector(state => state.deals)

  return (
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

        <Route path='/users'>
          <Users />
        </Route>

        <Route path='/create-deal'>
          <DealForm />
        </Route>

        <Route path='/landing'>
          <LandingPage />
        </Route>

        <Route path='/rate/:id'>
          <RatingForm />
        </Route>

        <Route
          path='/login' render={() => {
            return user.email ? <Redirect to='/' /> : <LoginForm />
          }}
        />

        <Route
          path='/register' render={() => {
            return user.email ? <Redirect to='/' /> : <RegistrationForm />
          }}
        />

        <Route path='/'>
          <Deals />
        </Route>
      </Switch>
    </Container>
  )
}
