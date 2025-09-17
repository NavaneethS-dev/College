const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Member email is required'],
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [
      /^[\d\s\-\+\(\)]{10,15}$/,
      'Please provide a valid phone number'
    ]
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    enum: [
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
  },
  usn: {
    type: String,
    required: [true, 'USN is required'],
    uppercase: true,
    trim: true,
    minlength: [5, 'USN must be at least 5 characters'],
    maxlength: [20, 'USN cannot exceed 20 characters'],
    match: [
      /^[A-Z0-9]+$/,
      'USN can only contain uppercase letters and numbers'
    ]
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', 'Other']
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    minlength: [2, 'College name must be at least 2 characters'],
    maxlength: [200, 'College name cannot exceed 200 characters']
  }
}, { _id: false })

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Team name is required'],
    trim: true,
    minlength: [2, 'Team name must be at least 2 characters'],
    maxlength: [100, 'Team name cannot exceed 100 characters'],
    match: [
      /^[a-zA-Z0-9\s\-_]+$/,
      'Team name can only contain letters, numbers, spaces, hyphens, and underscores'
    ]
  },
  registrationNumber: {
    type: String,
    unique: true,
    required: true
  },
  members: {
    type: [memberSchema],
    required: [true, 'At least one member is required'],
    validate: [
      {
        validator: function(members) {
          return members.length >= 1 && members.length <= 4
        },
        message: 'Team must have between 1 and 4 members'
      },
      {
        validator: function(members) {
          // Check for duplicate emails
          const emails = members.map(m => m.email.toLowerCase())
          return emails.length === new Set(emails).size
        },
        message: 'All members must have unique email addresses'
      },
      {
        validator: function(members) {
          // Check for duplicate USNs
          const usns = members.map(m => m.usn.toUpperCase())
          return usns.length === new Set(usns).size
        },
        message: 'All members must have unique USNs'
      }
    ]
  },
  projectIdea: {
    type: String,
    trim: true,
    maxlength: [1000, 'Project idea cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['registered', 'confirmed', 'cancelled'],
    default: 'registered'
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous registration for now
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Indexes for better query performance
teamSchema.index({ registrationNumber: 1 })
teamSchema.index({ status: 1 })
teamSchema.index({ submittedAt: -1 })
teamSchema.index({ 'members.email': 1 })
teamSchema.index({ 'members.usn': 1 })
teamSchema.index({ registeredBy: 1 })

// Pre-save middleware to generate registration number
teamSchema.pre('save', async function(next) {
  if (this.isNew && !this.registrationNumber) {
    try {
      // Generate registration number: HAI-YYYY-NNNN
      const year = new Date().getFullYear()
      const count = await this.constructor.countDocuments()
      const paddedCount = String(count + 1).padStart(4, '0')
      this.registrationNumber = `HAI-${year}-${paddedCount}`
    } catch (error) {
      return next(error)
    }
  }
  
  this.updatedAt = Date.now()
  next()
})

// Static method to get registration stats
teamSchema.statics.getRegistrationStats = async function() {
  const totalTeams = await this.countDocuments()
  const maxTeams = parseInt(process.env.MAX_TEAMS) || 50
  const remainingSlots = Math.max(0, maxTeams - totalTeams)
  const isOpen = remainingSlots > 0
  
  return {
    totalTeams,
    maxTeams,
    remainingSlots,
    isOpen
  }
}

// Static method to check if registration is open
teamSchema.statics.isRegistrationOpen = async function() {
  const stats = await this.getRegistrationStats()
  return stats.isOpen
}

// Instance method to check if team can be edited
teamSchema.methods.canBeEdited = function() {
  return this.status === 'registered'
}

// Transform output
teamSchema.methods.toJSON = function() {
  const team = this.toObject()
  delete team.__v
  return team
}

module.exports = mongoose.model('Team', teamSchema)