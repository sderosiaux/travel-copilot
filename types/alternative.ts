import type { Flight } from './flight'

export interface AlternativeOption {
  id: string
  type: 'rebooking' | 'refund' | 'hotel' | 'transport' | 'compensation'
  title: string
  description: string
  provider: string
  price?: number
  priceDifference?: number
  currency?: string
  availableUntil?: string
  pros: string[]
  cons: string[]
  recommended: boolean
  flight?: Flight
  details?: AlternativeDetails
}

export interface AlternativeDetails {
  // For rebooking
  departureTime?: string
  arrivalTime?: string
  duration?: number
  stops?: number
  cabinClass?: string
  seatsAvailable?: number

  // For refund
  refundAmount?: number
  refundType?: 'full' | 'partial' | 'voucher'
  processingTime?: string

  // For hotel
  hotelName?: string
  rating?: number
  address?: string
  checkIn?: string
  checkOut?: string
  roomType?: string
  amenities?: string[]

  // For transport
  transportType?: 'train' | 'bus' | 'car_rental' | 'taxi'
  departureLocation?: string
  arrivalLocation?: string
  travelTime?: number

  // For compensation
  compensationType?: 'eu261' | 'us_tarmac' | 'airline_policy'
  eligibleAmount?: number
  claimDeadline?: string
  requiredDocuments?: string[]
}

export interface AlternativeComparison {
  optionId: string
  metrics: {
    timeToDestination: number
    totalCost: number
    convenience: number
    comfort: number
  }
  highlights: string[]
  concerns: string[]
}
