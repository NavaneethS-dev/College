import { motion } from 'framer-motion'
import { 
  Calendar, 
  Users, 
  Trophy, 
  Clock, 
  MapPin, 
  Star,
  ChevronDown,
  ChevronUp,
  Award,
  Code,
  Lightbulb,
  Target
} from 'lucide-react'
import { useState } from 'react'
import { schedule, getEventTypeColor, getEventTypeIcon } from '../data/schedule'
import { faqs, getAllCategories, getFAQsByCategory } from '../data/faqs'

const Details = () => {
  const [activeDay, setActiveDay] = useState(1)
  const [activeFAQ, setActiveFAQ] = useState(null)
  const [activeFAQCategory, setActiveFAQCategory] = useState('General')

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

  const prizes = [
    {
      position: "1st Place",
      amount: "$5,000",
      icon: Trophy,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/30"
    },
    {
      position: "2nd Place",
      amount: "$3,000",
      icon: Award,
      color: "text-gray-300",
      bgColor: "bg-gray-300/10",
      borderColor: "border-gray-300/30"
    },
    {
      position: "3rd Place",
      amount: "$2,000",
      icon: Star,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/30"
    }
  ]

  const specialPrizes = [
    { name: "Best AI Innovation", amount: "$1,000" },
    { name: "Most Social Impact", amount: "$1,000" },
    { name: "People's Choice Award", amount: "$500" },
    { name: "Best Beginner Team", amount: "$500" }
  ]

  const rules = [
    "Teams can have 1-4 members",
    "All team members must be students or recent graduates",
    "Projects must be built during the hackathon timeframe",
    "Use of pre-existing code libraries and APIs is allowed",
    "Projects must be original and not previously submitted",
    "All code must be pushed to a public GitHub repository",
    "Teams must present their project to judges",
    "Decision of judges is final"
  ]

  const categories = getAllCategories()

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
      <section className="relative py-20 bg-gradient-to-br from-primary-900 via-purple-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants}
              className="heading-1 mb-6"
            >
              Hackathon <span className="text-gradient">Details</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="body-large text-gray-300 max-w-3xl mx-auto"
            >
              Everything you need to know about HACK-AI-THON - from rules and 
              schedule to prizes and frequently asked questions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">About HACK-AI-THON</h2>
            <p className="body-regular text-gray-400 max-w-3xl mx-auto">
              A premier 3-day hackathon focused on artificial intelligence and machine learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Theme & Focus</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-6 h-6 text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">AI Innovation</h4>
                    <p className="text-gray-400">Build solutions using cutting-edge AI and ML technologies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="w-6 h-6 text-secondary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Real-world Impact</h4>
                    <p className="text-gray-400">Address genuine problems that affect communities and industries</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Code className="w-6 h-6 text-accent-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Technical Excellence</h4>
                    <p className="text-gray-400">Demonstrate strong technical implementation and innovation</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">March 15-17, 2025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-secondary-400" />
                  <span className="text-gray-300">72 hours of coding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent-400" />
                  <span className="text-gray-300">Your College Campus</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">Teams of 1-4 members</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Prizes & Recognition</h2>
            <p className="body-regular text-gray-400">
              Compete for amazing prizes and recognition from industry leaders
            </p>
          </motion.div>

          {/* Main Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {prizes.map((prize, index) => {
              const Icon = prize.icon
              return (
                <motion.div
                  key={prize.position}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`card card-hover text-center border ${prize.borderColor} ${prize.bgColor}`}
                >
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${prize.bgColor} mb-4`}>
                      <Icon className={`w-8 h-8 ${prize.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{prize.position}</h3>
                    <div className={`text-3xl font-bold ${prize.color}`}>{prize.amount}</div>
                  </div>
                  <p className="text-gray-400">
                    Plus internship opportunities and mentorship from industry experts
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Special Prizes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Special Category Prizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specialPrizes.map((prize, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">{prize.name}</span>
                  <span className="text-primary-400 font-semibold">{prize.amount}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Rules & Guidelines</h2>
            <p className="body-regular text-gray-400">
              Please read and follow these important guidelines
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <div className="space-y-4">
              {rules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-400 text-sm font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{rule}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Event Schedule</h2>
            <p className="body-regular text-gray-400">
              Detailed timeline of all hackathon activities
            </p>
          </motion.div>

          {/* Day Selector */}
          <div className="flex justify-center mb-12">
            <div className="glass rounded-lg p-1 flex space-x-1">
              {schedule.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeDay === day.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Day {day.id}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Timeline */}
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              {schedule.find(day => day.id === activeDay)?.day}
            </h3>
            
            <div className="space-y-6">
              {schedule.find(day => day.id === activeDay)?.events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)} mt-2`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-primary-400 font-mono text-sm">{event.time}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)} bg-opacity-20`}>
                        {event.type}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
            <p className="body-regular text-gray-400">
              Find answers to common questions about the hackathon
            </p>
          </motion.div>

          {/* FAQ Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFAQCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFAQCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <motion.div
            key={activeFAQCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {getFAQsByCategory(activeFAQCategory).map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="card hover:bg-white/5 transition-colors"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  {activeFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: activeFAQ === faq.id ? 'auto' : 0,
                    opacity: activeFAQ === faq.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-700 mt-4">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Details