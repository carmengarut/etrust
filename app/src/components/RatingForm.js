import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
// import { addNewDeal } from '../reducers/dealReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addNewRating } from '../reducers/dealReducer'

const RatingForm = () => {
  const [fulfilled, setFulfilled] = useState('')
  const [content, setContent] = useState('')
  const [recipient, setRecipient] = useState('')

  const { id } = useParams()
  const deals = useSelector(state => state.deals)

  const deal = deals.find(deal => deal.id === id)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()

    const ratingObject = {
      fulfilled,
      content,
      recipientId: recipient
    }

    dispatch(addNewRating(id, ratingObject))
    setFulfilled('')
    setContent('')
    setRecipient('')
    history.push(`/deals/${id}`)
  }

  return (
    <Container>
      <h3>Rate deal</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>User to rate</Form.Label>
          <Form.Select
            onChange={({ target }) => setRecipient(target.value)}
            value={recipient}
          >
            <option>-</option>
            {deal.members.map(member => <option key={member.id} value={member.id}>{member.email}</option>)}

          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Did the user fulfill the contract?</Form.Label>
          <Form.Select
            onChange={({ target }) => setFulfilled(target.value)}
            value={fulfilled}
          >
            <option>-</option>
            <option value='True'>Yes</option>
            <option value='False'>No</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Describe your rating'
            onChange={({ target }) => setContent(target.value)}
            value={content}
          />
        </Form.Group>
        <Button type='submit'>
          Save
        </Button>
      </Form>
    </Container>
  )
}

export default RatingForm
