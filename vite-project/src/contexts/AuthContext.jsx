import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext({
  user: null,
  admin: null,
  token: null,
  login: async () => {},
  adminLogin: async () => {},
  logout: () => {},
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check for user token
        const userToken = localStorage.getItem('userToken')
        const userData = localStorage.getItem('userData')
        
        const storedToken = localStorage.getItem('adminToken')
        const storedAdmin = localStorage.getItem('adminData')

        if (userToken && userData) {
          const parsedUser = JSON.parse(userData)
          setToken(userToken)
          setUser(parsedUser)
          api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
        } else if (storedToken && storedAdmin) {
          const parsedAdmin = JSON.parse(storedAdmin)
          setToken(storedToken)
          setAdmin(parsedAdmin)
          
          // Set the auth token in api client
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        // Clear invalid data
        localStorage.removeItem('userToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminData')
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // User login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      const { user: userData, token: authToken } = response.data.data

      // Store in localStorage
      localStorage.setItem('userToken', authToken)
      localStorage.setItem('userData', JSON.stringify(userData))

      // Update state
      setToken(authToken)
      setUser(userData)
      setAdmin(null) // Clear admin state

      // Set the auth token in api client
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

      return { success: true, data: userData }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      throw new Error(message)
    }
  }

  // Admin login function
  const adminLogin = async (email, password) => {
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
      setUser(null) // Clear user state

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
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')

    // Clear state
    setToken(null)
    setUser(null)
    setAdmin(null)

    // Remove auth token from api client
    delete api.defaults.headers.common['Authorization']
  }

  // Check if user is authenticated
  const isAuthenticated = Boolean(token && (user || admin))
  const isAdmin = Boolean(token && admin)

  const value = {
    user,
    admin,
    token,
    login,
    adminLogin,
    logout,
    isLoading,
    isAuthenticated,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}