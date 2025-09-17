const User = require('../models/User')
const Team = require('../models/Team')
const { AppError } = require('../utils/errorHandler')

// Get user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
    
    if (!user) {
      return next(new AppError('User not found', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    })
  } catch (error) {
    next(error)
  }
}

// Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body
    
    // Check if email is being changed and if it's already taken
    if (email) {
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: req.user.userId }
      })
      
      if (existingUser) {
        return next(new AppError('Email is already taken', 400))
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        ...(name && { name }),
        ...(email && { email: email.toLowerCase() }),
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    )

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        user
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get user's team
exports.getMyTeam = async (req, res, next) => {
  try {
    const team = await Team.findOne({ registeredBy: req.user.userId })
    
    if (!team) {
      return next(new AppError('No team found for this user', 404))
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

// Update user's team
exports.updateMyTeam = async (req, res, next) => {
  try {
    const { teamName, members, projectIdea } = req.body
    
    const team = await Team.findOne({ registeredBy: req.user.userId })
    
    if (!team) {
      return next(new AppError('No team found for this user', 404))
    }

    // Check if team can be edited
    if (!team.canBeEdited()) {
      return next(new AppError('Team cannot be edited in its current status', 400))
    }

    // Check for duplicate team name (excluding current team)
    if (teamName && teamName !== team.teamName) {
      const existingTeam = await Team.findOne({ 
        teamName: { $regex: new RegExp(`^${teamName}$`, 'i') },
        _id: { $ne: team._id }
      })
      if (existingTeam) {
        return next(new AppError('A team with this name already exists', 400))
      }
    }

    // If members are being updated, check for duplicates
    if (members) {
      // Check for duplicate emails across all teams (excluding current team)
      const memberEmails = members.map(m => m.email.toLowerCase())
      const existingEmailTeams = await Team.find({
        'members.email': { $in: memberEmails },
        _id: { $ne: team._id }
      })
      
      if (existingEmailTeams.length > 0) {
        const duplicateEmails = []
        existingEmailTeams.forEach(existingTeam => {
          existingTeam.members.forEach(member => {
            if (memberEmails.includes(member.email.toLowerCase())) {
              duplicateEmails.push(member.email)
            }
          })
        })
        return next(new AppError(`The following email(s) are already registered: ${duplicateEmails.join(', ')}`, 400))
      }

      // Check for duplicate USNs across all teams (excluding current team)
      const memberUSNs = members.map(m => m.usn.toUpperCase())
      const existingUSNTeams = await Team.find({
        'members.usn': { $in: memberUSNs },
        _id: { $ne: team._id }
      })
      
      if (existingUSNTeams.length > 0) {
        const duplicateUSNs = []
        existingUSNTeams.forEach(existingTeam => {
          existingTeam.members.forEach(member => {
            if (memberUSNs.includes(member.usn.toUpperCase())) {
              duplicateUSNs.push(member.usn)
            }
          })
        })
        return next(new AppError(`The following USN(s) are already registered: ${duplicateUSNs.join(', ')}`, 400))
      }
    }

    // Update team
    const updatedTeam = await Team.findByIdAndUpdate(
      team._id,
      {
        ...(teamName && { teamName }),
        ...(members && { members }),
        ...(projectIdea !== undefined && { projectIdea }),
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