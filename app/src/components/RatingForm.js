import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
// import { addNewDeal } from '../reducers/dealReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addNewRating } from '../reducers/ratingReducer'

const RatingForm = () => {
  const [fulfilled, setFulfilled] = useState('')
  const [content, setContent] = useState('')
  const [recipient, setRecipient] = useState('')

  const { id } = useParams()
  const deals = useSelector(state => state.deals)
  const ratings = useSelector(state => state.ratings)
  const user = useSelector(state => state.user)

  const deal = deals.find(deal => deal.id === id)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const ratingObject = {
      fulfilled,
      content,
      recipientId: recipient,
      dealId: id
    }

    let newTrustRate

    ratingObject.fulfilled === 'True'
      ? newTrustRate = 100 * (ratings.filter(rating => (rating.fulfilled === 'True') && (rating.recipient.id === recipient)).length + 1) / (ratings.filter(rating => rating.recipient.id === recipient).length + 1)
      : newTrustRate = 100 * ratings.filter(rating => (rating.fulfilled === 'True') && (rating.recipient.id === recipient)).length / (ratings.filter(rating => rating.recipient.id === recipient).length + 1)

    dispatch(addNewRating(ratingObject, newTrustRate))
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
            {deal.signedBy.filter(member => member.id !== user.id).map(member => <option key={member.id} value={member.id}>{member.email}</option>)}

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
