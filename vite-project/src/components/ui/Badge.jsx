import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  animate = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    // Dark variants for dark theme
    'default-dark': 'bg-gray-800 text-gray-200',
    'primary-dark': 'bg-primary-900/50 text-primary-300',
    'secondary-dark': 'bg-secondary-900/50 text-secondary-300',
    'success-dark': 'bg-green-900/50 text-green-300',
    'warning-dark': 'bg-yellow-900/50 text-yellow-300',
    'error-dark': 'bg-red-900/50 text-red-300',
    'info-dark': 'bg-blue-900/50 text-blue-300'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  const Component = animate ? motion.span : 'span'
  const animationProps = animate ? {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.2 }
  } : {}

  return (
    <Component 
      className={classes} 
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Badge