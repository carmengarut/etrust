import { useEffect } from 'react'
import Notification from './components/Notification'
import Deal from './components/Deal'
import LoginForm from './components/LoginForm'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { dealInit } from './reducers/dealReducer'
import { ListGroup, Button } from 'react-bootstrap'

function Deals () {
  const user = useSelector(state => state.user)
  const deals = useSelector(state => state.deals)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(dealInit())
  }, [])

  return (
    <div>
      <h1>My deals</h1>
      <Notification />
      {
        user.username
          ? <Button><Link to='/create-deal' style={{ color: '#FFFFFF' }}>New Deal</Link></Button>
          : <LoginForm />
      }

      <br />
      <br />
      <ListGroup>
        {deals.filter(deal => {
          if (deal.createdBy.id) return deal.createdBy.id === user.id
          return deal.createdBy === user.id
        }).map((deal, i) =>
          <ListGroup.Item className='d-flex justify-content-between align-items-start' key={deal.id}>
            <Deal
              key={i}
              deal={deal}
            />
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default Deals
