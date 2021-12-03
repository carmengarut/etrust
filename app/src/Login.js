
import LoginForm from './components/LoginForm'

import { useSelector } from 'react-redux'

export default function Login () {
  const user = useSelector(state => state.user)

  if (user.name) {
    return <p>User is logged</p>
  }

  return (
    <LoginForm />
  )
}
