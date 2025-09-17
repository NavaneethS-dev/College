const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { AppError } = require('../utils/errorHandler')

// Generate JWT token
const generateToken = (userId, role = 'participant') => {
  const secret = role === 'admin' ? process.env.JWT_SECRET_ADMIN : process.env.JWT_SECRET_USER
  return jwt.sign(
    { userId, role },
    secret,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  )
}

// User signup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return next(new AppError('User with this email already exists', 400))
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: 'participant'
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id, user.role)

    // Update last login
    await user.updateLastLogin()

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        },
        token
      }
    })
  } catch (error) {
    next(error)
  }
}

// User login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find user and include password field
    const user = await User.findByEmail(email).select('+password')
    if (!user) {
      return next(new AppError('Invalid email or password', 401))
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return next(new AppError('Invalid email or password', 401))
    }

    // Generate token
    const token = generateToken(user._id, user.role)

    // Update last login
    await user.updateLastLogin()

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin
        },
        token
      }
    })
  } catch (error) {
    next(error)
  }
}

// Admin login
exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Check against environment variables for admin credentials
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    const adminName = process.env.ADMIN_NAME || 'Admin User'

    if (!adminEmail || !adminPassword) {
      return next(new AppError('Admin credentials not configured', 500))
    }

    // Validate admin credentials
    if (email !== adminEmail) {
      return next(new AppError('Invalid admin credentials', 401))
    }

    // For demo purposes, we'll do a simple password comparison
    // In production, you might want to hash the admin password too
    const isPasswordValid = password === adminPassword

    if (!isPasswordValid) {
      return next(new AppError('Invalid admin credentials', 401))
    }

    // Generate admin token
    const token = generateToken('admin', 'admin')

    res.status(200).json({
      status: 'success',
      message: 'Admin login successful',
      data: {
        admin: {
          id: 'admin',
          name: adminName,
          email: adminEmail,
          role: 'admin'
        },
        token
      }
    })
  } catch (error) {
    next(error)
  }
}