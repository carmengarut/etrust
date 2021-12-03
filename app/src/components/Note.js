import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import TableCell from '@material-ui/core/TableCell'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <>
      <TableCell className='note'>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </TableCell>
      <TableCell>
        <Button onClick={toggleImportance}>{label}</Button>
      </TableCell>
    </>
  )
}

export default Note
