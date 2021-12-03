import React, { useRef, useState } from 'react'
import Toggable from './Toggable'
import Button from 'react-bootstrap/Button'
import { userLogout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

export default function DealForm ({ addDeal }) {
  const [newDeal, setNewDeal] = useState('')
  const toggableRef = useRef()

  const dispatch = useDispatch()

  const handleChange = (event) => {
    setNewDeal(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const dealObject = {
      content: newDeal
    }

    addDeal(dealObject)
    setNewDeal('')
    toggableRef.current.toggleVisibility()
  }

  return (
    <Toggable buttonLabel='New Deal' ref={toggableRef}>
      <h3>Create a new deal</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Write your note content'
          onChange={handleChange}
          value={newDeal}
        />
        <Button type='submit'>
          Save
        </Button>
      </form>
      <Button onClick={() => { dispatch(userLogout()) }}>
        Logout
      </Button>
    </Toggable>
  )
}
