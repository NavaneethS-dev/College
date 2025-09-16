// Utility functions for formatting data

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  // Return original if not a standard format
  return phone
}

export const formatUSN = (usn) => {
  return usn.toUpperCase().trim()
}

export const formatTeamName = (teamName) => {
  return teamName.trim()
}

export const formatMemberName = (name) => {
  return name
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const formatEmail = (email) => {
  return email.toLowerCase().trim()
}

export const formatRegistrationNumber = (regNumber) => {
  return regNumber.toUpperCase()
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatPercentage = (value, total, decimals = 0) => {
  if (total === 0) return '0%'
  return ((value / total) * 100).toFixed(decimals) + '%'
}

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number)
}

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export const capitalizeFirst = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const capitalizeWords = (text) => {
  return text
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ')
}

// Format countdown time
export const formatCountdownTime = (timeLeft) => {
  const { days, hours, minutes, seconds } = timeLeft
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

// Format team member count
export const formatMemberCount = (count) => {
  return `${count} member${count !== 1 ? 's' : ''}`
}

// Format status badge text
export const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}