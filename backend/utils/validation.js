// Validation utility functions

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/
  return phoneRegex.test(phone)
}

const validateUSN = (usn) => {
  const usnRegex = /^[A-Z0-9]+$/
  return usnRegex.test(usn) && usn.length >= 5 && usn.length <= 20
}

const validateTeamName = (teamName) => {
  const teamNameRegex = /^[a-zA-Z0-9\s\-_]+$/
  return teamNameRegex.test(teamName) && teamName.length >= 2 && teamName.length <= 100
}

const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/
  return nameRegex.test(name) && name.length >= 2 && name.length <= 100
}

const validatePassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  return passwordRegex.test(password) && password.length >= 8
}

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  // Remove potentially dangerous characters
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
}

const validateTeamMembers = (members) => {
  if (!Array.isArray(members)) {
    return { isValid: false, message: 'Members must be an array' }
  }
  
  if (members.length < 1 || members.length > 4) {
    return { isValid: false, message: 'Team must have between 1 and 4 members' }
  }
  
  // Check for duplicate emails
  const emails = members.map(m => m.email?.toLowerCase()).filter(Boolean)
  if (emails.length !== new Set(emails).size) {
    return { isValid: false, message: 'All members must have unique email addresses' }
  }
  
  // Check for duplicate USNs
  const usns = members.map(m => m.usn?.toUpperCase()).filter(Boolean)
  if (usns.length !== new Set(usns).size) {
    return { isValid: false, message: 'All members must have unique USNs' }
  }
  
  // Validate each member
  for (let i = 0; i < members.length; i++) {
    const member = members[i]
    
    if (!member.name || !validateName(member.name)) {
      return { isValid: false, message: `Invalid name for member ${i + 1}` }
    }
    
    if (!member.email || !validateEmail(member.email)) {
      return { isValid: false, message: `Invalid email for member ${i + 1}` }
    }
    
    if (!member.phone || !validatePhone(member.phone)) {
      return { isValid: false, message: `Invalid phone number for member ${i + 1}` }
    }
    
    if (!member.usn || !validateUSN(member.usn)) {
      return { isValid: false, message: `Invalid USN for member ${i + 1}` }
    }
    
    if (!member.branch || !member.semester || !member.college) {
      return { isValid: false, message: `Missing required fields for member ${i + 1}` }
    }
  }
  
  return { isValid: true }
}

module.exports = {
  validateEmail,
  validatePhone,
  validateUSN,
  validateTeamName,
  validateName,
  validatePassword,
  sanitizeInput,
  validateTeamMembers
}