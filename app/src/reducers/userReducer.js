import { login } from '../services/login'
import { setToken } from '../services/deals'
import { setNotification, removeNotification } from './notificationReducer'
const initialState = {}

export const userReducer = (state = initialState, action) => {
  if (action.type === '@users/login') {
    const user = action.payload
    return user
  }

  if (action.type === '@users/logout') {
    return {}
  }

  return state
}

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const userToSet = await login(credentials)
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(userToSet)
      )
      setToken(userToSet.token)
      dispatch({
        type: '@users/login',
        payload: userToSet
      })
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      dispatch(setNotification('Wrong credentials'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }
}

export const userSet = (userToSet) => {
  setToken(userToSet.token)
  return {
    type: '@users/login',
    payload: userToSet
  }
}

export const userLogout = () => {
  setToken(null)
  window.localStorage.removeItem('loggedNoteAppUser')
  return {
    type: '@users/logout'
  }
}
