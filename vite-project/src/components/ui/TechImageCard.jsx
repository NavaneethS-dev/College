import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const TechImageCard = ({ 
  src, 
  alt, 
  title, 
  description, 
  icon: Icon,
  className = '',
  animationType = 'hover-zoom'
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const getAnimationClass = () => {
    switch (animationType) {
      case 'hover-zoom':
        return 'hover-zoom'
      case 'float':
        return 'animate-float-slow'
      case 'glitch':
        return 'animate-glitch'
      default:
        return ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-xl bg-gray-800 group ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Icon className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-all duration-500 ${getAnimationClass()} ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon Overlay */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary-400" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default TechImageCard