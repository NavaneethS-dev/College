import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react'

const NotFound = () => {
  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="float"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="float"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="float"
          transition={{ delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 404 Animation */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div
              className="text-8xl md:text-9xl font-bold text-gradient mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: "spring",
                damping: 10
              }}
            >
              404
            </motion.div>
            
            <motion.div
              className="flex justify-center mb-6"
              variants={floatingVariants}
              animate="float"
            >
              <div className="relative">
                <AlertTriangle className="w-16 h-16 text-red-400" />
                <motion.div
                  className="absolute inset-0 bg-red-400/20 rounded-full blur-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-400 mb-2">
              The page you're looking for seems to have vanished into the digital void.
            </p>
            <p className="text-gray-500">
              Don't worry, even the best hackers sometimes take a wrong turn!
            </p>
          </motion.div>

          {/* Suggestions */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="glass rounded-xl p-6 text-left">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-primary-400" />
                What you can do:
              </h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                  Check the URL for any typos
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></span>
                  Go back to the homepage and navigate from there
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent-400 rounded-full mr-3"></span>
                  Use the navigation menu to find what you need
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                  Contact us if you think this is an error
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="btn-primary flex items-center text-lg px-8 py-3"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="btn-outline flex items-center text-lg px-8 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-400 text-sm font-bold">!</span>
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-blue-400 mb-1">Did you know?</h3>
                <p className="text-xs text-gray-300">
                  The HTTP 404 error was named after room 404 at CERN, where the World Wide Web was born. 
                  The room contained the central database, and when it was moved, people got "404 Not Found" errors!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-primary-400/20 font-mono text-sm"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            y: [0, -10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {'<Page>'}
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-10 text-secondary-400/20 font-mono text-sm"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            y: [0, 10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          {'</NotFound>'}
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 left-10 text-accent-400/20 font-mono text-xs"
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            x: [0, 5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          {'// TODO: Fix this route'}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default NotFound