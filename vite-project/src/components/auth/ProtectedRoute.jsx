import { useAuth } from '../../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '../ui/LoadingSpinner'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
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
    // Redirect to login page with return url
    return (
      <Navigate 
        to="/admin/login" 
        state={{ from: location }} 
        replace 
      />
    )
  }

  return children
}

export default ProtectedRoute