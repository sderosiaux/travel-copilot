import type { CopilotAction, Message } from '@/lib/store/copilot-store'

interface CopilotResponse {
  content: string
  actions?: CopilotAction[]
  suggestions?: string[]
}

interface Pattern {
  keywords: string[]
  response: (context: Message[]) => CopilotResponse
}

const patterns: Pattern[] = [
  {
    keywords: ['upcoming', 'next trip', 'next flight', 'my trips'],
    response: () => ({
      content:
        "I'll show you your upcoming trips. You have a flight to New York next week on Monday, December 18th.",
      actions: [
        {
          type: 'link',
          label: 'View Trip Details',
          payload: { route: '/trips' },
        },
      ],
      suggestions: [
        'Show flight status',
        'What is my departure time?',
        'Get directions to airport',
      ],
    }),
  },
  {
    keywords: ['flight status', 'status', 'on time', 'delayed'],
    response: () => ({
      content:
        'Your next flight BA123 to New York JFK is currently on time. Departure at 10:30 AM from Terminal 5.',
      actions: [
        {
          type: 'button',
          label: 'Track Flight',
          payload: { action: 'track' },
        },
        {
          type: 'button',
          label: 'Set Alert',
          payload: { action: 'alert' },
        },
      ],
      suggestions: ['Get boarding pass', 'Check baggage', 'Airport map'],
    }),
  },
  {
    keywords: ['create trip', 'book', 'new trip', 'plan trip'],
    response: () => ({
      content:
        "I can help you create a new trip. Would you like to search for flights or enter trip details manually?",
      actions: [
        {
          type: 'link',
          label: 'Search Flights',
          payload: { route: '/trips/new' },
        },
        {
          type: 'link',
          label: 'Manual Entry',
          payload: { route: '/trips/create' },
        },
      ],
      suggestions: [
        'Find cheap flights to Paris',
        'Show my saved searches',
        'What are popular destinations?',
      ],
    }),
  },
  {
    keywords: ['cancel', 'disruption', 'problem', 'issue', 'delay'],
    response: () => ({
      content:
        "I'm sorry to hear about the disruption. I can help you understand your rights and options for compensation or rebooking.",
      actions: [
        {
          type: 'link',
          label: 'View Disruption Info',
          payload: { route: '/disruptions' },
        },
        {
          type: 'link',
          label: 'File a Claim',
          payload: { route: '/claims/new' },
        },
      ],
      suggestions: [
        'What compensation am I entitled to?',
        'How do I rebook?',
        'Contact airline support',
      ],
    }),
  },
  {
    keywords: ['compensation', 'claim', 'refund', 'eu261', 'rights'],
    response: () => ({
      content:
        "You may be entitled to compensation under EU261 regulations. Let me help you file a claim or check your eligibility.",
      actions: [
        {
          type: 'link',
          label: 'Check Eligibility',
          payload: { route: '/claims/calculator' },
        },
        {
          type: 'link',
          label: 'File New Claim',
          payload: { route: '/claims/new' },
        },
        {
          type: 'link',
          label: 'View My Claims',
          payload: { route: '/claims' },
        },
      ],
      suggestions: [
        'How much can I claim?',
        'What documents do I need?',
        'How long does it take?',
      ],
    }),
  },
  {
    keywords: ['help', 'how to', 'guide', 'tutorial'],
    response: () => ({
      content:
        "I'm here to help! I can assist you with viewing trips, checking flight status, filing claims, managing documents, and more. What would you like to do?",
      suggestions: [
        'Show my upcoming trips',
        'How do I file a claim?',
        'What are my settings?',
        'Explain EU261 rights',
      ],
    }),
  },
  {
    keywords: ['settings', 'preferences', 'profile'],
    response: () => ({
      content:
        "You can manage your profile, travel preferences, and app settings in the Settings page.",
      actions: [
        {
          type: 'link',
          label: 'Go to Settings',
          payload: { route: '/settings' },
        },
      ],
      suggestions: [
        'Change my theme',
        'Update seat preference',
        'Adjust notification settings',
      ],
    }),
  },
  {
    keywords: ['document', 'passport', 'visa', 'id'],
    response: () => ({
      content:
        "I can help you manage your travel documents, passports, visas, and other important files.",
      actions: [
        {
          type: 'link',
          label: 'View Documents',
          payload: { route: '/documents' },
        },
        {
          type: 'link',
          label: 'Add Document',
          payload: { route: '/documents/new' },
        },
      ],
      suggestions: [
        'Check passport expiry',
        'Visa requirements for US',
        'Upload boarding pass',
      ],
    }),
  },
]

export async function processMessage(
  userMessage: string,
  context: Message[]
): Promise<CopilotResponse> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

  const lowerMessage = userMessage.toLowerCase()

  // Find matching pattern
  for (const pattern of patterns) {
    if (pattern.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return pattern.response(context)
    }
  }

  // Default response when no pattern matches
  return {
    content:
      "I'm not sure I understand. I can help you with trips, flight status, claims, documents, and settings. What would you like to know?",
    suggestions: [
      'Show my trips',
      'Check flight status',
      'File a compensation claim',
      'Help',
    ],
  }
}
