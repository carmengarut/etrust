import { useEffect, useState } from 'react'
import { getAll, create } from '../services/deals'

export default function useDeals () {
  const [deals, setDeals] = useState([])

  useEffect(() => {
    getAll()
      .then(initialDeals => {
        setDeals(initialDeals)
      })
  }, [])

  const addDeal = (dealObject) => {
    create(dealObject)
      .then(returnedDeal => setDeals(prev => [...prev, returnedDeal]))
      .catch((e) => {
        console.error(e)
      })
  }

  return {
    addDeal,
    deals
  }
}
