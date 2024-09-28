import axios from 'axios'

export const useApi = () =>
  axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
      'Content-Type': 'application/json'
    }
  })

export const useApiPrivate = () => {
  const token = localStorage.getItem('token') // Use stored token
  console.log(token)
  return axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}
