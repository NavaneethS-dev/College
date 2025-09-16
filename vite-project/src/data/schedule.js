// Hackathon schedule data
export const schedule = [
  {
    id: 1,
    day: "Day 1 - March 15, 2025",
    events: [
      {
        time: "09:00 AM",
        title: "Registration & Check-in",
        description: "Welcome refreshments and team verification",
        type: "registration"
      },
      {
        time: "10:00 AM",
        title: "Opening Ceremony",
        description: "Welcome address and theme announcement",
        type: "ceremony"
      },
      {
        time: "11:00 AM",
        title: "Team Formation & Ideation",
        description: "Final team formation and initial brainstorming",
        type: "activity"
      },
      {
        time: "12:00 PM",
        title: "Hacking Begins!",
        description: "Start building your innovative solutions",
        type: "main"
      },
      {
        time: "01:00 PM",
        title: "Lunch Break",
        description: "Networking lunch with sponsors and mentors",
        type: "break"
      },
      {
        time: "03:00 PM",
        title: "Workshop: AI/ML Fundamentals",
        description: "Technical workshop by industry experts",
        type: "workshop"
      },
      {
        time: "06:00 PM",
        title: "Mentor Sessions Begin",
        description: "One-on-one mentoring with industry professionals",
        type: "mentoring"
      },
      {
        time: "08:00 PM",
        title: "Dinner",
        description: "Dinner and informal networking",
        type: "break"
      }
    ]
  },
  {
    id: 2,
    day: "Day 2 - March 16, 2025",
    events: [
      {
        time: "08:00 AM",
        title: "Breakfast",
        description: "Start the day with energy!",
        type: "break"
      },
      {
        time: "09:00 AM",
        title: "Workshop: Advanced Technologies",
        description: "Deep dive into cutting-edge technologies",
        type: "workshop"
      },
      {
        time: "11:00 AM",
        title: "Mid-point Check-in",
        description: "Progress review and mentor feedback",
        type: "activity"
      },
      {
        time: "01:00 PM",
        title: "Lunch & Sponsor Showcase",
        description: "Learn about sponsor technologies and opportunities",
        type: "break"
      },
      {
        time: "03:00 PM",
        title: "Technical Support Hours",
        description: "Get help with implementation challenges",
        type: "support"
      },
      {
        time: "06:00 PM",
        title: "Evening Snacks",
        description: "Refuel for the final stretch",
        type: "break"
      },
      {
        time: "08:00 PM",
        title: "Fun Activities",
        description: "Games, music, and relaxation",
        type: "activity"
      },
      {
        time: "11:00 PM",
        title: "Late Night Fuel",
        description: "Coffee, snacks, and coding music",
        type: "break"
      }
    ]
  },
  {
    id: 3,
    day: "Day 3 - March 17, 2025",
    events: [
      {
        time: "08:00 AM",
        title: "Breakfast & Final Sprint",
        description: "Last chance to polish your projects",
        type: "break"
      },
      {
        time: "10:00 AM",
        title: "Submission Deadline",
        description: "All projects must be submitted by this time",
        type: "deadline"
      },
      {
        time: "10:30 AM",
        title: "Demo Preparation",
        description: "Prepare your presentations and demos",
        type: "activity"
      },
      {
        time: "11:00 AM",
        title: "Project Presentations",
        description: "Teams present their solutions to judges",
        type: "presentation"
      },
      {
        time: "01:00 PM",
        title: "Lunch & Judging",
        description: "Judges deliberate while teams network",
        type: "break"
      },
      {
        time: "03:00 PM",
        title: "Winner Announcements",
        description: "Results and prize distribution",
        type: "ceremony"
      },
      {
        time: "04:00 PM",
        title: "Closing Ceremony",
        description: "Thank you and group photos",
        type: "ceremony"
      },
      {
        time: "05:00 PM",
        title: "Networking & Wrap-up",
        description: "Connect with fellow participants and sponsors",
        type: "activity"
      }
    ]
  }
]

export const getEventTypeColor = (type) => {
  const colors = {
    registration: 'bg-blue-500',
    ceremony: 'bg-purple-500',
    activity: 'bg-green-500',
    main: 'bg-red-500',
    break: 'bg-orange-500',
    workshop: 'bg-indigo-500',
    mentoring: 'bg-pink-500',
    support: 'bg-teal-500',
    deadline: 'bg-red-600',
    presentation: 'bg-yellow-500'
  }
  return colors[type] || 'bg-gray-500'
}

export const getEventTypeIcon = (type) => {
  // These would correspond to Lucide React icons
  const icons = {
    registration: 'UserPlus',
    ceremony: 'Award',
    activity: 'Users',
    main: 'Code',
    break: 'Coffee',
    workshop: 'BookOpen',
    mentoring: 'MessageCircle',
    support: 'HelpCircle',
    deadline: 'Clock',
    presentation: 'Presentation'
  }
  return icons[type] || 'Calendar'
}