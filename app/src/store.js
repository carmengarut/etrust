
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/userReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { dealReducer } from './reducers/dealReducer'
import { ratingReducer } from './reducers/ratingReducer'

const reducer = combineReducers({
  deals: dealReducer,
  notification: notificationReducer,
  user: userReducer,
  ratings: ratingReducer
  // users: usersReducer
})

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
