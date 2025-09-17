// Helper utility functions

const generateRegistrationNumber = (count) => {
  const year = new Date().getFullYear()
  const paddedCount = String(count + 1).padStart(4, '0')
  return `HAI-${year}-${paddedCount}`
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const generateCSV = (data, headers) => {
  const csvHeaders = headers.join(',')
  const csvRows = data.map(row => 
    row.map(field => `"${field}"`).join(',')
  )
  
  return [csvHeaders, ...csvRows].join('\n')
}

const paginate = (query, page = 1, limit = 10) => {
  const skip = (parseInt(page) - 1) * parseInt(limit)
  return query.skip(skip).limit(parseInt(limit))
}

const buildSearchQuery = (searchTerm, fields) => {
  if (!searchTerm) return {}
  
  return {
    $or: fields.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  }
}

const calculatePagination = (totalCount, page, limit) => {
  const totalPages = Math.ceil(totalCount / parseInt(limit))
  const currentPage = parseInt(page)
  
  return {
    currentPage,
    totalPages,
    totalCount,
    limit: parseInt(limit),
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  }
}

const sanitizeObject = (obj, allowedFields) => {
  const sanitized = {}
  
  allowedFields.forEach(field => {
    if (obj[field] !== undefined) {
      sanitized[field] = obj[field]
    }
  })
  
  return sanitized
}

const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

module.exports = {
  generateRegistrationNumber,
  formatDate,
  formatDateTime,
  generateCSV,
  paginate,
  buildSearchQuery,
  calculatePagination,
  sanitizeObject,
  isValidObjectId,
  delay,
  asyncHandler
}