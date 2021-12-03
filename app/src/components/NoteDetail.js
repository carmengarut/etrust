import React from 'react'
import { useParams } from 'react-router-dom'

export const NoteDetail = ({ notes }) => {
  const { id } = useParams()
  const note = notes.find(note => note.id === id)
  if (!note) return null

  console.log(note)

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user.name}</div>
      <div>
        <strong>
          {note.important ? 'important' : ''}
        </strong>
      </div>
    </div>
  )
}
