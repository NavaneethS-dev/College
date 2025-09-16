import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg hover:shadow-primary-500/25 active:scale-95',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white hover:shadow-lg active:scale-95',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white active:scale-95',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/10 active:scale-95',
    danger: 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg hover:shadow-red-500/25 active:scale-95',
    success: 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:shadow-green-500/25 active:scale-95'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </motion.button>
  )
}

export default Button