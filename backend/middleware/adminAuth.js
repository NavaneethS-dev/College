const jwt = require('jsonwebtoken')
const { AppError } = require('../utils/errorHandler')

const adminAuth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Access denied. No token provided.', 401))
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify admin token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN)
    } catch (jwtError) {
      return next(new AppError('Invalid admin token.', 401))
    }

    // Check if the token is for admin role
    if (decoded.role !== 'admin') {
      return next(new AppError('Access denied. Admin privileges required.', 403))
    }

    // Add admin info to request
    req.admin = {
      userId: decoded.userId,
      role: decoded.role
    }

    next()
  } catch (error) {
    next(new AppError('Admin authentication failed.', 401))
  }
}

module.exports = adminAuth