import axios from 'axios'
import { API_URL } from '../config/config'

/**
 * Make a login request
 *
 * @param {string} email
 * @param {string} code
 */
export async function login (email, code) {
  return axios.post(`${API_URL}/login`, { email, code })
}

export async function getLoginCode (email) {
  return axios.post(`${API_URL}/login/code`, { email })
}

export async function setProfile (firstName, lastName, imageUrl, token) {
  return axios.put(`${API_URL}/profiles`, { firstName, lastName, imageUrl }, { headers: { Authorization: token } }).then(({ data }) => data)
}

export async function uploadImg (formData) {
  const url = `${API_URL}/upload/images`
  return axios.post(url, formData)
    .then(x => x.data)
}

export async function getContacts (token) {
  return axios.get(`${API_URL}/chats`, { headers: { Authorization: token } }).then(({ data }) => data)
}

export async function getSearch (token, q) {
  return axios.get(`${API_URL}/chats/search?q=` + q, { headers: { Authorization: token } }).then(({ data }) => data)
}

export async function createChat (token, title, imageUrl, userIds) {
  return axios.post(`${API_URL}/chats`, { title, imageUrl, userIds }, { headers: { Authorization: token } }).then(({ data }) => data)
}
