export interface Flight {
  id: string
  flightNumber: string
  airline: string
  aircraftType?: string
  origin: string
  destination: string
  departure: {
    scheduled: string
    estimated?: string
    actual?: string
    terminal?: string
    gate?: string
  }
  arrival: {
    scheduled: string
    estimated?: string
    actual?: string
    terminal?: string
    gate?: string
    baggage?: string
  }
  status: FlightStatus
  duration: number
  distance?: number
  seats: {
    [travelerId: string]: string
  }
  bookingReference: string
  ticketNumbers?: {
    [travelerId: string]: string
  }
  fareBasis?: string
  fareClass?: string
  layovers?: Array<{
    airport: string
    duration: number
  }>
  createdAt: string
  updatedAt: string
}

export type FlightStatus =
  | 'scheduled'
  | 'boarding'
  | 'departed'
  | 'in_flight'
  | 'landed'
  | 'arrived'
  | 'delayed'
  | 'cancelled'
  | 'diverted'

export interface FlightUpdate {
  id: string
  flightId: string
  timestamp: string
  type: 'status_change' | 'gate_change' | 'delay' | 'cancellation' | 'schedule_change'
  oldValue?: string
  newValue: string
  message: string
  severity: 'info' | 'warning' | 'critical'
}
