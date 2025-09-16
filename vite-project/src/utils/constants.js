// Application constants

export const APP_CONFIG = {
  name: 'HACK-AI-THON',
  tagline: 'Premier AI/ML Hackathon 2025',
  description: 'Join the most exciting AI/ML hackathon of the year',
  maxTeams: 50,
  maxMembersPerTeam: 4,
  minMembersPerTeam: 1
}

export const CONTACT_INFO = {
  email: 'contact@hackathon.com',
  phone: '+1 (555) 123-4567',
  address: 'Your College Campus',
  socialMedia: {
    github: 'https://github.com/hackathon',
    twitter: 'https://twitter.com/hackathon',
    linkedin: 'https://linkedin.com/company/hackathon',
    instagram: 'https://instagram.com/hackathon'
  }
}

export const BRANCHES = [
  'Computer Science',
  'Information Technology',
  'Electronics and Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'Other'
]

export const SEMESTERS = ['1', '2', '3', '4', '5', '6', '7', '8', 'Other']

export const TEAM_STATUS = {
  REGISTERED: 'registered',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled'
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/admin/login'
  },
  TEAMS: {
    REGISTER: '/teams',
    GET_ALL: '/teams',
    GET_BY_ID: '/teams',
    UPDATE_STATUS: '/teams',
    DELETE: '/teams',
    EXPORT: '/teams/export'
  },
  STATUS: '/status'
}

export const LOCAL_STORAGE_KEYS = {
  ADMIN_TOKEN: 'adminToken',
  ADMIN_DATA: 'adminData'
}

export const FORM_VALIDATION = {
  TEAM_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z0-9\s\-_]+$/
  },
  MEMBER_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z\s]+$/
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PHONE: {
    PATTERN: /^[\d\s\-\+\(\)]{10,15}$/
  },
  USN: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 20,
    PATTERN: /^[A-Z0-9]+$/
  },
  COLLEGE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 200
  }
}

export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  PAGE_TRANSITION: 0.5
}

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px'
}

export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },
  SECONDARY: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e'
  }
}