import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, Stack, Badge, Form } from 'react-bootstrap'
import { usersInit } from './reducers/usersReducers'

export default function Users () {
  const users = useSelector(state => state.users)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(usersInit())
  }, [])

  return (
    <Container>
      <h1>Users</h1>
      <br />
      <Form.Group>
        <Stack direction='horizontal' gap={2}>
          <Form.Control onChange={({ target }) => { setSearch(target.value) }} value={search} className='me-auto' placeholder='Search...' />
        </Stack>
      </Form.Group>
      <br />
      {!users[0]
        ? <div />
        : users.filter(user => {
          const fullname = user.name + ' ' + user.surname
          return fullname.toLowerCase().includes(search.toLowerCase())
        }).map(user => (
          <Card key={user.id}>
            <Card.Body>
              <Stack direction='horizontal' gap={2}>
                <img
                  style={{
                    width: '150px',
                    height: '150px',
                    resizeMode: 'contain'
                  }}
                  src={user.profileImg}
                  alt={user.name}
                />
                <div>
                  <Card.Title>{user.name} {user.surname}
                    {' '}<Badge bg='info'>{user.trustRate} % trust</Badge>
                  </Card.Title>
                  <Card.Text>Email: {user.email}</Card.Text>
                </div>
              </Stack>
            </Card.Body>
          </Card>))}
    </Container>
  )
}
