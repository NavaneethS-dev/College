import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  delay = 0,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  }

  const arrows = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-800',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-800',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-800'
  }

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.15, delay }}
            className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap ${positions[position]}`}
          >
            {content}
            <div className={`absolute w-0 h-0 border-4 ${arrows[position]}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tooltip