import type { AlternativeOption } from '@/types/alternative'
import type { Flight } from '@/types/flight'
import type { Disruption } from '@/types/disruption'

/**
 * Generate alternative options for a disrupted flight
 */
export function generateAlternatives(
  disruption: Disruption,
  originalFlight: Flight
): AlternativeOption[] {
  const alternatives: AlternativeOption[] = []

  // Add rebooking options
  alternatives.push(...generateRebookingOptions(originalFlight, disruption))

  // Add refund options
  alternatives.push(...generateRefundOptions(originalFlight))

  // Add accommodation if needed (for long delays or overnight)
  if (shouldOfferAccommodation(disruption)) {
    alternatives.push(...generateAccommodationOptions(disruption, originalFlight))
  }

  // Add ground transport alternatives for short distances
  if (shouldOfferTransport(originalFlight)) {
    alternatives.push(...generateTransportOptions(originalFlight))
  }

  // Add compensation information
  const compensation = calculateCompensation(disruption, originalFlight)
  if (compensation) {
    alternatives.push(compensation)
  }

  return alternatives
}

/**
 * Generate rebooking flight options
 */
export function generateRebookingOptions(
  originalFlight: Flight,
  disruption?: Disruption
): AlternativeOption[] {
  const options: AlternativeOption[] = []
  const originalPrice = 450 // Base price in currency

  // Option 1: Next available flight (same airline)
  const nextFlightTime = new Date(originalFlight.departure.scheduled)
  nextFlightTime.setHours(nextFlightTime.getHours() + 3)

  options.push({
    id: `rebooking-1-${originalFlight.id}`,
    type: 'rebooking',
    title: 'Next Available Flight',
    description: `${originalFlight.airline} ${originalFlight.flightNumber.replace(/\d+/, match => String(Number(match) + 10))}`,
    provider: originalFlight.airline,
    price: originalPrice,
    priceDifference: 0,
    currency: 'GBP',
    availableUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    pros: [
      'Same airline - easier rebooking',
      'No additional cost',
      'Direct flight',
      'Departs in 3 hours',
    ],
    cons: [
      'Later arrival time',
      'May affect connecting flights',
    ],
    recommended: true,
    flight: {
      ...originalFlight,
      id: `${originalFlight.id}-alt1`,
      flightNumber: originalFlight.flightNumber.replace(/\d+/, match => String(Number(match) + 10)),
      departure: {
        ...originalFlight.departure,
        scheduled: nextFlightTime.toISOString(),
      },
      arrival: {
        ...originalFlight.arrival,
        scheduled: new Date(nextFlightTime.getTime() + originalFlight.duration * 60 * 1000).toISOString(),
      },
      status: 'scheduled',
    },
    details: {
      departureTime: nextFlightTime.toISOString(),
      arrivalTime: new Date(nextFlightTime.getTime() + originalFlight.duration * 60 * 1000).toISOString(),
      duration: originalFlight.duration,
      stops: 0,
      cabinClass: originalFlight.fareClass || 'Economy',
      seatsAvailable: 12,
    },
  })

  // Option 2: Alternative airline (faster but more expensive)
  const altAirlineTime = new Date(originalFlight.departure.scheduled)
  altAirlineTime.setHours(altAirlineTime.getHours() + 1.5)

  options.push({
    id: `rebooking-2-${originalFlight.id}`,
    type: 'rebooking',
    title: 'Earlier Alternative Flight',
    description: 'Virgin Atlantic VS4567',
    provider: 'Virgin Atlantic',
    price: originalPrice + 85,
    priceDifference: 85,
    currency: 'GBP',
    availableUntil: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    pros: [
      'Departs sooner - in 90 minutes',
      'Similar arrival time to original',
      'Premium cabin available',
    ],
    cons: [
      'Different airline',
      'Additional cost',
      'May require new baggage check',
    ],
    recommended: false,
    flight: {
      ...originalFlight,
      id: `${originalFlight.id}-alt2`,
      flightNumber: 'VS4567',
      airline: 'Virgin Atlantic',
      departure: {
        ...originalFlight.departure,
        scheduled: altAirlineTime.toISOString(),
        terminal: '3',
      },
      arrival: {
        ...originalFlight.arrival,
        scheduled: new Date(altAirlineTime.getTime() + (originalFlight.duration + 15) * 60 * 1000).toISOString(),
      },
      status: 'scheduled',
    },
    details: {
      departureTime: altAirlineTime.toISOString(),
      arrivalTime: new Date(altAirlineTime.getTime() + (originalFlight.duration + 15) * 60 * 1000).toISOString(),
      duration: originalFlight.duration + 15,
      stops: 0,
      cabinClass: 'Premium Economy',
      seatsAvailable: 8,
    },
  })

  // Option 3: Next day flight (lower cost)
  const nextDayTime = new Date(originalFlight.departure.scheduled)
  nextDayTime.setDate(nextDayTime.getDate() + 1)
  nextDayTime.setHours(8, 0, 0, 0)

  options.push({
    id: `rebooking-3-${originalFlight.id}`,
    type: 'rebooking',
    title: 'Next Day Morning Flight',
    description: `${originalFlight.airline} ${originalFlight.flightNumber.replace(/\d+/, match => String(Number(match) + 1))}`,
    provider: originalFlight.airline,
    price: originalPrice - 25,
    priceDifference: -25,
    currency: 'GBP',
    availableUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    pros: [
      'Lower cost option',
      'More convenient departure time',
      'Same airline',
      'Hotel accommodation included',
    ],
    cons: [
      'Departs tomorrow',
      'Significant delay to plans',
      'Overnight stay required',
    ],
    recommended: false,
    flight: {
      ...originalFlight,
      id: `${originalFlight.id}-alt3`,
      flightNumber: originalFlight.flightNumber.replace(/\d+/, match => String(Number(match) + 1)),
      departure: {
        ...originalFlight.departure,
        scheduled: nextDayTime.toISOString(),
      },
      arrival: {
        ...originalFlight.arrival,
        scheduled: new Date(nextDayTime.getTime() + originalFlight.duration * 60 * 1000).toISOString(),
      },
      status: 'scheduled',
    },
    details: {
      departureTime: nextDayTime.toISOString(),
      arrivalTime: new Date(nextDayTime.getTime() + originalFlight.duration * 60 * 1000).toISOString(),
      duration: originalFlight.duration,
      stops: 0,
      cabinClass: originalFlight.fareClass || 'Economy',
      seatsAvailable: 25,
    },
  })

  return options
}

/**
 * Generate refund and voucher options
 */
export function generateRefundOptions(originalFlight: Flight): AlternativeOption[] {
  const options: AlternativeOption[] = []
  const flightPrice = 450

  // Full refund option
  options.push({
    id: `refund-1-${originalFlight.id}`,
    type: 'refund',
    title: 'Full Refund',
    description: 'Cancel trip and receive full refund to original payment method',
    provider: originalFlight.airline,
    price: 0,
    priceDifference: 0,
    currency: 'GBP',
    pros: [
      'Full refund of ticket price',
      'No rebooking hassle',
      'Processed within 7-10 business days',
    ],
    cons: [
      'Trip cancelled',
      'May affect connecting bookings',
      'Refund takes time to process',
    ],
    recommended: false,
    details: {
      refundAmount: flightPrice,
      refundType: 'full',
      processingTime: '7-10 business days',
    },
  })

  // Travel voucher option (with bonus)
  options.push({
    id: `refund-2-${originalFlight.id}`,
    type: 'refund',
    title: 'Travel Voucher with Bonus',
    description: 'Receive travel voucher with 20% additional credit',
    provider: originalFlight.airline,
    price: 0,
    priceDifference: 0,
    currency: 'GBP',
    pros: [
      `£${Math.round(flightPrice * 1.2)} in travel credit`,
      '20% bonus value',
      'Valid for 12 months',
      'Can be used for any route',
    ],
    cons: [
      'Not a cash refund',
      'Must use with same airline',
      'Expires after 1 year',
    ],
    recommended: false,
    details: {
      refundAmount: Math.round(flightPrice * 1.2),
      refundType: 'voucher',
      processingTime: 'Immediate',
    },
  })

  return options
}

/**
 * Generate hotel accommodation options
 */
export function generateAccommodationOptions(
  disruption: Disruption,
  originalFlight: Flight
): AlternativeOption[] {
  const options: AlternativeOption[] = []

  // Airport hotel option
  options.push({
    id: `hotel-1-${originalFlight.id}`,
    type: 'hotel',
    title: 'Airport Hotel - Airline Covered',
    description: 'Hilton London Heathrow Terminal 5',
    provider: 'Hilton',
    price: 0,
    currency: 'GBP',
    pros: [
      'Covered by airline',
      'Connected to terminal',
      'Meals included',
      'Early morning shuttle',
    ],
    cons: [
      'Basic room amenities',
      'Check-in after 3 PM',
    ],
    recommended: true,
    details: {
      hotelName: 'Hilton London Heathrow Terminal 5',
      rating: 4,
      address: 'Terminal 5, Heathrow Airport',
      checkIn: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      checkOut: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
      roomType: 'Standard Double',
      amenities: ['WiFi', 'Breakfast', 'Gym', 'Airport Shuttle'],
    },
  })

  // City hotel option (if passenger prefers)
  options.push({
    id: `hotel-2-${originalFlight.id}`,
    type: 'hotel',
    title: 'City Centre Hotel - Self Arranged',
    description: 'Premier Inn London City',
    provider: 'Premier Inn',
    price: 89,
    currency: 'GBP',
    pros: [
      'Located in city centre',
      'Better amenities',
      'Restaurants nearby',
      'Can explore city',
    ],
    cons: [
      'Not covered by airline',
      'Travel time to airport',
      'Additional taxi cost',
    ],
    recommended: false,
    details: {
      hotelName: 'Premier Inn London City',
      rating: 3.5,
      address: '123 City Road, London',
      checkIn: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      checkOut: new Date(Date.now() + 16 * 60 * 60 * 1000).toISOString(),
      roomType: 'King Room',
      amenities: ['WiFi', 'Restaurant', 'Bar'],
    },
  })

  return options
}

/**
 * Generate ground transport alternatives
 */
export function generateTransportOptions(originalFlight: Flight): AlternativeOption[] {
  const options: AlternativeOption[] = []

  // Only offer transport for short-haul routes
  const shortHaulDestinations = ['CDG', 'AMS', 'BRU', 'FRA']
  if (!shortHaulDestinations.includes(originalFlight.destination)) {
    return options
  }

  // Train option
  options.push({
    id: `transport-1-${originalFlight.id}`,
    type: 'transport',
    title: 'Eurostar Train Service',
    description: 'Direct train from London St Pancras',
    provider: 'Eurostar',
    price: 189,
    currency: 'GBP',
    pros: [
      'No airport security delays',
      'City centre to city centre',
      'More luggage allowance',
      'Environmental friendly',
    ],
    cons: [
      'Longer journey time',
      'Different departure location',
      'Limited availability',
    ],
    recommended: false,
    details: {
      transportType: 'train',
      departureLocation: 'St Pancras International',
      arrivalLocation: 'Paris Gare du Nord',
      travelTime: 135,
    },
  })

  return options
}

/**
 * Calculate compensation eligibility and amount
 */
export function calculateCompensation(
  disruption: Disruption,
  originalFlight: Flight
): AlternativeOption | null {
  // Check if eligible for EU261 compensation
  const isEU261Eligible = checkEU261Eligibility(disruption, originalFlight)

  if (!isEU261Eligible) {
    return null
  }

  const compensationAmount = calculateEU261Amount(originalFlight)

  return {
    id: `compensation-1-${originalFlight.id}`,
    type: 'compensation',
    title: 'EU261 Compensation Claim',
    description: 'You may be eligible for financial compensation under EU regulations',
    provider: originalFlight.airline,
    price: 0,
    currency: 'EUR',
    pros: [
      `Up to €${compensationAmount} compensation`,
      'Automatic claim filing',
      'No upfront cost',
      'Independent of refund/rebooking',
    ],
    cons: [
      'Processing takes 6-8 weeks',
      'Subject to verification',
      'Paid separately',
    ],
    recommended: true,
    details: {
      compensationType: 'eu261',
      eligibleAmount: compensationAmount,
      claimDeadline: new Date(Date.now() + 6 * 365 * 24 * 60 * 60 * 1000).toISOString(),
      requiredDocuments: ['Booking confirmation', 'Boarding pass', 'Cancellation notice'],
    },
  }
}

/**
 * Check if disruption qualifies for EU261 compensation
 */
function checkEU261Eligibility(disruption: Disruption, flight: Flight): boolean {
  // Simplified eligibility check
  if (disruption.type === 'cancellation') {
    return true
  }

  if (disruption.type === 'delay') {
    // Check if delay is more than 3 hours
    // This is simplified - real implementation would check actual times
    return true
  }

  return false
}

/**
 * Calculate EU261 compensation amount based on distance
 */
function calculateEU261Amount(flight: Flight): number {
  const distance = flight.distance || 0

  if (distance < 1500) {
    return 250
  } else if (distance < 3500) {
    return 400
  } else {
    return 600
  }
}

/**
 * Check if accommodation should be offered
 */
function shouldOfferAccommodation(disruption: Disruption): boolean {
  // Offer accommodation for cancellations or significant delays
  if (disruption.type === 'cancellation') {
    return true
  }

  // Check if disruption details indicate overnight delay
  if (disruption.details.impact.toLowerCase().includes('overnight')) {
    return true
  }

  return false
}

/**
 * Check if ground transport alternatives should be offered
 */
function shouldOfferTransport(flight: Flight): boolean {
  // Only for short-haul European destinations
  const shortHaulDestinations = ['CDG', 'AMS', 'BRU', 'FRA']
  return shortHaulDestinations.includes(flight.destination)
}
