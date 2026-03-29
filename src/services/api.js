// src/services/api.js
import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter le token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepteur pour gérer les erreurs
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)

export const transactionService = {
  getAll: () => API.get('/transactions/'),
  create: (data) => API.post('/transactions/', data),
  update: (id, data) => API.put(`/transactions/${id}/`, data),
  delete: (id) => API.delete(`/transactions/${id}/`),
}

export const authService = {
  login: (data) => API.post('/auth/login/', data),
  register: (data) => API.post('/auth/register/', data),
  logout: () => API.post('/auth/logout/'),
  getProfile: () => API.get('/auth/profile/'),
}

export default API