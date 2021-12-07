import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { addNewDeal } from '../reducers/dealReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function DealForm () {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()

    const dealObject = {
      title,
      content,
      memberEmail: email
    }

    dispatch(addNewDeal(dealObject))
    setTitle('')
    setContent('')
    setEmail('')
    history.push('/deals')
  }

  return (
    <Container>
      <h3>Create a new deal</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Introduce the title of your deal'
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Introduce the content of your deal'
            onChange={({ target }) => setContent(target.value)}
            value={content}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Invite member to sign the deal</Form.Label>
          <Form.Control
            type='email'
            placeholder='Introduce the email of the member'
            onChange={({ target }) => setEmail(target.value)}
            value={email}
          />
        </Form.Group>
        <Button type='submit'>
          Save
        </Button>
      </Form>
    </Container>
  )
}
