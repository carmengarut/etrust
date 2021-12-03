import { useEffect, useState } from 'react'
import { setToken } from '../services/notes'
import { login } from '../services/login'

export const useUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const userLogout = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const userLogin = async ({ username, password }) => {
    const userToSet = await login({
      username,
      password
    })

    window.localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(userToSet)
    )

    setToken(userToSet.token)
    setUser(userToSet)
  }

  return {
    user,
    userLogout,
    userLogin
  }
}
