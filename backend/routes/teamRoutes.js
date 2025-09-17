const express = require('express')
const { body, query } = require('express-validator')
const teamController = require('../controllers/teamController')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

const router = express.Router()

// Member validation schema
const memberValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .matches(/^[\d\s\-\+\(\)]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('branch')
    .isIn([
      'Computer Science',
      'Information Technology',
      'Electronics and Communication',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Biotechnology',
      'Other'
    ])
    .withMessage('Please select a valid branch'),
  
  body('usn')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('USN must be between 5 and 20 characters')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('USN can only contain uppercase letters and numbers')
    .customSanitizer(value => value.toUpperCase()),
  
  body('semester')
    .isIn(['1', '2', '3', '4', '5', '6', '7', '8', 'Other'])
    .withMessage('Please select a valid semester'),
  
  body('college')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('College name must be between 2 and 200 characters')
]

// Team registration validation
const teamRegistrationValidation = [
  body('teamName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Team name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/)
    .withMessage('Team name can only contain letters, numbers, spaces, hyphens, and underscores'),
  
  body('members')
    .isArray({ min: 1, max: 4 })
    .withMessage('Team must have between 1 and 4 members'),
  
  body('members.*').custom((member, { req }) => {
    // Validate each member object
    const requiredFields = ['name', 'email', 'phone', 'branch', 'usn', 'semester', 'college']
    for (const field of requiredFields) {
      if (!member[field]) {
        throw new Error(`${field} is required for all members`)
      }
    }
    return true
  }),
  
  body('projectIdea')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Project idea cannot exceed 1000 characters'),
  
  ...memberValidation.map(validation => 
    validation.replace('body(', 'body(\'members.*.')
  )
]

// Query validation for getting teams
const getTeamsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search term cannot exceed 100 characters'),
  
  query('status')
    .optional()
    .isIn(['registered', 'confirmed', 'cancelled'])
    .withMessage('Invalid status filter'),
  
  query('sortBy')
    .optional()
    .isIn(['teamName', 'submittedAt', 'status'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
]

// Status update validation
const statusUpdateValidation = [
  body('status')
    .isIn(['registered', 'confirmed', 'cancelled'])
    .withMessage('Invalid status value')
]

// Routes

// Public routes
router.post('/', teamRegistrationValidation, validate, teamController.registerTeam)

// Admin-only routes
router.get('/', adminAuth, getTeamsValidation, validate, teamController.getAllTeams)
router.get('/export', adminAuth, teamController.exportTeams)
router.get('/:id', adminAuth, teamController.getTeamById)
router.put('/:id/status', adminAuth, statusUpdateValidation, validate, teamController.updateTeamStatus)
router.put('/:id', adminAuth, teamRegistrationValidation, validate, teamController.updateTeam)
router.delete('/:id', adminAuth, teamController.deleteTeam)

module.exports = router