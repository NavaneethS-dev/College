import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext({
  admin: null,
  token: null,
  login: async () => {},
  logout: () => {},
  isLoading: true,
  isAuthenticated: false
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('adminToken')
        const storedAdmin = localStorage.getItem('adminData')

        if (storedToken && storedAdmin) {
          const parsedAdmin = JSON.parse(storedAdmin)
          setToken(storedToken)
          setAdmin(parsedAdmin)
          
          // Set the auth token in api client
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        // Clear invalid data
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminData')
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/admin/login', {
        email,
        password
      })

      const { admin: adminData, token: authToken } = response.data.data

      // Store in localStorage
      localStorage.setItem('adminToken', authToken)
      localStorage.setItem('adminData', JSON.stringify(adminData))

      // Update state
      setToken(authToken)
      setAdmin(adminData)

      // Set the auth token in api client
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

      return { success: true, data: adminData }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      throw new Error(message)
    }
  }

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')

    // Clear state
    setToken(null)
    setAdmin(null)

    // Remove auth token from api client
    delete api.defaults.headers.common['Authorization']
  }

  // Check if user is authenticated
  const isAuthenticated = Boolean(token && admin)

  const value = {
    admin,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}