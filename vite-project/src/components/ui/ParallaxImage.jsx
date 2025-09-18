import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ParallaxImage = ({ 
  src, 
  alt, 
  className = '', 
  speed = 0.5,
  children,
  overlay = true,
  ...props 
}) => {
  const ref = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Parallax Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40 z-20"></div>
      )}

      {/* Content */}
      {children && (
        <div className="relative z-30 h-full">
          {children}
        </div>
      )}
    </div>
  )
}

export default ParallaxImage