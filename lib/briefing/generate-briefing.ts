import type { Trip, Flight, UserPreferences, Document } from '@/types'
import { getDestinationInfo } from '@/data/destinations'
import { mockFlights } from '@/data/flights'

export interface ExecutiveSummary {
  tripTitle: string
  destination: string
  origin: string
  dates: {
    start: string
    end: string
    duration: number
  }
  travelers: {
    total: number
    adults: number
    children: number
    dependents: number
  }
  flights: {
    outbound: string
    return: string
  }
  status: Trip['status']
}

export interface FlightSummaryItem {
  id: string
  flightNumber: string
  airline: string
  date: string
  departure: {
    airport: string
    time: string
    terminal?: string
    gate?: string
  }
  arrival: {
    airport: string
    time: string
    terminal?: string
  }
  duration: string
  status: string
}

export interface DocumentChecklistItem {
  id: string
  type: string
  name: string
  status: 'valid' | 'expiring_soon' | 'expired' | 'missing' | 'pending'
  expiryDate?: string
  daysUntilExpiry?: number
  required: boolean
  notes?: string
}

export interface Reminder {
  id: string
  priority: 'high' | 'medium' | 'low'
  category: 'travel' | 'documents' | 'health' | 'packing' | 'booking' | 'other'
  title: string
  description: string
  dueDate?: string
  completed: boolean
}

export function generateExecutiveSummary(trip: Trip): ExecutiveSummary {
  const startDate = new Date(trip.startDate)
  const endDate = new Date(trip.endDate)
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  const travelers = {
    total: trip.travelers.length,
    adults: trip.travelers.filter(t => t.role === 'primary' || t.role === 'companion').length,
    children: trip.travelers.filter(t => t.role === 'child').length,
    dependents: trip.travelers.filter(t => t.role === 'dependent').length,
  }

  const flights = trip.flights
  const flightSummary = {
    outbound: flights.length > 0 ? flights[0] : 'N/A',
    return: flights.length > 1 ? flights[flights.length - 1] : 'N/A',
  }

  return {
    tripTitle: trip.title,
    destination: trip.destination,
    origin: trip.origin,
    dates: {
      start: trip.startDate,
      end: trip.endDate,
      duration,
    },
    travelers,
    flights: flightSummary,
    status: trip.status,
  }
}

export function generateFlightSummary(trip: Trip): FlightSummaryItem[] {
  const flightData = Object.values(mockFlights)

  return trip.flights
    .map(flightId => {
      const flight = flightData.find(f => f.id === flightId)
      if (!flight) return null

      const durationHours = Math.floor(flight.duration / 60)
      const durationMinutes = flight.duration % 60

      return {
        id: flight.id,
        flightNumber: flight.flightNumber,
        airline: flight.airline,
        date: flight.departure.scheduled,
        departure: {
          airport: flight.origin,
          time: flight.departure.scheduled,
          terminal: flight.departure.terminal,
          gate: flight.departure.gate,
        },
        arrival: {
          airport: flight.destination,
          time: flight.arrival.scheduled,
          terminal: flight.arrival.terminal,
        },
        duration: `${durationHours}h ${durationMinutes}m`,
        status: flight.status,
      }
    })
    .filter(Boolean) as FlightSummaryItem[]
}

export function generateDocumentChecklist(
  trip: Trip,
  documents: Document[]
): DocumentChecklistItem[] {
  const requiredDocTypes = ['passport', 'visa', 'insurance', 'vaccination']
  const checklist: DocumentChecklistItem[] = []

  // Check each traveler's documents
  trip.travelers.forEach(traveler => {
    requiredDocTypes.forEach(docType => {
      const doc = documents.find(
        d => d.userId === traveler.userId && d.type === docType
      )

      if (doc) {
        let daysUntilExpiry: number | undefined
        if (doc.expiryDate) {
          const expiry = new Date(doc.expiryDate)
          const now = new Date()
          daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        }

        checklist.push({
          id: doc.id,
          type: doc.type,
          name: doc.name,
          status: doc.status,
          expiryDate: doc.expiryDate,
          daysUntilExpiry,
          required: docType === 'passport' || docType === 'visa',
          notes: doc.status === 'expiring_soon' ? 'Renew before travel' : undefined,
        })
      } else {
        // Document missing
        checklist.push({
          id: `missing-${traveler.userId}-${docType}`,
          type: docType,
          name: `${docType.charAt(0).toUpperCase() + docType.slice(1)} - Traveler ${traveler.userId}`,
          status: 'missing',
          required: docType === 'passport' || docType === 'visa',
          notes: docType === 'visa' ? 'Check if visa required for destination' : 'Add document',
        })
      }
    })
  })

  return checklist
}

export function generateReminders(
  trip: Trip,
  userPrefs?: UserPreferences
): Reminder[] {
  const reminders: Reminder[] = []
  const startDate = new Date(trip.startDate)
  const now = new Date()
  const daysUntilTrip = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  // Check-in reminder
  if (daysUntilTrip <= 1 && daysUntilTrip >= 0) {
    reminders.push({
      id: 'checkin-online',
      priority: 'high',
      category: 'travel',
      title: 'Online Check-in Available',
      description: 'Check in online 24 hours before your flight to secure your seat and save time at the airport.',
      dueDate: new Date(startDate.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
    })
  }

  // Airport arrival reminder
  if (daysUntilTrip <= 2 && daysUntilTrip >= 0) {
    const hasSpecialNeeds = trip.travelers.some(t => t.specialNeeds && t.specialNeeds.length > 0)
    const arrivalTime = hasSpecialNeeds ? '3 hours' : '2 hours'

    reminders.push({
      id: 'airport-arrival',
      priority: 'high',
      category: 'travel',
      title: `Arrive at Airport ${arrivalTime} Early`,
      description: hasSpecialNeeds
        ? `Arrive ${arrivalTime} before departure for wheelchair assistance and family with children.`
        : `Arrive ${arrivalTime} before departure for international flights.`,
      completed: false,
    })
  }

  // Document check reminder
  if (daysUntilTrip <= 7 && daysUntilTrip >= 0) {
    reminders.push({
      id: 'check-documents',
      priority: 'high',
      category: 'documents',
      title: 'Verify Travel Documents',
      description: 'Ensure all passports are valid for at least 6 months beyond your return date.',
      completed: false,
    })
  }

  // Packing reminder
  if (daysUntilTrip <= 3 && daysUntilTrip >= 0) {
    const destination = getDestinationInfo(trip.destination)
    let packingTip = 'Start packing for your trip.'

    if (destination) {
      if (destination.weather.current.temperature < 10) {
        packingTip = 'Pack warm clothing - temperatures will be cold at your destination.'
      } else if (destination.weather.current.temperature > 25) {
        packingTip = 'Pack light, breathable clothing - temperatures will be warm at your destination.'
      }
    }

    reminders.push({
      id: 'packing',
      priority: 'medium',
      category: 'packing',
      title: 'Start Packing',
      description: packingTip,
      completed: false,
    })
  }

  // Medication reminder
  if (trip.travelers.some(t => t.specialNeeds?.includes('Wheelchair assistance required'))) {
    reminders.push({
      id: 'medications',
      priority: 'high',
      category: 'health',
      title: 'Pack Medications',
      description: 'Ensure all medications are packed in carry-on luggage with prescriptions.',
      completed: false,
    })
  }

  // Travel insurance reminder
  if (daysUntilTrip <= 14 && daysUntilTrip >= 0) {
    reminders.push({
      id: 'travel-insurance',
      priority: 'medium',
      category: 'booking',
      title: 'Purchase Travel Insurance',
      description: 'Consider purchasing comprehensive travel insurance for peace of mind.',
      completed: false,
    })
  }

  // Currency exchange reminder
  if (daysUntilTrip <= 7 && daysUntilTrip >= 0) {
    const destination = getDestinationInfo(trip.destination)
    if (destination && destination.currency.code !== 'GBP') {
      reminders.push({
        id: 'currency-exchange',
        priority: 'low',
        category: 'travel',
        title: 'Exchange Currency',
        description: `Order ${destination.currency.name} (${destination.currency.code}) or notify your bank of travel plans.`,
        completed: false,
      })
    }
  }

  // Sort by priority and due date
  return reminders.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    }
    return 0
  })
}

export function getDestinationInfoForTrip(trip: Trip) {
  return getDestinationInfo(trip.destination)
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
