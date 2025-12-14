export type CheckInStatus =
  | 'not_open' // Before 24h
  | 'open' // 24h-2h before
  | 'closing_soon' // 2h-45min before
  | 'closed' // After departure
  | 'completed' // Already checked in

export interface CheckInWindow {
  opensAt: string
  closesAt: string
  status: CheckInStatus
  hoursUntilOpen?: number
  hoursUntilClose?: number
}

export interface PassengerCheckIn {
  travelerId: string
  name: string
  status: CheckInStatus
  seat?: string
  boardingPass?: BoardingPass
  specialRequests?: string[]
}

export interface BoardingPass {
  id: string
  passengerName: string
  flightNumber: string
  date: string
  from: string
  to: string
  seat: string
  boardingTime: string
  gate?: string
  terminal?: string
  bookingReference: string
  barcode: string
  class: string
}

export interface FlightCheckIn {
  flightId: string
  flightNumber: string
  airline: string
  departure: string
  origin: string
  destination: string
  passengers: PassengerCheckIn[]
  window: CheckInWindow
  bookingReference: string
  groupCheckIn: boolean
}

export interface SeatMap {
  rows: number
  columns: string[]
  seats: {
    [key: string]: {
      available: boolean
      type: 'window' | 'middle' | 'aisle'
      class: 'first' | 'business' | 'premium_economy' | 'economy'
      exitRow?: boolean
      extra?: string
    }
  }
}
