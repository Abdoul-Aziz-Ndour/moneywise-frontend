import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

// Ajoute le token automatiquement
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Services Auth
export const authService = {
  login: (data) => API.post('/auth/login/', data),
  register: (data) => API.post('/auth/register/', data),
  logout: () => API.post('/auth/logout/'),
}

// Services Transactions
export const transactionService = {
  getAll: () => API.get('/transactions/'),
  create: (data) => API.post('/transactions/', data),
  update: (id, data) => API.put(`/transactions/${id}/`, data),
  delete: (id) => API.delete(`/transactions/${id}/`),
}

// Services Categories
export const categorieService = {
  getAll: () => API.get('/categories/'),
  create: (data) => API.post('/categories/', data),
}

export default API
