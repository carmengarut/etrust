import React from 'react'
import { Link } from 'react-router-dom'
import TableCell from '@material-ui/core/TableCell'

const Deal = ({ deal }) => {
  return (
    <>
      <TableCell className='deal'>
        <Link to={`/deal/${deal.id}`}>{deal.content}</Link>
      </TableCell>
    </>
  )
}

export default Deal
