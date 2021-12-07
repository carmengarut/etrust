import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button, Badge } from 'react-bootstrap'
import { signDeal } from '../reducers/dealReducer'

export const DealDetails = ({ deals }) => {
  const user = useSelector(state => state.user)
  const { id } = useParams()
  const deal = deals.find(deal => deal.id === id)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSign = async () => {
    const users = [...deal.signedBy.map(user => user.id), user.id]
    console.log(users)
    dispatch(signDeal(id, users))
  }
  if (!deal) {
    return null
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {deal.title}
          <Badge bg='success'>
            {deal.status}
          </Badge>
        </Card.Title>
        <Card.Text>{deal.content}</Card.Text>
        <Card.Text>Creation date: {deal.date.slice(0, 10)}</Card.Text>
        <Card.Text>Created by: {deal.createdBy.name} {deal.createdBy.surname}  </Card.Text>
        <Card.Text>
          Members: {deal.members.map(user => `${user.name} ${user.surname}`)}
        </Card.Text>
        <Card.Text>
          Signed by: {deal.signedBy[0].name
          ? deal.signedBy.map(user => <span key={user.id}>{user.name} {user.surname}</span>)
          : '-'}
        </Card.Text>
        <Card.Text>Ratings:</Card.Text>
        {deal.ratings.map(rating => (
          <Card key={rating.id}>
            <Card.Body>
              <Card.Text>By {rating.createdBy}</Card.Text>
              <Card.Text>{rating.content}</Card.Text>
              <Card.Text>To {rating.recipient}</Card.Text>
            </Card.Body>
          </Card>
        ))}

        {deal.status === 'Signed'
          ? <Button onClick={() => history.push(`/rate/${id}`)}>Submit Rating</Button>
          : deal.signedBy[0].name
            ? deal.signedBy.find(userSigned => userSigned.id === user.id)
              ? <Card.Text>Signed</Card.Text>
              : <Button onClick={handleSign}>Sign Now</Button>
            : <Button onClick={handleSign}>Sign Now</Button>}
      </Card.Body>
    </Card>
  )
}
