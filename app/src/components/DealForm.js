import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { addNewDeal } from '../reducers/dealReducer'
import { useDispatch } from 'react-redux'

export default function DealForm () {
  const [newDeal, setNewDeal] = useState('')

  const dispatch = useDispatch()

  const handleChange = (event) => {
    setNewDeal(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const dealObject = {
      content: newDeal
    }

    dispatch(addNewDeal(dealObject))
    setNewDeal('')
  }

  return (
    <Container>
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
    </Container>
  )
}
