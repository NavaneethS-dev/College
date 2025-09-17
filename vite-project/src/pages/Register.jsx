import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { 
  Users, 
  UserPlus, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Info,
  Lock
} from 'lucide-react'
import toast from 'react-hot-toast'
import { teamsAPI, statusAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationStats, setRegistrationStats] = useState({
    totalTeams: 0,
    remainingSlots: 50,
    isOpen: true
  })

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      teamName: '',
      members: [
        {
          name: '',
          email: '',
          phone: '',
          branch: '',
          usn: '',
          semester: '',
          college: ''
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members'
  })

  const watchedMembers = watch('members')

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4" />
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen bg-gray-950 flex items-center justify-center"
      >
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="card">
            <Lock className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Login Required</h1>
            <p className="text-gray-400 mb-6">
              You need to be logged in to register your team for HACK-AI-THON.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/auth/login', { state: { from: { pathname: '/register' } } })}
                className="w-full btn-primary"
              >
                Login to Continue
              </button>
              <button
                onClick={() => navigate('/auth/signup')}
                className="w-full btn-outline"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full btn-ghost"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Fetch registration stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statusAPI.get()
        setRegistrationStats(response.data.data.registration)
      } catch (error) {
        console.error('Failed to fetch registration stats:', error)
      }
    }

    fetchStats()
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

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

  const addMember = () => {
    if (fields.length < 4) {
      append({
        name: '',
        email: '',
        phone: '',
        branch: '',
        usn: '',
        semester: '',
        college: ''
      })
    }
  }

  const removeMember = (index) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  const onSubmit = async (data) => {
    if (!registrationStats.isOpen) {
      toast.error('Registration is closed!')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await teamsAPI.register(data)
      
      toast.success('Team registered successfully!', {
        duration: 5000,
        icon: '🎉'
      })

      // Update stats
      setRegistrationStats(response.data.data.registrationStats)

      // Reset form
      reset()

      // Show success message with registration details
      const team = response.data.data.team
      toast.success(
        `Registration Number: ${team.registrationNumber}`,
        {
          duration: 10000,
          icon: '📝'
        }
      )

    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const branches = [
    'Computer Science',
    'Information Technology',
    'Electronics and Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Biotechnology',
    'Other'
  ]

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8', 'Other']

  if (!registrationStats.isOpen) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen bg-gray-950 flex items-center justify-center"
      >
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="card">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Registration Closed</h1>
            <p className="text-gray-400 mb-6">
              We've reached the maximum number of teams (50). Thank you for your interest in HACK-AI-THON!
            </p>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{registrationStats.totalTeams}/50</div>
              <div className="text-gray-500 text-sm">Teams Registered</div>
            </div>
          </div>
        </div>
      </motion.div>
    )
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
      <section className="relative py-20 bg-gradient-to-br from-primary-900 via-purple-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants}
              className="heading-1 mb-6"
            >
              Team <span className="text-gradient">Registration</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="body-large text-gray-300 mb-8"
            >
              Register your team for HACK-AI-THON and join the most exciting AI/ML hackathon of the year!
            </motion.p>

            {/* Registration Stats */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center items-center space-x-8 mb-8"
            >
              <div className="glass px-6 py-4 rounded-lg">
                <div className="text-2xl font-bold text-primary-400">{registrationStats.totalTeams}</div>
                <div className="text-gray-400 text-sm">Teams Registered</div>
              </div>
              <div className="glass px-6 py-4 rounded-lg">
                <div className="text-2xl font-bold text-secondary-400">{registrationStats.remainingSlots}</div>
                <div className="text-gray-400 text-sm">Slots Remaining</div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div variants={itemVariants} className="max-w-md mx-auto">
              <div className="bg-gray-800 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(registrationStats.totalTeams / 50) * 100}%` }}
                />
              </div>
              <p className="text-gray-400 text-sm">
                {Math.round((registrationStats.totalTeams / 50) * 100)}% filled
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Team Name */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-primary-400" />
                Team Information
              </h2>
              
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name *
                </label>
                <input
                  id="teamName"
                  type="text"
                  {...register('teamName', {
                    required: 'Team name is required',
                    minLength: {
                      value: 2,
                      message: 'Team name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 100,
                      message: 'Team name cannot exceed 100 characters'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9\s\-_]+$/,
                      message: 'Team name can only contain letters, numbers, spaces, hyphens, and underscores'
                    }
                  })}
                  className={`input-field ${errors.teamName ? 'input-error' : ''}`}
                  placeholder="Enter your team name"
                />
                {errors.teamName && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.teamName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Team Members */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <UserPlus className="w-6 h-6 mr-3 text-secondary-400" />
                  Team Members ({fields.length}/4)
                </h2>
                
                {fields.length < 4 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="btn-outline text-sm px-4 py-2"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative p-6 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        {index === 0 ? 'Team Leader' : `Member ${index + 1}`}
                      </h3>
                      
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMember(index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                          aria-label={`Remove member ${index + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          {...register(`members.${index}.name`, {
                            required: 'Name is required',
                            minLength: {
                              value: 2,
                              message: 'Name must be at least 2 characters'
                            },
                            pattern: {
                              value: /^[a-zA-Z\s]+$/,
                              message: 'Name can only contain letters and spaces'
                            }
                          })}
                          className={`input-field ${errors.members?.[index]?.name ? 'input-error' : ''}`}
                          placeholder="Enter full name"
                        />
                        {errors.members?.[index]?.name && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.members[index].name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          {...register(`members.${index}.email`, {
                            required: 'Email is required',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Please enter a valid email address'
                            }
                          })}
                          className={`input-field ${errors.members?.[index]?.email ? 'input-error' : ''}`}
                          placeholder="Enter email address"
                        />
                        {errors.members?.[index]?.email && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.members[index].email.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          {...register(`members.${index}.phone`, {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^[\d\s\-\+\(\)]{10,15}$/,
                              message: 'Please enter a valid phone number'
                            }
                          })}
                          className={`input-field ${errors.members?.[index]?.phone ? 'input-error' : ''}`}
                          placeholder="Enter phone number"
                        />
                        {errors.members?.[index]?.phone && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.members[index].phone.message}
                          </p>
                        )}
                      </div>

                      {/* Branch */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Branch *
                        </label>
                        <select
                          {...register(`members.${index}.branch`, {
                            required: 'Branch is required'
                          })}
                          className={`input-field ${errors.members?.[index]?.branch ? 'input-error' : ''}`}
                        >
                          <option value="">Select branch</option>
                          {branches.map((branch) => (
                            <option key={branch} value={branch}>
                              {branch}
                            </option>
                          ))}
                        </select>
                        {errors.members?.[index]?.branch && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.members[index].branch.message}
                          </p>
                        )}
                      </div>

                      {/* USN */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          USN *
                        </label>
                        <input
                          type="text"
                          {...register(`members.${index}.usn`, {
                            required: 'USN is required',
                            minLength: {
                              value: 5,
                              message: 'USN must be at least 5 characters'
                            },
                            pattern: {
                              value: /^[A-Z0-9]+$/,
                              message: 'USN can only contain uppercase letters and numbers'
                            }
                          })}
                          className={`input-field ${errors.members?.[index]?.usn ? 'input-error' : ''}`}
                          placeholder="Enter USN"
                          style={{ textTransform: 'uppercase' }}
                        />
                        {errors.members?.[index]?.usn && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.members[index].usn.message}
                          </p>
                        )}
                      </div>

                      {/* Semester */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Semester *
                        </label>
                        <select
                          {...register(`members.${index}.semester`, {
                            required: 'Semester is required'
                          })}
                          className={`input-field ${errors.members?.[index]?.semester ? 'input-error' : ''}`}
                        >
                          <option value="">Select semester</option>
                          {semesters.map((semester) => (
                            <option key={semester} value={semester}>
                              {semester}
                            </option>
                          ))}
                        </select>
                        {errors.members?.[index]?.semester && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.members[index].semester.message}
                          </p>
                        )}
                      </div>

                      {/* College */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          College Name *
                        </label>
                        <input
                          type="text"
                          {...register(`members.${index}.college`, {
                            required: 'College name is required',
                            minLength: {
                              value: 2,
                              message: 'College name must be at least 2 characters'
                            }
                          })}
                          className={`input-field ${errors.members?.[index]?.college ? 'input-error' : ''}`}
                          placeholder="Enter college name"
                        />
                        {errors.members?.[index]?.college && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.members[index].college.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Important Information */}
            <div className="card bg-blue-900/20 border-blue-500/30">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Important Information</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• All team members must be students or recent graduates</li>
                    <li>• Each team member can only be part of one team</li>
                    <li>• Registration is limited to 50 teams (first come, first served)</li>
                    <li>• You'll receive a confirmation email with your registration number</li>
                    <li>• Make sure all information is accurate as it cannot be changed later</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting || !registrationStats.isOpen}
                className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Registering Team...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Register Team
                  </>
                )}
              </button>
              
              {!registrationStats.isOpen && (
                <p className="mt-2 text-red-400 text-sm">
                  Registration is currently closed
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </section>
    </motion.div>
  )
}

export default Register