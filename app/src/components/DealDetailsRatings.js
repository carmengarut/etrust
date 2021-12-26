import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
export default function DealDetailsRatings () {
  const ratings = useSelector(state => state.ratings)

  const { id } = useParams()

  return (
    <>
      <div>Contract ratings: </div>
      {ratings.filter(rating => rating.deal === id).map(rating => (
        <div key={rating.id}>

          <div>By {rating.createdBy.email}</div>
          <div>{rating.content}</div>
          <div>To {rating.recipient.email}</div>

        </div>
      ))}

      <button onClick={() => history.push(`/rate/${id}`)}>Submit Rating</button>
    </>
  )
}
