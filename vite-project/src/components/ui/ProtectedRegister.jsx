import { useAuth } from '../../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, UserPlus, ArrowRight } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

const ProtectedRegister = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-400 mt-4">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto px-4 text-center"
        >
          <div className="glass-dark rounded-xl p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Lock className="w-10 h-10 text-primary-400" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Authentication Required
            </h1>
            
            <p className="text-gray-400 mb-8 leading-relaxed">
              You need to create an account and log in to register your team for HACK-AI-THON. 
              This helps us keep track of your registration and allows you to edit your team details later.
            </p>
            
            <div className="space-y-4">
              <motion.a
                href={`/auth/signup?redirect=${encodeURIComponent(location.pathname)}`}
                className="block w-full btn-primary group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Create Account & Register Team
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href={`/auth/login?redirect=${encodeURIComponent(location.pathname)}`}
                className="block w-full btn-outline"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Already have an account? Login
              </motion.a>
              
              <motion.a
                href="/"
                className="block w-full btn-ghost text-gray-400 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Home
              </motion.a>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>✓ Secure registration</span>
                <span>✓ Edit team later</span>
                <span>✓ Track status</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return children
}

export default ProtectedRegister