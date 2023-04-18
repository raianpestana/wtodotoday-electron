/* | - Imports - | */
/* - axios - */
import axios from '../libs/axios.lib'
import { AxiosResponse } from 'axios'

/* - delete AccountApi - */
export const deleteAccountApi = async (): Promise<AxiosResponse> => {
  return axios.delete(`/api/account/profile`)
}

/* - edit AccountApi - */
export const editAccountApi = async (data: unknown): Promise<AxiosResponse> => {
  return axios.put(`/api/account/profile`, {
    data
  })
}
