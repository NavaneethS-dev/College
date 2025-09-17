import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Plus, 
  Trash2,
  LogOut,
  Calendar,
  Users,
  Trophy,
  Code,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Hash,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { userAPI } from '../services/api'
import toast from 'react-hot-toast'
import { useForm, useFieldArray } from 'react-hook-form'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members'
  })

  // Fetch user's team data
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await userAPI.getMyTeam()
        if (response.data.data.team) {
          setTeam(response.data.data.team)
          reset({
            teamName: response.data.data.team.teamName,
            projectIdea: response.data.data.team.projectIdea || '',
            members: response.data.data.team.members
          })
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          toast.error('Failed to fetch team data')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [reset])

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCancel = () => {
    setEditing(false)
    if (team) {
      reset({
        teamName: team.teamName,
        projectIdea: team.projectIdea || '',
        members: team.members
      })
    }
  }

  const handleSave = async (data) => {
    setSaving(true)
    try {
      const response = await userAPI.updateMyTeam(data)
      setTeam(response.data.data.team)
      setEditing(false)
      toast.success('Team updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update team')
    } finally {
      setSaving(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-400 mt-4">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gray-950"
    >
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Welcome, {user?.name}</span>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
              <p className="text-gray-400">{user?.email}</p>
              <p className="text-sm text-gray-500">Participant • HACK-AI-THON 2025</p>
            </div>
          </div>
        </motion.div>

        {!team ? (
          /* No Team Registered */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center py-12"
          >
            <div className="card max-w-md mx-auto">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Team Registered</h3>
              <p className="text-gray-400 mb-6">
                You haven't registered a team yet. Register your team to participate in HACK-AI-THON.
              </p>
              <a
                href="/register"
                className="btn-primary inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Register Team
              </a>
            </div>
          </motion.div>
        ) : (
          /* Team Information */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Team Header */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {editing ? 'Edit Team Information' : team.teamName}
                  </h2>
                  {!editing && (
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Registration: {team.registrationNumber}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        team.status === 'confirmed' ? 'text-green-400 bg-green-400/10' :
                        team.status === 'cancelled' ? 'text-red-400 bg-red-400/10' :
                        'text-yellow-400 bg-yellow-400/10'
                      }`}>
                        {team.status}
                      </span>
                    </div>
                  )}
                </div>
                
                {!editing ? (
                  <button
                    onClick={handleEdit}
                    className="btn-outline flex items-center"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Team
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCancel}
                      className="btn-secondary flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit(handleSave)}
                      disabled={saving}
                      className="btn-primary flex items-center"
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              {editing ? (
                /* Edit Form */
                <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
                  {/* Team Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      {...register('teamName', {
                        required: 'Team name is required',
                        minLength: {
                          value: 2,
                          message: 'Team name must be at least 2 characters'
                        }
                      })}
                      className={`input-field ${errors.teamName ? 'input-error' : ''}`}
                      placeholder="Enter team name"
                    />
                    {errors.teamName && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.teamName.message}
                      </p>
                    )}
                  </div>

                  {/* Project Idea */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Idea (Optional)
                    </label>
                    <textarea
                      {...register('projectIdea')}
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Describe your project idea..."
                    />
                  </div>
                </form>
              ) : (
                /* Display Mode */
                <div className="space-y-4">
                  {team.projectIdea && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Project Idea</h3>
                      <p className="text-gray-300 bg-gray-800/50 p-4 rounded-lg">
                        {team.projectIdea}
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-primary-400" />
                      <div>
                        <p className="text-sm text-gray-400">Registered</p>
                        <p className="text-white">{new Date(team.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-secondary-400" />
                      <div>
                        <p className="text-sm text-gray-400">Team Size</p>
                        <p className="text-white">{team.members.length} member{team.members.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-5 h-5 text-accent-400" />
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <p className="text-white capitalize">{team.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Team Members */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Team Members ({editing ? fields.length : team.members.length}/4)
                </h3>
                
                {editing && fields.length < 4 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="btn-outline text-sm px-4 py-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {editing ? (
                  /* Edit Members */
                  fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative p-6 bg-gray-800/50 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">
                          {index === 0 ? 'Team Leader' : `Member ${index + 1}`}
                        </h4>
                        
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMember(index)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            {...register(`members.${index}.name`, {
                              required: 'Name is required'
                            })}
                            className="input-field"
                            placeholder="Enter full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            {...register(`members.${index}.email`, {
                              required: 'Email is required'
                            })}
                            className="input-field"
                            placeholder="Enter email"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            {...register(`members.${index}.phone`, {
                              required: 'Phone is required'
                            })}
                            className="input-field"
                            placeholder="Enter phone"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Branch *
                          </label>
                          <select
                            {...register(`members.${index}.branch`, {
                              required: 'Branch is required'
                            })}
                            className="input-field"
                          >
                            <option value="">Select branch</option>
                            {branches.map((branch) => (
                              <option key={branch} value={branch}>
                                {branch}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            USN *
                          </label>
                          <input
                            type="text"
                            {...register(`members.${index}.usn`, {
                              required: 'USN is required'
                            })}
                            className="input-field"
                            placeholder="Enter USN"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Semester *
                          </label>
                          <select
                            {...register(`members.${index}.semester`, {
                              required: 'Semester is required'
                            })}
                            className="input-field"
                          >
                            <option value="">Select semester</option>
                            {semesters.map((semester) => (
                              <option key={semester} value={semester}>
                                {semester}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            College *
                          </label>
                          <input
                            type="text"
                            {...register(`members.${index}.college`, {
                              required: 'College is required'
                            })}
                            className="input-field"
                            placeholder="Enter college name"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  /* Display Members */
                  team.members.map((member, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gray-800/50 rounded-lg border border-gray-700"
                    >
                      <h4 className="text-lg font-semibold text-white mb-4">
                        {index === 0 ? 'Team Leader' : `Member ${index + 1}`}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-400">Name</p>
                            <p className="text-white">{member.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-400">Email</p>
                            <p className="text-white">{member.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-400">Phone</p>
                            <p className="text-white">{member.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-400">Branch</p>
                            <p className="text-white">{member.branch}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-400">USN</p>
                            <p className="text-white">{member.usn}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-400">Semester</p>
                            <p className="text-white">{member.semester}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 md:col-span-2 lg:col-span-3">
                          <Building className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-400">College</p>
                            <p className="text-white">{member.college}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Important Information */}
            <div className="card bg-blue-900/20 border-blue-500/30">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Important Information</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• You can edit your team information until the registration deadline</li>
                    <li>• All team members must be present during the hackathon</li>
                    <li>• Check your email regularly for important updates</li>
                    <li>• Contact organizers if you need to make major changes</li>
                    <li>• Your team registration is linked to your account - keep your login secure</li>
                    <li>• Only you can edit your team details - other members cannot make changes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/details"
                  className="flex items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group"
                >
                  <Calendar className="w-5 h-5 text-primary-400 mr-3" />
                  <div>
                    <div className="font-medium text-white group-hover:text-primary-400">View Schedule</div>
                    <div className="text-sm text-gray-400">Check event timeline</div>
                  </div>
                </a>
                
                <a
                  href="/details#faqs"
                  className="flex items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group"
                >
                  <AlertCircle className="w-5 h-5 text-secondary-400 mr-3" />
                  <div>
                    <div className="font-medium text-white group-hover:text-secondary-400">FAQs</div>
                    <div className="text-sm text-gray-400">Get answers to common questions</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Dashboard