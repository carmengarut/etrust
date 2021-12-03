import { useEffect, useState } from 'react'
import { getAll, create, update } from '../services/notes'

export default function useNotes () {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (noteObject) => {
    create(noteObject)
      .then(returnedNote => setNotes(prev => [...prev, returnedNote]))
      .catch((e) => {
        console.error(e)
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    return update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }

  return {
    addNote,
    toggleImportanceOf,
    notes
  }
}
