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

export async function setProfile (firstName, lastName, imageUrl) {
  return axios.put(`${API_URL}/profiles`, { firstName, lastName, imageUrl })
}
