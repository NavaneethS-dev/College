const Team = require('../models/Team')

// Get registration status
exports.getStatus = async (req, res, next) => {
  try {
    // Get registration stats
    const registrationStats = await Team.getRegistrationStats()

    // Get status by team status
    const statusCounts = await Team.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    const statusBreakdown = {
      registered: 0,
      confirmed: 0,
      cancelled: 0
    }

    statusCounts.forEach(item => {
      statusBreakdown[item._id] = item.count
    })

    // Get recent registrations (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentRegistrations = await Team.countDocuments({
      submittedAt: { $gte: sevenDaysAgo }
    })

    res.status(200).json({
      status: 'success',
      data: {
        registration: registrationStats,
        statusBreakdown,
        recentRegistrations,
        lastUpdated: new Date().toISOString()
      }
    })
  } catch (error) {
    next(error)
  }
}