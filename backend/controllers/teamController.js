const Team = require('../models/Team')
const User = require('../models/User')
const { AppError } = require('../utils/errorHandler')

// Register a new team
exports.registerTeam = async (req, res, next) => {
  try {
    const { teamName, members, projectIdea } = req.body

    // Check if registration is still open
    const isOpen = await Team.isRegistrationOpen()
    if (!isOpen) {
      return next(new AppError('Registration is closed. Maximum number of teams reached.', 400))
    }

    // Check for duplicate team name
    const existingTeam = await Team.findOne({ 
      teamName: { $regex: new RegExp(`^${teamName}$`, 'i') } 
    })
    if (existingTeam) {
      return next(new AppError('A team with this name already exists', 400))
    }

    // Check for duplicate emails across all teams
    const memberEmails = members.map(m => m.email.toLowerCase())
    const existingEmailTeams = await Team.find({
      'members.email': { $in: memberEmails }
    })
    
    if (existingEmailTeams.length > 0) {
      const duplicateEmails = []
      existingEmailTeams.forEach(team => {
        team.members.forEach(member => {
          if (memberEmails.includes(member.email.toLowerCase())) {
            duplicateEmails.push(member.email)
          }
        })
      })
      return next(new AppError(`The following email(s) are already registered: ${duplicateEmails.join(', ')}`, 400))
    }

    // Check for duplicate USNs across all teams
    const memberUSNs = members.map(m => m.usn.toUpperCase())
    const existingUSNTeams = await Team.find({
      'members.usn': { $in: memberUSNs }
    })
    
    if (existingUSNTeams.length > 0) {
      const duplicateUSNs = []
      existingUSNTeams.forEach(team => {
        team.members.forEach(member => {
          if (memberUSNs.includes(member.usn.toUpperCase())) {
            duplicateUSNs.push(member.usn)
          }
        })
      })
      return next(new AppError(`The following USN(s) are already registered: ${duplicateUSNs.join(', ')}`, 400))
    }

    // Create new team
    const team = new Team({
      teamName,
      members,
      projectIdea,
      registeredBy: req.user ? req.user.userId : null // If user is authenticated
    })

    await team.save()

    // Get updated registration stats
    const stats = await Team.getRegistrationStats()

    res.status(201).json({
      status: 'success',
      message: 'Team registered successfully',
      data: {
        team,
        registrationStats: stats
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get all teams (Admin only)
exports.getAllTeams = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = '',
      sortBy = 'submittedAt',
      sortOrder = 'desc'
    } = req.query

    // Build query
    const query = {}
    
    if (search) {
      query.$or = [
        { teamName: { $regex: search, $options: 'i' } },
        { registrationNumber: { $regex: search, $options: 'i' } },
        { 'members.name': { $regex: search, $options: 'i' } },
        { 'members.email': { $regex: search, $options: 'i' } },
        { 'members.usn': { $regex: search, $options: 'i' } }
      ]
    }
    
    if (status) {
      query.status = status
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const [teams, totalCount] = await Promise.all([
      Team.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('registeredBy', 'name email'),
      Team.countDocuments(query)
    ])

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit))
    const hasNextPage = parseInt(page) < totalPages
    const hasPrevPage = parseInt(page) > 1

    // Get registration stats
    const stats = await Team.getRegistrationStats()

    res.status(200).json({
      status: 'success',
      data: {
        teams,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          limit: parseInt(limit),
          hasNextPage,
          hasPrevPage
        },
        stats
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get team by ID (Admin only)
exports.getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id).populate('registeredBy', 'name email')
    
    if (!team) {
      return next(new AppError('Team not found', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        team
      }
    })
  } catch (error) {
    next(error)
  }
}

// Update team status (Admin only)
exports.updateTeamStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
    
    if (!team) {
      return next(new AppError('Team not found', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Team status updated successfully',
      data: {
        team
      }
    })
  } catch (error) {
    next(error)
  }
}

// Update team (Admin only)
exports.updateTeam = async (req, res, next) => {
  try {
    const { teamName, members, projectIdea, status } = req.body
    
    const team = await Team.findById(req.params.id)
    if (!team) {
      return next(new AppError('Team not found', 404))
    }

    // Check for duplicate team name (excluding current team)
    if (teamName && teamName !== team.teamName) {
      const existingTeam = await Team.findOne({ 
        teamName: { $regex: new RegExp(`^${teamName}$`, 'i') },
        _id: { $ne: req.params.id }
      })
      if (existingTeam) {
        return next(new AppError('A team with this name already exists', 400))
      }
    }

    // Update team
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      {
        ...(teamName && { teamName }),
        ...(members && { members }),
        ...(projectIdea !== undefined && { projectIdea }),
        ...(status && { status }),
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    )

    res.status(200).json({
      status: 'success',
      message: 'Team updated successfully',
      data: {
        team: updatedTeam
      }
    })
  } catch (error) {
    next(error)
  }
}

// Delete team (Admin only)
exports.deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id)
    
    if (!team) {
      return next(new AppError('Team not found', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Team deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

// Export teams as CSV (Admin only)
exports.exportTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().sort({ submittedAt: -1 })

    // Create CSV content
    const csvHeaders = [
      'Registration Number',
      'Team Name',
      'Status',
      'Project Idea',
      'Submitted At',
      'Updated At',
      'Total Members',
      'Member 1 Name',
      'Member 1 Email',
      'Member 1 Phone',
      'Member 1 Branch',
      'Member 1 USN',
      'Member 1 Semester',
      'Member 1 College',
      'Member 2 Name',
      'Member 2 Email',
      'Member 2 Phone',
      'Member 2 Branch',
      'Member 2 USN',
      'Member 2 Semester',
      'Member 2 College',
      'Member 3 Name',
      'Member 3 Email',
      'Member 3 Phone',
      'Member 3 Branch',
      'Member 3 USN',
      'Member 3 Semester',
      'Member 3 College',
      'Member 4 Name',
      'Member 4 Email',
      'Member 4 Phone',
      'Member 4 Branch',
      'Member 4 USN',
      'Member 4 Semester',
      'Member 4 College'
    ]

    const csvRows = teams.map(team => {
      const row = [
        team.registrationNumber,
        team.teamName,
        team.status,
        team.projectIdea || '',
        team.submittedAt.toISOString(),
        team.updatedAt.toISOString(),
        team.members.length
      ]

      // Add member data (up to 4 members)
      for (let i = 0; i < 4; i++) {
        const member = team.members[i]
        if (member) {
          row.push(
            member.name,
            member.email,
            member.phone,
            member.branch,
            member.usn,
            member.semester,
            member.college
          )
        } else {
          // Add empty fields for missing members
          row.push('', '', '', '', '', '', '')
        }
      }

      return row
    })

    // Convert to CSV format
    const csvContent = [csvHeaders, ...csvRows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    // Set response headers
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="hackathon-teams.csv"')

    res.status(200).send(csvContent)
  } catch (error) {
    next(error)
  }
}