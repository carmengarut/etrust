import { getAllUsers, inviteUser } from '../services/deals'

const initialState = []

export const usersReducer = (state = initialState, action) => {
  if (action.type === '@users/init') {
    const users = action.payload
    return users
  }

  if (action.type === '@users/add') {
    const user = action.payload
    return [...state, user]
  }

  return state
}

export const usersInit = () => {
  return async (dispatch) => {
    try {
      const users = await getAllUsers()
      dispatch({
        type: '@users/init',
        payload: users
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export const inviteUserNow = (invitationDetails) => {
  return async (dispatch) => {
    const user = await inviteUser(invitationDetails)
    dispatch({
      type: '@users/add',
      payload: user
    })
  }
}
