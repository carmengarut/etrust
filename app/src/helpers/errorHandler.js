import { useDispatch } from 'react-redux'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

export default function handleError (e) {
  const dispatch = useDispatch()
  console.error(e.name)
  console.error(e.message)
  dispatch(setNotification(e.name + ': ' + e.message))
  setTimeout(() => {
    dispatch(removeNotification())
  }, 5000)
}
