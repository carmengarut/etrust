import React from 'react'
import { useParams } from 'react-router-dom'

export const DealDetails = ({ deals }) => {
  const { id } = useParams()
  const deal = deals.find(deal => deal.id === id)
  if (!deal) return null

  return (
    <div>
      <h2>{deal.content}</h2>
      <div>{deal.user.name}</div>
    </div>
  )
}
