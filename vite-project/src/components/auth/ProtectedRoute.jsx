import { useAuth } from '../../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '../ui/LoadingSpinner'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-400 mt-4">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to appropriate login page with return url
    const loginPath = location.pathname.startsWith('/admin') ? '/admin/login' : '/auth/login'
    return (
      <Navigate 
        to={loginPath} 
        state={{ from: location }} 
        replace 
      />
    )
  }

  // Check if admin route requires admin privileges
  if (location.pathname.startsWith('/admin') && !isAdmin) {
    return (
      <Navigate 
        to="/auth/login" 
        state={{ from: location }} 
        replace 
      />
    )
  }

  return children
}

export default ProtectedRoute