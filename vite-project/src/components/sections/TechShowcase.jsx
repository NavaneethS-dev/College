import { motion } from 'framer-motion'
import { Code, Cpu, Zap, Users, Brain, Rocket } from 'lucide-react'
import TechImageCard from '../ui/TechImageCard'

const TechShowcase = () => {
  const techImages = [
    {
      src: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'AI and Machine Learning',
      title: 'AI & Machine Learning',
      description: 'Explore cutting-edge AI technologies and build intelligent solutions',
      icon: Brain,
      animationType: 'hover-zoom'
    },
    {
      src: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Team Collaboration',
      title: 'Team Collaboration',
      description: 'Work together with brilliant minds from diverse backgrounds',
      icon: Users,
      animationType: 'float'
    },
    {
      src: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Innovation Lab',
      title: 'Innovation Lab',
      description: 'Access to latest tools and technologies for rapid prototyping',
      icon: Rocket,
      animationType: 'hover-zoom'
    },
    {
      src: 'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Coding Competition',
      title: 'Coding Excellence',
      description: 'Push your programming skills to the limit in intense competitions',
      icon: Code,
      animationType: 'glitch'
    },
    {
      src: 'https://images.pexels.com/photos/159201/circuit-circuit-board-resistor-computer-159201.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Hardware Innovation',
      title: 'Hardware Meets Software',
      description: 'Integrate hardware solutions with software innovations',
      icon: Cpu,
      animationType: 'hover-zoom'
    },
    {
      src: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Future Technology',
      title: 'Future Tech',
      description: 'Build tomorrow\'s technology solutions today',
      icon: Zap,
      animationType: 'float'
    }
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

  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Technology Showcase</h2>
          <p className="body-regular text-gray-400 max-w-3xl mx-auto">
            Immerse yourself in the latest technologies and innovation opportunities 
            that await you at HACK-AI-THON
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {techImages.map((tech, index) => (
            <TechImageCard
              key={index}
              src={tech.src}
              alt={tech.alt}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              animationType={tech.animationType}
              className="h-full"
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="glass-dark rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build the Future?
            </h3>
            <p className="text-gray-400 mb-6">
              Join us and turn your innovative ideas into reality with cutting-edge technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="btn-primary">
                Register Your Team
              </a>
              <a href="/details" className="btn-outline">
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechShowcase