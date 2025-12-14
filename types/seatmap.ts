export type SeatClass = 'economy' | 'premium-economy' | 'business' | 'first'
export type SeatStatus = 'available' | 'occupied' | 'selected' | 'blocked' | 'extra-legroom'
export type SeatType = 'window' | 'middle' | 'aisle'

export interface SeatAmenities {
  power: boolean
  usb: boolean
  wifi: boolean
  entertainment: boolean
  recline: boolean
  extraLegroom: boolean
  bassinet: boolean
  storage: boolean
}

export interface Seat {
  id: string
  row: number
  column: string
  seatNumber: string
  class: SeatClass
  status: SeatStatus
  type: SeatType
  price?: number
  amenities: SeatAmenities
  legroom: number // in inches
  width: number // in inches
  pitch: number // in inches
  isExitRow?: boolean
  restrictions?: string[]
}

export interface SeatMapSection {
  id: string
  class: SeatClass
  startRow: number
  endRow: number
  columns: string[]
  aisleAfter?: string[]
}

export interface SeatMap {
  id: string
  flightNumber: string
  aircraftType: string
  totalSeats: number
  sections: SeatMapSection[]
  seats: Seat[]
  exitRows: number[]
  legend: SeatLegend[]
}

export interface SeatLegend {
  status: SeatStatus
  label: string
  color: string
}

export interface SeatSelection {
  id: string
  flightId: string
  passengerId: string
  passengerName: string
  seatId: string
  seatNumber: string
  class: SeatClass
  price: number
  selectedAt: string
}

export interface SeatComparison {
  seat1: Seat
  seat2: Seat
  differences: {
    price: number
    legroom: number
    amenities: string[]
  }
  recommendation?: string
}

export interface SeatFilter {
  classes: SeatClass[]
  types: SeatType[]
  minLegroom?: number
  amenities: (keyof SeatAmenities)[]
  maxPrice?: number
  exitRowOnly?: boolean
}

export interface AircraftLayout {
  aircraftType: string
  totalRows: number
  seatsPerRow: Record<SeatClass, number>
  configuration: string // e.g., "3-4-3", "2-4-2"
  hasUpperDeck: boolean
}
