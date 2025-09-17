const express = require('express')
const statusController = require('../controllers/statusController')

const router = express.Router()

// Public route to get registration status
router.get('/', statusController.getStatus)

module.exports = router