import axios from 'axios'
const baseUrl = 'https://etrust-backend.herokuapp.com/api/users/'

export const register = async userObject => {
  const { data } = await axios.post(baseUrl, userObject, {})
  return data
}
