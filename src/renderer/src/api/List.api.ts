/* | - Imports - | */
/* - axios - */
import { AxiosResponse } from 'axios'
import axios from '../libs/axios.lib'

/* | - List API routes - | */
/* - requestList - */
export const requestList = async (
  idD: string,
  idF: string,
  data: unknown
): Promise<AxiosResponse> => {
  return axios.post(`/api/directory/${idD}/folder/${idF}/list`, {
    data
  })
}

/* - deleteListApi - */
export const deleteListApi = async (
  idD: string,
  idF: string,
  idL: string
): Promise<AxiosResponse> => {
  return axios.delete(`/api/directory/${idD}/folder/${idF}/list/${idL}`)
}

/* - editListApi - */
export const editListApi = async (
  idD: string,
  idF: string,
  idL: string,
  data: unknown
): Promise<AxiosResponse> => {
  return axios.put(`/api/directory/${idD}/folder/${idF}/list/${idL}`, {
    data
  })
}
