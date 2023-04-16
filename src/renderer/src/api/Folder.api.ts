/* | - Imports - | */
/* - axios - */
import axios from '../libs/axios.lib'
import { AxiosResponse } from 'axios'

/* | - Folder API routes - | */
/* - requestFolder - */
export const requestFolder = async (idD: string, name: string): Promise<AxiosResponse> => {
  return axios.post(`/api/directory/${idD}/folder`, {
    name
  })
}

/* - deleteFolderApi - */
export const deleteFolderApi = async (idD: string, idF: string): Promise<AxiosResponse> => {
  return axios.delete(`/api/directory/${idD}/folder/${idF}`)
}

/* - editFolderApi - */
export const editFolderApi = async (
  idD: string,
  idF: string,
  data: unknown
): Promise<AxiosResponse> => {
  return axios.put(`/api/directory/${idD}/folder/${idF}`, {
    data
  })
}
