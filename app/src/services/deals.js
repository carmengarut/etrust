import axios from 'axios'
const baseUrl = 'https://etrust-backend.herokuapp.com/api/deals'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const getDeal = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

export const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export const sign = (id, users) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const newObject = {
    users
  }
  const request = axios.put(`${baseUrl}/${id}/sign`, newObject, config)
  return request.then(response => response.data)
}

export const addRating = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post('https://etrust-backend.herokuapp.com/api/ratings/', newObject, config)
  return request.then(response => response.data)
}

export const getAllRatings = () => {
  const request = axios.get('https://etrust-backend.herokuapp.com/api/ratings/')
  return request.then(response => response.data)
}

export const updateTrustRate = (id, trustRate) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const newObject = {
    trustRate
  }
  console.log(newObject)
  const request = axios.put(`https://etrust-backend.herokuapp.com/api/users/${id}`, newObject, config)
  return request.then(response => response.data)
}

export const getAllUsers = () => {
  const request = axios.get('https://etrust-backend.herokuapp.com/api/users')
  return request.then(response => response.data)
}
