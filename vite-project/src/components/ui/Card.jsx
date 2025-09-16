import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '',
  hover = false,
  glass = false,
  padding = 'default',
  ...props 
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300'
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  }
  
  const backgroundClasses = glass 
    ? 'glass-dark' 
    : 'bg-gray-800 border border-gray-700'
    
  const hoverClasses = hover 
    ? 'hover:scale-105 hover:shadow-xl hover:shadow-primary-500/10 cursor-pointer' 
    : ''

  const classes = `${baseClasses} ${backgroundClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`

  return (
    <motion.div 
      className={classes}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card