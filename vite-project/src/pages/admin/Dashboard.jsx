import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Download, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Eye,
  Trash2,
  LogOut,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Hash,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { teamsAPI, downloadCSV } from '../../services/api'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const Dashboard = () => {
  const { admin, logout } = useAuth()
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [showTeamModal, setShowTeamModal] = useState(false)
  
  // Filters and pagination
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    sortBy: 'submittedAt',
    sortOrder: 'desc'
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10
  })
  const [stats, setStats] = useState({
    totalTeams: 0,
    maxTeams: 50,
    remainingSlots: 50
  })

  // Fetch teams data
  const fetchTeams = async (page = 1) => {
    setLoading(true)
    try {
      const params = {
        page,
        limit: pagination.limit,
        ...filters
      }
      
      const response = await teamsAPI.getAll(params)
      const data = response.data.data
      
      setTeams(data.teams)
      setPagination(data.pagination)
      setStats(data.stats)
    } catch (error) {
      toast.error('Failed to fetch teams')
      console.error('Error fetching teams:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchTeams()
  }, [])

  // Refetch when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTeams(1)
    }, 500) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [filters])

  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }))
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handlePageChange = (page) => {
    fetchTeams(page)
  }

  const handleExport = async () => {
    setExporting(true)
    try {
      const response = await teamsAPI.export()
      const timestamp = new Date().toISOString().split('T')[0]
      downloadCSV(response.data, `hackathon-teams-${timestamp}.csv`)
      toast.success('Teams exported successfully!')
    } catch (error) {
      toast.error('Failed to export teams')
    } finally {
      setExporting(false)
    }
  }

  const handleViewTeam = (team) => {
    setSelectedTeam(team)
    setShowTeamModal(true)
  }

  const handleDeleteTeam = async (teamId) => {
    if (!confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      return
    }

    try {
      await teamsAPI.delete(teamId)
      toast.success('Team deleted successfully')
      fetchTeams(pagination.currentPage)
    } catch (error) {
      toast.error('Failed to delete team')
    }
  }

  const handleUpdateStatus = async (teamId, status) => {
    try {
      await teamsAPI.updateStatus(teamId, status)
      toast.success('Team status updated successfully')
      fetchTeams(pagination.currentPage)
    } catch (error) {
      toast.error('Failed to update team status')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400 bg-green-400/10'
      case 'cancelled':
        return 'text-red-400 bg-red-400/10'
      default:
        return 'text-yellow-400 bg-yellow-400/10'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return CheckCircle
      case 'cancelled':
        return XCircle
      default:
        return Clock
    }
  }

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
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Welcome, {admin?.name}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => fetchTeams(pagination.currentPage)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-3 bg-primary-500/20 rounded-lg">
                <Users className="w-6 h-6 text-primary-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Total Teams</p>
                <p className="text-2xl font-bold text-white">{stats.totalTeams}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-3 bg-secondary-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-secondary-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Remaining Slots</p>
                <p className="text-2xl font-bold text-white">{stats.remainingSlots}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-3 bg-accent-500/20 rounded-lg">
                <GraduationCap className="w-6 h-6 text-accent-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Fill Rate</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round((stats.totalTeams / stats.maxTeams) * 100)}%
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="input-field pl-10 w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input-field"
              >
                <option value="">All Status</option>
                <option value="registered">Registered</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Sort */}
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-')
                  handleFilterChange('sortBy', sortBy)
                  handleFilterChange('sortOrder', sortOrder)
                }}
                className="input-field"
              >
                <option value="submittedAt-desc">Newest First</option>
                <option value="submittedAt-asc">Oldest First</option>
                <option value="teamName-asc">Team Name A-Z</option>
                <option value="teamName-desc">Team Name Z-A</option>
              </select>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              disabled={exporting}
              className="btn-primary flex items-center"
            >
              {exporting ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Export CSV
            </button>
          </div>
        </motion.div>

        {/* Teams Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : teams.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No teams found</h3>
              <p className="text-gray-500">
                {filters.search || filters.status 
                  ? 'Try adjusting your filters' 
                  : 'No teams have registered yet'
                }
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Team
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Members
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Registered
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {teams.map((team, index) => {
                      const StatusIcon = getStatusIcon(team.status)
                      return (
                        <motion.tr
                          key={team._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="hover:bg-gray-800/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-white">
                                {team.teamName}
                              </div>
                              <div className="text-sm text-gray-400">
                                {team.registrationNumber}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-300">
                              {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                            </div>
                            <div className="text-xs text-gray-500">
                              Leader: {team.members[0]?.name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(team.status)}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {team.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {new Date(team.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleViewTeam(team)}
                                className="p-2 text-gray-400 hover:text-primary-400 hover:bg-gray-800 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              
                              <div className="relative group">
                                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                                
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                  <div className="py-1">
                                    <button
                                      onClick={() => handleUpdateStatus(team._id, 'confirmed')}
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                      Mark as Confirmed
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(team._id, 'registered')}
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                      Mark as Registered
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(team._id, 'cancelled')}
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                      Mark as Cancelled
                                    </button>
                                    <hr className="border-gray-700 my-1" />
                                    <button
                                      onClick={() => handleDeleteTeam(team._id)}
                                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300"
                                    >
                                      <Trash2 className="w-4 h-4 inline mr-2" />
                                      Delete Team
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of{' '}
                    {pagination.totalCount} results
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <span className="text-sm text-gray-400">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Team Details Modal */}
      {showTeamModal && selectedTeam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTeam.teamName}</h2>
                  <p className="text-gray-400">{selectedTeam.registrationNumber}</p>
                </div>
                <button
                  onClick={() => setShowTeamModal(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {selectedTeam.members.map((member, index) => (
                  <div key={index} className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {index === 0 ? 'Team Leader' : `Member ${index + 1}`}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{member.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{member.email}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{member.phone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{member.branch}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{member.usn}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">Semester {member.semester}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{member.college}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Registered on {new Date(selectedTeam.submittedAt).toLocaleString()}
                </div>
                
                <div className="flex items-center space-x-2">
                  {['registered', 'confirmed', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        handleUpdateStatus(selectedTeam._id, status)
                        setShowTeamModal(false)
                      }}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedTeam.status === status
                          ? getStatusColor(status)
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default Dashboard