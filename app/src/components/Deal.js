import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from 'react-bootstrap'

const Deal = ({ deal }) => {
  return (
    <>
      <Link to={`/deal/${deal.id}`}>{deal.content}</Link>
      <Badge variant='primary'>
        {deal.status}
      </Badge>
    </>
  )
}

export default Deal
