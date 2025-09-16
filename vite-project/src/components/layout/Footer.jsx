import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram,
  ExternalLink,
  Heart
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@hackathon.com',
      href: 'mailto:contact@hackathon.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Your College Campus',
      href: 'https://maps.google.com'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/hackathon'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/hackathon'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/hackathon'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/hackathon'
    }
  ]

  const quickLinks = [
    { name: 'About', href: '/details' },
    { name: 'Schedule', href: '/details#schedule' },
    { name: 'FAQs', href: '/details#faqs' },
    { name: 'Register', href: '/register' },
    { name: 'Contact', href: '#contact' }
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Code of Conduct', href: '/conduct' }
  ]

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

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="px-4 py-12 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <Code className="h-8 w-8 text-primary-500" />
                  <motion.div
                    className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                <span className="text-2xl font-bold text-gradient">
                  HACK-AI-THON
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The premier AI/ML hackathon bringing together the brightest minds 
                to solve real-world challenges through innovative technology solutions.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass hover:bg-white/20 p-2 rounded-lg text-gray-400 hover:text-primary-400 transition-all duration-200 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-4">
                {contactInfo.map((contact) => {
                  const Icon = contact.icon
                  return (
                    <li key={contact.label}>
                      <a
                        href={contact.href}
                        className="flex items-start space-x-3 text-gray-400 hover:text-primary-400 transition-colors duration-200 group"
                      >
                        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:text-primary-400" />
                        <div>
                          <div className="text-sm text-gray-500">{contact.label}</div>
                          <div className="group-hover:text-primary-400">{contact.value}</div>
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Get the latest updates about HACK-AI-THON and future events.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="w-full btn-primary text-sm py-2"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 px-4 py-6 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>© {currentYear} HACK-AI-THON. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>for innovation.</span>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer