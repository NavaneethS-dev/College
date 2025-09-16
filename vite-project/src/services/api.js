import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    
    // Handle different status codes
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminData')
      delete api.defaults.headers.common['Authorization']
      
      // Don't show toast for login attempts
      if (!error.config.url.includes('/auth/admin/login')) {
        toast.error('Session expired. Please login again.')
        window.location.href = '/admin/login'
      }
    } else if (error.response?.status === 403) {
      toast.error('Access denied. Insufficient permissions.')
    } else if (error.response?.status === 404) {
      toast.error('Requested resource not found.')
    } else if (error.response?.status === 429) {
      toast.error('Too many requests. Please try again later.')
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.code === 'NETWORK_ERROR') {
      toast.error('Network error. Please check your connection.')
    } else if (error.code === 'TIMEOUT') {
      toast.error('Request timeout. Please try again.')
    }
    
    return Promise.reject(error)
  }
)

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/admin/login', credentials),
}

export const teamsAPI = {
  register: (teamData) => api.post('/teams', teamData),
  getAll: (params = {}) => api.get('/teams', { params }),
  getById: (id) => api.get(`/teams/${id}`),
  updateStatus: (id, status) => api.put(`/teams/${id}/status`, { status }),
  delete: (id) => api.delete(`/teams/${id}`),
  export: () => api.get('/teams/export', { 
    responseType: 'blob',
    headers: {
      'Accept': 'text/csv'
    }
  }),
}

export const statusAPI = {
  get: () => api.get('/status'),
}

// Utility functions
export const downloadCSV = (data, filename) => {
  const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}

export const handleAPIError = (error) => {
  if (error.response?.data?.errors) {
    // Validation errors
    return error.response.data.errors.map(err => err.message).join(', ')
  }
  return error.response?.data?.message || error.message || 'An error occurred'
}

export { api }