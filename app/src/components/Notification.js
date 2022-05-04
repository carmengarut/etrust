import React from 'react'
import { useSelector } from 'react-redux'

import '../css/notification.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }

  return (
    <div className='n-container'>
      {notification}
    </div>
  )
}

export default Notification
