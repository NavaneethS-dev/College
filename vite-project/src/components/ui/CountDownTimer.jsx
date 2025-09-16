import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CountDownTimer = ({ 
  targetDate, 
  onComplete = () => {},
  className = '',
  showLabels = true,
  size = 'md'
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        if (!isComplete) {
          setIsComplete(true)
          onComplete()
        }
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete, isComplete])

  const sizeClasses = {
    sm: {
      container: 'text-2xl md:text-3xl',
      number: 'text-2xl md:text-3xl',
      label: 'text-xs'
    },
    md: {
      container: 'text-3xl md:text-4xl lg:text-5xl',
      number: 'text-3xl md:text-4xl lg:text-5xl',
      label: 'text-sm'
    },
    lg: {
      container: 'text-4xl md:text-5xl lg:text-6xl',
      number: 'text-4xl md:text-5xl lg:text-6xl',
      label: 'text-base'
    }
  }

  const sizes = sizeClasses[size]

  if (isComplete) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`text-center ${className}`}
      >
        <div className={`font-bold text-gradient ${sizes.container}`}>
          Event Started!
        </div>
        {showLabels && (
          <p className="text-gray-400 mt-2">The hackathon has begun</p>
        )}
      </motion.div>
    )
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ]

  return (
    <div className={`flex justify-center items-center space-x-4 md:space-x-8 ${className}`}>
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            key={unit.value} // Re-animate when value changes
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`font-bold text-gradient ${sizes.number} leading-none`}
          >
            {unit.value.toString().padStart(2, '0')}
          </motion.div>
          {showLabels && (
            <div className={`text-gray-400 uppercase tracking-wider ${sizes.label} mt-1`}>
              {unit.label}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default CountDownTimer