import { useState } from 'react'
import { motion } from 'framer-motion'

const ImageWithFallback = ({ 
  src, 
  fallbackSrc, 
  alt, 
  className = '', 
  animate = true,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(false)
    } else {
      setHasError(true)
    }
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  if (hasError) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
        <div className="text-gray-500 text-center p-4">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-sm">Image not available</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {animate ? (
        <motion.img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          variants={imageVariants}
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          {...props}
        />
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          {...props}
        />
      )}
    </div>
  )
}

export default ImageWithFallback