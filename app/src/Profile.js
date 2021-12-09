import { Container, Card, Stack, Button, Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector(state => state.user)
  return (
    <Container>
      <h1>Profile</h1>
      <Card>
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
              <Button>Change password</Button>
            </div>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Profile
