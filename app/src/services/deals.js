import axios from 'axios'
const baseUrl = '/api/deals'

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
  console.log(newObject)
  const request = axios.put(`${baseUrl}/${id}/sign`, newObject, config)
  return request.then(response => response.data)
}

export const addRating = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(`${baseUrl}/${id}/rate`, newObject, config)
  return request.then(response => response.data)
}
