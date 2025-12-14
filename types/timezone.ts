export interface TimeZone {
  id: string
  city: string
  country: string
  timezone: string // IANA timezone identifier (e.g., 'America/New_York')
  offset: string // UTC offset (e.g., 'UTC-5')
  currentTime: string // ISO 8601 timestamp
  isDaytime: boolean
  abbreviation: string // Timezone abbreviation (e.g., 'EST', 'JST')
}

export interface WorldClock {
  id: string
  userId: string
  timezones: TimeZone[]
  homeTimezone: string
  createdAt: string
  updatedAt: string
}

export interface TimeConversion {
  sourceTimezone: string
  targetTimezone: string
  sourceTime: string
  targetTime: string
  timeDifference: number // in hours
}

export interface MeetingSchedule {
  id: string
  title: string
  description?: string
  date: string
  time: string
  duration: number // in minutes
  timezone: string
  participants: MeetingParticipant[]
  createdAt: string
  updatedAt: string
}

export interface MeetingParticipant {
  id: string
  name: string
  timezone: string
  localTime: string
  isOrganizer: boolean
}

export interface JetLagRecommendation {
  destination: string
  departure: string
  timeDifference: number
  severity: 'low' | 'moderate' | 'high'
  recommendations: JetLagTip[]
  recoveryDays: number
}

export interface JetLagTip {
  category: 'before' | 'during' | 'after'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

export interface TimeZonePreference {
  show24Hour: boolean
  showSeconds: boolean
  defaultView: 'world-clock' | 'converter' | 'scheduler' | 'jet-lag'
  favoriteTimezones: string[]
}
