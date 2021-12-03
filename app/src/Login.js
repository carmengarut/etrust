import { useState } from 'react'
import { setToken } from './services/notes'
import { login } from './services/login'
import LoginForm from './components/LoginForm'
import { useHistory } from 'react-router-dom'

export default function Login () {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userToSet = await login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(userToSet)
      )

      setToken(userToSet.token)

      setUser(userToSet)
      setUsername('')
      setPassword('')

      history.push('/notes')
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>
  }

  if (user) {
    return <p>User is logged</p>
  }

  return (
    <LoginForm
      username={username}
      password={password}
      handleLogin={handleLogin}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    />
  )
}
