import React from 'react'
import { useHistory } from 'react-router-dom'
import { Badge, ListGroup, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Deal = ({ deal }) => {
  const user = useSelector(state => state.user)

  const history = useHistory()
  return (
    <Row>
      <ListGroup.Item className='d-flex justify-content-between align-items-start' key={deal.id} action onClick={() => { history.push(`/deals/${deal.id}`) }}>
        <Col lg='9'>
          {deal.title}
        </Col>
        <Col lg='2'>
          <Badge variant='secondary'>
            {deal.signedBy.find(member => member.id === user.id)
              ? 'Signed'
              : 'Not signed'}
          </Badge>
        </Col>
        <Col lg='1'>
          <Badge variant='primary'>
            {deal.status}
          </Badge>
        </Col>

      </ListGroup.Item>
    </Row>
  )
}

export default Deal
