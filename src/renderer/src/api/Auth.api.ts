/* | - Imports - | */
/* - axios - */
import { AxiosResponse } from 'axios'
import axios from '../libs/axios.lib'

/* | - Auth API routes - | */
/* - requestAuthLogin - */
export const requestAuthLogin = async (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  return axios.post('/api/auth/login', {
    username,
    password
  })
}

/* - requestAuthProfile - */
export const requestAuthProfile = async (): Promise<AxiosResponse> => axios.get('/api/auth/profile')

/* - requestAuthRegister - */
export const requestAuthRegister = async (data: unknown): Promise<AxiosResponse> => {
  return axios.post('/api/auth/register', {
    data
  })
}
