const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { AppError } = require('../utils/errorHandler')

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Access denied. No token provided.', 401))
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_USER)
    } catch (jwtError) {
      return next(new AppError('Invalid token.', 401))
    }

    // Check if user still exists
    const user = await User.findById(decoded.userId)
    if (!user) {
      return next(new AppError('User no longer exists.', 401))
    }

    // Add user info to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      user: user
    }

    next()
  } catch (error) {
    next(new AppError('Authentication failed.', 401))
  }
}

module.exports = auth