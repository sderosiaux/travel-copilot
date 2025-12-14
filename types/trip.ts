export interface Trip {
  id: string
  userId: string
  status: 'upcoming' | 'active' | 'completed' | 'cancelled'
  title: string
  destination: string
  origin: string
  startDate: string
  endDate: string
  travelers: TripTraveler[]
  flights: string[]
  hotels: string[]
  activities: string[]
  documents: string[]
  briefing?: TripBriefing
  timeline?: TripTimeline[]
  tags: string[]
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface TripTraveler {
  userId: string
  role: 'primary' | 'companion' | 'child' | 'dependent'
  seatAssignment?: string
  specialNeeds?: string[]
}

export interface TripBriefing {
  overview: string
  weather: {
    destination: string
    forecast: string
    temperature: { high: number; low: number }
    conditions: string
  }
  requirements: {
    visa: boolean
    vaccination: boolean
    documents: string[]
  }
  recommendations: {
    bestTimeToLeave: string
    packingTips: string[]
    localTips: string[]
  }
  risks: {
    level: 'low' | 'medium' | 'high'
    factors: string[]
  }
  generatedAt: string
}

export interface TripTimeline {
  id: string
  timestamp: string
  type: 'flight' | 'hotel' | 'activity' | 'transfer' | 'milestone'
  title: string
  description?: string
  location?: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  details?: Record<string, unknown>
}
