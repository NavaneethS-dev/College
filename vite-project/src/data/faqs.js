// Frequently Asked Questions
export const faqs = [
  {
    id: 1,
    category: "General",
    question: "What is HACK-AI-THON?",
    answer: "HACK-AI-THON is a 3-day intensive hackathon focused on artificial intelligence and machine learning. Participants work in teams to develop innovative solutions to real-world problems using AI/ML technologies."
  },
  {
    id: 2,
    category: "Registration",
    question: "Who can participate in the hackathon?",
    answer: "The hackathon is open to college students, recent graduates, and professionals. Teams can have 1-4 members, and at least one member should have basic programming knowledge."
  },
  {
    id: 3,
    category: "Registration",
    question: "Is there a registration fee?",
    answer: "No, participation in HACK-AI-THON is completely free! This includes meals, snacks, accommodation (if needed), workshops, and all event activities."
  },
  {
    id: 4,
    category: "Teams",
    question: "Can I participate alone or do I need a team?",
    answer: "You can participate both ways! You can register as a solo participant or form teams of up to 4 members. We also have team formation sessions during the event."
  },
  {
    id: 5,
    category: "Teams",
    question: "Can team members be from different colleges?",
    answer: "Absolutely! We encourage diverse teams with members from different colleges, backgrounds, and skill sets. This leads to more innovative solutions and better learning experiences."
  },
  {
    id: 6,
    category: "Technical",
    question: "What technologies can we use?",
    answer: "You're free to use any programming languages, frameworks, and tools. Popular choices include Python, TensorFlow, PyTorch, JavaScript, React, Node.js, and various cloud services."
  },
  {
    id: 7,
    category: "Technical",
    question: "Do I need to have AI/ML experience?",
    answer: "While AI/ML experience is helpful, it's not mandatory. We'll have workshops, mentors, and resources to help beginners. The key is enthusiasm to learn and create!"
  },
  {
    id: 8,
    category: "Event",
    question: "What should I bring to the hackathon?",
    answer: "Bring your laptop, chargers, comfortable clothes, toiletries, and any hardware you want to use. We'll provide food, drinks, internet, power outlets, and a great environment!"
  },
  {
    id: 9,
    category: "Event",
    question: "Will there be mentors available?",
    answer: "Yes! We have industry experts and experienced developers as mentors. They'll be available throughout the event to help with technical challenges, idea validation, and project guidance."
  },
  {
    id: 10,
    category: "Prizes",
    question: "What are the prizes?",
    answer: "We have exciting prizes for winners including cash rewards, tech gadgets, internship opportunities, and certificates. Special categories include Best AI Innovation, Most Social Impact, and People's Choice Award."
  },
  {
    id: 11,
    category: "Judging",
    question: "How will projects be judged?",
    answer: "Projects are evaluated based on innovation, technical implementation, user experience, presentation, and potential impact. Judges include industry experts, entrepreneurs, and senior developers."
  },
  {
    id: 12,
    category: "General",
    question: "Is accommodation provided?",
    answer: "For outstation participants, we can arrange basic accommodation. Please mention this in your registration or contact us separately for accommodation requests."
  }
]

export const getFAQsByCategory = (category) => {
  return faqs.filter(faq => faq.category === category)
}

export const getAllCategories = () => {
  return [...new Set(faqs.map(faq => faq.category))]
}