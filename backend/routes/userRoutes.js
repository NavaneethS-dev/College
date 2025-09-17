const express = require('express')
const { body } = require('express-validator')
const userController = require('../controllers/userController')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')

const router = express.Router()

// Profile update validation
const profileUpdateValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
]

// Team update validation (same as team registration but optional teamName)
const teamUpdateValidation = [
  body('teamName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Team name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/)
    .withMessage('Team name can only contain letters, numbers, spaces, hyphens, and underscores'),
  
  body('members')
    .optional()
    .isArray({ min: 1, max: 4 })
    .withMessage('Team must have between 1 and 4 members'),
  
  body('projectIdea')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Project idea cannot exceed 1000 characters')
]

// All user routes require authentication
router.use(auth)

// User profile routes
router.get('/profile', userController.getProfile)
router.put('/profile', profileUpdateValidation, validate, userController.updateProfile)

// User team routes
router.get('/team', userController.getMyTeam)
router.put('/team', teamUpdateValidation, validate, userController.updateMyTeam)

module.exports = router