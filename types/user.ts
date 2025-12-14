export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  dateOfBirth?: string
  nationality?: string
  preferences: UserPreferences
  settings: UserSettings
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  seatPosition: 'window' | 'middle' | 'aisle' | 'no_preference'
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first'
  mealPreference?: 'regular' | 'vegetarian' | 'vegan' | 'halal' | 'kosher' | 'gluten_free'
  preferredDepartureTime: 'early_morning' | 'morning' | 'afternoon' | 'evening' | 'red_eye' | 'no_preference'
  maxLayoverHours: number
  preferredAirlines: string[]
  avoidAirlines: string[]
  preferredAlliances: ('oneworld' | 'star_alliance' | 'skyteam')[]
  prioritizeDirectFlights: boolean
  prioritizePrice: boolean
  prioritizeTime: boolean
  notificationLevel: 'all' | 'important' | 'critical' | 'none'
  requiresWheelchair: boolean
  requiresHearingAssistance: boolean
  requiresVisualAssistance: boolean
  otherAccessibilityNeeds?: string
}

export interface UserSettings {
  experienceMode: 'essential' | 'standard' | 'expert'
  theme: 'light' | 'dark' | 'system'
  language: string
  currency: string
  distanceUnit: 'km' | 'miles'
  temperatureUnit: 'celsius' | 'fahrenheit'
  timeFormat: '12h' | '24h'
  copilotPersonality: 'just_facts' | 'balanced' | 'supportive'
  calendarIntegration: boolean
  patternRecognition: boolean
  dealAlerts: boolean
  locationSharing: boolean
}
