import { useState } from 'react'
import Notification from './components/Notification'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import useNotes from './hooks/useNotes'
import { useUser } from './hooks/useUser'
import { TableBody, Table, TableContainer, TableRow, Button } from '@material-ui/core'

function Notes () {
  const { notes, addNote, toggleImportanceOf } = useNotes()
  const { user, userLogin, userLogout } = useUser()

  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const toggleImportanceOfNote = id => {
    toggleImportanceOf(id)
      .catch(error => {
        setErrorMessage('Note was already removed from server')
        console.error(error)
        setTimeout(() => {
          setErrorMessage()
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      userLogin({ username, password })

      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {
        user
          ? <NoteForm
              addNote={addNote}
              handleLogout={userLogout}
            />
          : <LoginForm
              username={username}
              password={password}
              handleLogin={handleLogin}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            />
      }

      <div>
        <Button color='primary' variant='outlined' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableBody>
            {notesToShow.map((note, i) =>
              <TableRow key={note.id}>
                <Note
                  key={i}
                  note={note}
                  toggleImportance={() => toggleImportanceOfNote(note.id)}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Notes
