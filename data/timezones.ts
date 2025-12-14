import type { TimeZone, WorldClock, JetLagRecommendation, MeetingSchedule } from '@/types/timezone'

// Common timezones for world clock
export const commonTimezones: TimeZone[] = [
  {
    id: 'tz-london',
    city: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    offset: 'UTC+0',
    currentTime: new Date().toISOString(),
    isDaytime: true,
    abbreviation: 'GMT',
  },
  {
    id: 'tz-tokyo',
    city: 'Tokyo',
    country: 'Japan',
    timezone: 'Asia/Tokyo',
    offset: 'UTC+9',
    currentTime: new Date().toISOString(),
    isDaytime: true,
    abbreviation: 'JST',
  },
  {
    id: 'tz-new-york',
    city: 'New York',
    country: 'United States',
    timezone: 'America/New_York',
    offset: 'UTC-5',
    currentTime: new Date().toISOString(),
    isDaytime: false,
    abbreviation: 'EST',
  },
  {
    id: 'tz-los-angeles',
    city: 'Los Angeles',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    offset: 'UTC-8',
    currentTime: new Date().toISOString(),
    isDaytime: false,
    abbreviation: 'PST',
  },
  {
    id: 'tz-paris',
    city: 'Paris',
    country: 'France',
    timezone: 'Europe/Paris',
    offset: 'UTC+1',
    currentTime: new Date().toISOString(),
    isDaytime: true,
    abbreviation: 'CET',
  },
  {
    id: 'tz-sydney',
    city: 'Sydney',
    country: 'Australia',
    timezone: 'Australia/Sydney',
    offset: 'UTC+11',
    currentTime: new Date().toISOString(),
    isDaytime: true,
    abbreviation: 'AEDT',
  },
  {
    id: 'tz-dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    timezone: 'Asia/Dubai',
    offset: 'UTC+4',
    currentTime: new Date().toISOString(),
    isDaytime: true,
    abbreviation: 'GST',
  },
  {
    id: 'tz-singapore',
    city: 'Singapore',
    country: 'Singapore',
    timezone: 'Asia/Singapore',
    offset: 'UTC+8',
    currentTime: new Date().toISOString(),
    isDaytime: true,
    abbreviation: 'SGT',
  },
]

// User's world clock
export const carlosWorldClock: WorldClock = {
  id: 'worldclock-carlos-001',
  userId: 'user-carlos-001',
  timezones: [
    commonTimezones[0], // London (home)
    commonTimezones[1], // Tokyo (upcoming trip)
    commonTimezones[2], // New York (upcoming trip)
  ],
  homeTimezone: 'Europe/London',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: new Date().toISOString(),
}

// Jet lag recommendations
export const tokyoJetLagRecommendation: JetLagRecommendation = {
  destination: 'Tokyo',
  departure: 'London',
  timeDifference: 9,
  severity: 'high',
  recoveryDays: 4,
  recommendations: [
    {
      category: 'before',
      title: 'Adjust sleep schedule gradually',
      description: 'Start going to bed 1-2 hours earlier each night for 3-4 days before departure',
      priority: 'high',
    },
    {
      category: 'before',
      title: 'Stay hydrated',
      description: 'Drink plenty of water in the days leading up to your flight',
      priority: 'medium',
    },
    {
      category: 'before',
      title: 'Avoid alcohol and caffeine',
      description: '24 hours before flight, reduce alcohol and caffeine intake',
      priority: 'medium',
    },
    {
      category: 'during',
      title: 'Set your watch to destination time',
      description: 'Change your watch/phone to Tokyo time as soon as you board',
      priority: 'high',
    },
    {
      category: 'during',
      title: 'Sleep on the plane',
      description: 'Try to sleep during Tokyo nighttime hours (use eye mask and ear plugs)',
      priority: 'high',
    },
    {
      category: 'during',
      title: 'Move around regularly',
      description: 'Walk around the cabin every 2-3 hours to maintain circulation',
      priority: 'medium',
    },
    {
      category: 'during',
      title: 'Stay hydrated',
      description: 'Drink water regularly throughout the flight, avoid alcohol',
      priority: 'high',
    },
    {
      category: 'after',
      title: 'Get sunlight exposure',
      description: 'Spend time outdoors in natural daylight to help reset your circadian rhythm',
      priority: 'high',
    },
    {
      category: 'after',
      title: 'Stay awake until local bedtime',
      description: 'Resist napping and stay active until at least 9-10 PM local time',
      priority: 'high',
    },
    {
      category: 'after',
      title: 'Consider melatonin',
      description: 'Take 0.5-3mg melatonin 30 minutes before local bedtime for first 3 nights',
      priority: 'medium',
    },
    {
      category: 'after',
      title: 'Light exercise',
      description: 'Light walking or stretching helps adjust to new schedule',
      priority: 'low',
    },
    {
      category: 'after',
      title: 'Avoid heavy meals before bed',
      description: 'Eat light dinners and avoid late-night snacking',
      priority: 'low',
    },
  ],
}

export const nycJetLagRecommendation: JetLagRecommendation = {
  destination: 'New York',
  departure: 'London',
  timeDifference: 5,
  severity: 'moderate',
  recoveryDays: 2,
  recommendations: [
    {
      category: 'before',
      title: 'Adjust sleep schedule',
      description: 'Go to bed 1 hour earlier for 2 nights before departure',
      priority: 'medium',
    },
    {
      category: 'before',
      title: 'Stay well-rested',
      description: 'Get a good night\'s sleep before your flight',
      priority: 'high',
    },
    {
      category: 'during',
      title: 'Set your watch to destination time',
      description: 'Change to New York time when you board',
      priority: 'high',
    },
    {
      category: 'during',
      title: 'Stay hydrated',
      description: 'Drink water regularly, limit caffeine and alcohol',
      priority: 'medium',
    },
    {
      category: 'after',
      title: 'Get morning sunlight',
      description: 'Expose yourself to bright morning light in New York',
      priority: 'high',
    },
    {
      category: 'after',
      title: 'Stay active',
      description: 'Keep busy during the day to stay awake until evening',
      priority: 'medium',
    },
    {
      category: 'after',
      title: 'Adjust meal times',
      description: 'Eat meals according to local New York time',
      priority: 'low',
    },
  ],
}

// Sample meeting schedules
export const sampleMeetings: MeetingSchedule[] = [
  {
    id: 'meeting-001',
    title: 'Client Meeting - Tokyo Office',
    description: 'Quarterly review with Tokyo team',
    date: '2025-11-17',
    time: '10:00',
    duration: 90,
    timezone: 'Asia/Tokyo',
    participants: [
      {
        id: 'part-001',
        name: 'Carlos Silva',
        timezone: 'Europe/London',
        localTime: '01:00',
        isOrganizer: false,
      },
      {
        id: 'part-002',
        name: 'Yuki Tanaka',
        timezone: 'Asia/Tokyo',
        localTime: '10:00',
        isOrganizer: true,
      },
      {
        id: 'part-003',
        name: 'Maria Silva',
        timezone: 'Europe/London',
        localTime: '01:00',
        isOrganizer: false,
      },
    ],
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2025-11-01T10:00:00Z',
  },
  {
    id: 'meeting-002',
    title: 'Video Call with NYC Team',
    description: 'Project status update',
    date: '2025-12-16',
    time: '14:00',
    duration: 60,
    timezone: 'America/New_York',
    participants: [
      {
        id: 'part-004',
        name: 'Carlos Silva',
        timezone: 'America/New_York',
        localTime: '14:00',
        isOrganizer: true,
      },
      {
        id: 'part-005',
        name: 'John Smith',
        timezone: 'America/New_York',
        localTime: '14:00',
        isOrganizer: false,
      },
      {
        id: 'part-006',
        name: 'Sarah Johnson',
        timezone: 'America/Los_Angeles',
        localTime: '11:00',
        isOrganizer: false,
      },
    ],
    createdAt: '2025-12-01T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
  },
]

export const mockTimezones = {
  common: commonTimezones,
  worldClock: carlosWorldClock,
  jetLag: {
    tokyo: tokyoJetLagRecommendation,
    nyc: nycJetLagRecommendation,
  },
  meetings: sampleMeetings,
}
