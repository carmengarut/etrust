import { Container, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector(state => state.user)
  return (
    <Container>
      <h1>Profile</h1>
      <Card>
        <Card.Body>
          <img
            style={{
              width: '150px',
              height: '150px',
              resizeMode: 'contain'
            }}
            src={user.profileImg}
            alt={user.name}
          />
          <Card.Title>{user.name} {user.surname}</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Profile
