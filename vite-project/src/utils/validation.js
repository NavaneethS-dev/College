// Validation utilities for forms

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/
  return phoneRegex.test(phone)
}

export const validateUSN = (usn) => {
  const usnRegex = /^[A-Z0-9]+$/
  return usnRegex.test(usn) && usn.length >= 5 && usn.length <= 20
}

export const validateTeamName = (teamName) => {
  const teamNameRegex = /^[a-zA-Z0-9\s\-_]+$/
  return teamNameRegex.test(teamName) && teamName.length >= 2 && teamName.length <= 100
}

export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/
  return nameRegex.test(name) && name.length >= 2 && name.length <= 100
}

// Form validation schemas
export const teamRegistrationSchema = {
  teamName: {
    required: 'Team name is required',
    validate: (value) => validateTeamName(value) || 'Invalid team name format'
  },
  members: {
    required: 'At least one member is required',
    validate: (members) => {
      if (!Array.isArray(members) || members.length === 0) {
        return 'At least one member is required'
      }
      if (members.length > 4) {
        return 'Maximum 4 members allowed'
      }
      
      // Check for duplicate emails
      const emails = members.map(m => m.email?.toLowerCase()).filter(Boolean)
      if (emails.length !== new Set(emails).size) {
        return 'All members must have unique email addresses'
      }
      
      // Check for duplicate USNs
      const usns = members.map(m => m.usn?.toUpperCase()).filter(Boolean)
      if (usns.length !== new Set(usns).size) {
        return 'All members must have unique USNs'
      }
      
      return true
    }
  }
}

export const memberSchema = {
  name: {
    required: 'Name is required',
    validate: (value) => validateName(value) || 'Name can only contain letters and spaces'
  },
  email: {
    required: 'Email is required',
    validate: (value) => validateEmail(value) || 'Please enter a valid email address'
  },
  phone: {
    required: 'Phone number is required',
    validate: (value) => validatePhone(value) || 'Please enter a valid phone number'
  },
  branch: {
    required: 'Branch is required'
  },
  usn: {
    required: 'USN is required',
    validate: (value) => validateUSN(value) || 'USN must be 5-20 characters with only letters and numbers'
  },
  semester: {
    required: 'Semester is required'
  },
  college: {
    required: 'College name is required',
    validate: (value) => value.length >= 2 || 'College name must be at least 2 characters'
  }
}

// Helper function to validate entire form
export const validateForm = (data, schema) => {
  const errors = {}
  
  Object.keys(schema).forEach(field => {
    const rules = schema[field]
    const value = data[field]
    
    // Check required
    if (rules.required && (!value || (Array.isArray(value) && value.length === 0))) {
      errors[field] = rules.required
      return
    }
    
    // Check custom validation
    if (rules.validate && value) {
      const result = rules.validate(value)
      if (result !== true) {
        errors[field] = result
      }
    }
  })
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}