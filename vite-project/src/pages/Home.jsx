import { motion } from 'framer-motion'
import { ArrowDown, Calendar, Users, Trophy, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CountdownTimer from '../components/ui/CountDownTimer.jsx'
import SponsorsCarousel from '../components/sections/SponsorsCarousel'
import TechShowcase from '../components/sections/TechShowcase'
import { statusAPI } from '../services/api'

const Home = () => {
  const [stats, setStats] = useState({
    totalTeams: 0,
    remainingSlots: 50,
    isOpen: true
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statusAPI.get()
        setStats(response.data.data.registration)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  // Get hackathon start date from environment variable
  const hackathonStart = import.meta.env.VITE_HACKATHON_START || '2025-03-15T09:00:00Z'

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
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
        staggerChildren: 0.2
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Function to get feature images
  const getFeatureImage = (imageType) => {
    const images = {
      'innovation-focus': 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'expert-mentorship': 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'amazing-prizes': 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'three-day-experience': 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    }
    return images[imageType] || images['innovation-focus']
  }

  return (
    <motion.div
      id="main-content"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gray-950"
    >
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <div className="hero-bg-image">
            <img 
              src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
              alt="Coding workspace with multiple monitors" 
              className="w-full h-full object-cover animate-slow-zoom"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-purple-900/70 to-blue-900/80"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Animated particles/shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl"
            variants={floatingVariants}
            animate="float"
          />
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 bg-secondary-500/10 rounded-full blur-xl"
            variants={floatingVariants}
            animate="float"
            transition={{ delay: 1 }}
          />
          <motion.div
            className="absolute bottom-40 left-1/4 w-24 h-24 bg-accent-500/10 rounded-full blur-xl"
            variants={floatingVariants}
            animate="float"
            transition={{ delay: 2 }}
          />
          
          {/* Floating Code Elements */}
          <motion.div
            className="absolute top-1/4 right-1/4 text-primary-400/20 font-mono text-sm"
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              y: [0, -20, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {'<AI />'}
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/3 left-1/5 text-secondary-400/20 font-mono text-xs"
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              x: [0, 15, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            {'function hack() { return innovation; }'}
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto px-4 text-center"
        >
          {/* Main title with letter-by-letter animation */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.h1 
              className="heading-1 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block">
                {'HACK-AI-THON'.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block text-gradient"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      damping: 12
                    }}
                  >
                    {char === '-' ? <span className="text-primary-400">{char}</span> : char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
            
            <motion.p
              className="body-large text-gray-300 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              The premier AI/ML hackathon bringing together brilliant minds to solve 
              real-world challenges through innovative technology. Join us for 3 days 
              of coding, learning, and creating the future.
            </motion.p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Event Starts In:
            </h2>
            <CountdownTimer 
              targetDate={hackathonStart}
              size="lg"
              className="mb-4"
            />
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12"
          >
            <div className="glass px-6 py-4 rounded-lg">
              <div className="text-2xl font-bold text-primary-400">{stats.totalTeams}</div>
              <div className="text-gray-400">Teams Registered</div>
            </div>
            <div className="glass px-6 py-4 rounded-lg">
              <div className="text-2xl font-bold text-secondary-400">{stats.remainingSlots}</div>
              <div className="text-gray-400">Slots Remaining</div>
            </div>
            <div className="glass px-6 py-4 rounded-lg">
              <div className="text-2xl font-bold text-accent-400">72</div>
              <div className="text-gray-400">Hours of Coding</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              to="/register"
              className="btn-primary text-lg px-8 py-4 glow-primary"
            >
              Register Your Team
            </Link>
            <Link
              to="/details"
              className="btn-outline text-lg px-8 py-4"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
            <motion.button
              onClick={() => scrollToSection('features')}
              className="p-2 rounded-full glass hover:bg-white/20 transition-all duration-200"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6 text-primary-400" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
            alt="Technology background pattern" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Why HACK-AI-THON?</h2>
            <p className="body-regular text-gray-400 max-w-3xl mx-auto">
              Experience the ultimate hackathon with cutting-edge technology, 
              expert mentorship, and exciting opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Innovation Focus",
                description: "Work on AI/ML challenges that matter and create solutions with real-world impact.",
                image: "innovation-focus"
              },
              {
                icon: Users,
                title: "Expert Mentorship",
                description: "Learn from industry leaders and get guidance from experienced professionals.",
                image: "expert-mentorship"
              },
              {
                icon: Trophy,
                title: "Amazing Prizes",
                description: "Win cash prizes, internships, and recognition from top tech companies.",
                image: "amazing-prizes"
              },
              {
                icon: Calendar,
                title: "3-Day Experience",
                description: "Immersive hackathon with workshops, networking, and collaborative learning.",
                image: "three-day-experience"
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card card-hover text-center group relative overflow-hidden"
                >
                  {/* Feature Image Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                    <img 
                      src={getFeatureImage(feature.image)} 
                      alt={feature.title} 
                      className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed relative z-10">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Our Amazing Sponsors</h2>
            <p className="body-regular text-gray-400">
              Powered by industry-leading companies supporting innovation
            </p>
          </motion.div>

          <SponsorsCarousel />
        </div>
      </section>

      {/* Technology Showcase Section */}
      <TechShowcase />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* CTA Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/159201/circuit-circuit-board-resistor-computer-159201.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
            alt="Futuristic technology circuit board" 
            className="w-full h-full object-cover animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-secondary-600/90"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 mb-6">Ready to Build the Future?</h2>
            <p className="body-large mb-8 opacity-90">
              Join hundreds of developers, designers, and innovators in the most 
              exciting AI/ML hackathon of the year. Registration closes soon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-glass text-lg px-8 py-4"
              >
                Register Now
              </Link>
              <Link
                to="/details"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4"
              >
                View Schedule
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home