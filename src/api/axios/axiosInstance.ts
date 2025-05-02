import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002/',
  timeout: 1500,
  headers: {
    'Content-Type': 'application/json',
  },
})
