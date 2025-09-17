import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code, Users, Info, UserPlus, Calendar, User, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navigation = [
    { name: 'Home', href: '/', icon: Code },
    { name: 'Details', href: '/details', icon: Info },
    { name: 'Register', href: '/register', icon: UserPlus },
  ]

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass-dark shadow-xl shadow-primary-500/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Link 
                to="/" 
                className="flex items-center space-x-2 group"
                onClick={() => scrollToSection('hero')}
              >
                <div className="relative">
                  <Code className="h-8 w-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
                  <motion.div
                    className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-gradient">
                  HACK-AI-THON
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible group ${
                          isActive(item.href)
                            ? 'text-primary-400 bg-primary-500/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="inline-block w-4 h-4 mr-2" />
                        {item.name}
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary-500/20 rounded-lg -z-10"
                            initial={false}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}

                {/* Quick Actions */}
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  onClick={() => scrollToSection('schedule')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus-visible"
                >
                  <Calendar className="inline-block w-4 h-4 mr-2" />
                  Schedule
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  onClick={() => scrollToSection('sponsors')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus-visible"
                >
                  <Users className="inline-block w-4 h-4 mr-2" />
                  Sponsors
                </motion.button>

                {/* User Menu */}
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus-visible"
                    >
                      <User className="inline-block w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus-visible"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/auth/login"
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus-visible"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/signup"
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:hidden"
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass hover:bg-white/20 p-2 rounded-lg text-gray-300 hover:text-white focus-visible transition-all duration-200"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-dark border-t border-gray-700/50"
            >
              <div className="px-4 py-6 space-y-3">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-primary-400 bg-primary-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  )
                })}

                {/* Mobile Quick Actions */}
                <button
                  onClick={() => scrollToSection('schedule')}
                  className="flex items-center w-full px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Schedule
                </button>

                <button
                  onClick={() => scrollToSection('sponsors')}
                  className="flex items-center w-full px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Users className="w-5 h-5 mr-3" />
                  Sponsors
                </button>

                {/* Mobile User Menu */}
                <div className="pt-4 border-t border-gray-700/50 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="flex items-center w-full px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                      >
                        <User className="w-5 h-5 mr-3" />
                        Dashboard
                      </Link>
                      <Link
                        to="/register"
                        className="block w-full btn-primary text-center"
                      >
                        Register Team
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 rounded-lg text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-200"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        className="block w-full btn-outline text-center"
                      >
                        Login
                      </Link>
                      <Link
                        to="/auth/signup"
                        className="block w-full btn-primary text-center"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  )
}

export default Navbar