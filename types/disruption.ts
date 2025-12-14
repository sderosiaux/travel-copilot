export interface Disruption {
  id: string
  type: 'cancellation' | 'delay' | 'gate_change' | 'terminal_change' | 'missed_connection' | 'aircraft_change' | 'other'
  severity: 'low' | 'medium' | 'high' | 'critical'
  flightId: string
  tripId: string
  detectedAt: string
  resolvedAt?: string
  status: 'active' | 'resolved' | 'monitoring'
  details: {
    reason?: string
    originalValue?: string
    newValue?: string
    impact: string
    affectedTravelers: string[]
  }
  actions: {
    recommended: string[]
    taken: string[]
    available: RebookingOption[]
  }
  compensation?: CompensationClaim
  notifications: Array<{
    timestamp: string
    channel: 'push' | 'email' | 'sms' | 'in_app'
    message: string
    acknowledged: boolean
  }>
  createdAt: string
  updatedAt: string
}

export interface RebookingOption {
  id: string
  type: 'same_day' | 'next_day' | 'alternative_route' | 'refund'
  flights: Array<{
    flightNumber: string
    airline: string
    departure: string
    arrival: string
    duration: number
    stops: number
  }>
  cost: {
    currency: string
    amount: number
    breakdown: Record<string, number>
  }
  availability: {
    seatsAvailable: number
    cabinClass: string
    seatsTogether: boolean
  }
  pros: string[]
  cons: string[]
  copilotRecommendation?: {
    score: number
    reasoning: string
  }
}

export interface CompensationClaim {
  id: string
  disruptionId: string
  type: 'eu261' | 'us_tarmac' | 'airline_policy' | 'travel_insurance'
  status: 'pending' | 'submitted' | 'approved' | 'rejected' | 'paid'
  eligibility: {
    eligible: boolean
    reasoning: string
    estimatedAmount?: {
      currency: string
      amount: number
    }
  }
  submission?: {
    submittedAt: string
    submittedBy: string
    reference: string
    documents: string[]
  }
  resolution?: {
    resolvedAt: string
    outcome: string
    amount?: {
      currency: string
      amount: number
    }
    paymentMethod?: string
    notes?: string
  }
  createdAt: string
  updatedAt: string
}

export interface ConnectionRisk {
  id: string
  tripId: string
  connectingFlightId: string
  previousFlightId: string
  minimumConnectionTime: number
  scheduledConnectionTime: number
  currentRiskLevel: 'low' | 'medium' | 'high' | 'critical'
  factors: Array<{
    factor: string
    impact: 'positive' | 'negative'
    weight: number
  }>
  recommendations: string[]
  monitoring: boolean
  lastChecked: string
}
