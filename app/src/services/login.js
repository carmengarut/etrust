import axios from 'axios'
const baseUrl = 'https://etrust-backend.herokuapp.com/api/login/'

export const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}
