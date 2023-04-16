/* | - Imports - | */
/* - axios - */
import axios from '../libs/axios.lib'
import { AxiosResponse } from 'axios'

/* | - Directory API routes - | */
/* - createDirectoryApi - */
export const createDirectoryApi = async (name: string): Promise<AxiosResponse> => {
  return axios.post('/api/directory', {
    name
  })
}

/* - deleteDirectoryApi - */
export const deleteDirectoryApi = async (idD: string): Promise<AxiosResponse> => {
  return axios.delete(`/api/directory/${idD}`)
}

/* - editDirectoryApi - */
export const editDirectoryApi = async (idD: string, data: unknown): Promise<AxiosResponse> => {
  return axios.put(`/api/directory/${idD}`, {
    data
  })
}
