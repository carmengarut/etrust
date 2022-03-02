import { Route, Switch, Redirect } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import RatingForm from './components/RatingForm'
import Deals from './Deals'
import Profile from './Profile'
import { useSelector } from 'react-redux'
import Users from './Users'
import LandingPage from './LandingPage'
import CreateContract from './pages/CreateContract'
import ContractDetails from './pages/ContractDetails'

export default function RouterApp () {
  const user = useSelector(state => state.user)

  return (

    <Switch>
      <Route path='/deals/:id'>
        <ContractDetails />
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
        <CreateContract />
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
  )
}
