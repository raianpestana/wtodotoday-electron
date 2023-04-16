/* | - Imports - | */
/* - axios - */
import { default as axios } from 'axios'

/* - Store - */
import { useAuth } from '../hooks/useAuth.hook'

/* | - Api - | */
/* - Create - */
const baseURL = 'http://localhost:3000'

const api = axios.create({
  baseURL,
  withCredentials: true
})

api.interceptors.request.use((config) => {
  const token = useAuth.getState().token
  config.headers.Authorization = `Bearer ${token}`
  return config
})

/* export */
export default api
