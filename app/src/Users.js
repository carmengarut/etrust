import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, Stack, Badge } from 'react-bootstrap'
import { usersInit } from './reducers/usersReducers'

export default function Users () {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(usersInit())
  }, [])

  return (
    <Container>
      {console.log(users)}
      {users.map(user => (
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
