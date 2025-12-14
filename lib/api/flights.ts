import type { Flight, FlightStatus, FlightUpdate } from '@/types'
import { mockApiCall, ApiError } from './client'
import {
  tokyoOutbound,
  tokyoReturn,
  nycOutbound,
  nycReturn,
  parisOutbound,
  parisReturn,
} from '@/data'

// Simulated flights database
const flights = new Map<string, Flight>([
  [tokyoOutbound.id, tokyoOutbound],
  [tokyoReturn.id, tokyoReturn],
  [nycOutbound.id, nycOutbound],
  [nycReturn.id, nycReturn],
  [parisOutbound.id, parisOutbound],
  [parisReturn.id, parisReturn],
])

// Simulated flight updates
const flightUpdates = new Map<string, FlightUpdate[]>()

export async function getFlight(flightId: string): Promise<Flight> {
  const flight = flights.get(flightId)

  if (!flight) {
    throw new ApiError('Flight not found', 404, 'FLIGHT_NOT_FOUND')
  }

  return mockApiCall(flight)
}

export async function getFlights(flightIds: string[]): Promise<Flight[]> {
  const flightList = flightIds
    .map(id => flights.get(id))
    .filter((flight): flight is Flight => flight !== undefined)

  return mockApiCall(flightList)
}

export async function getFlightStatus(flightId: string): Promise<Flight> {
  const flight = flights.get(flightId)

  if (!flight) {
    throw new ApiError('Flight not found', 404, 'FLIGHT_NOT_FOUND')
  }

  // Simulate real-time status updates
  return mockApiCall(flight, 100)
}

export async function getFlightUpdates(flightId: string): Promise<FlightUpdate[]> {
  const updates = flightUpdates.get(flightId) || []
  return mockApiCall(updates)
}

export async function simulateStatusUpdate(
  flightId: string,
  newStatus: FlightStatus,
  message?: string
): Promise<Flight> {
  const flight = flights.get(flightId)

  if (!flight) {
    throw new ApiError('Flight not found', 404, 'FLIGHT_NOT_FOUND')
  }

  const updatedFlight: Flight = {
    ...flight,
    status: newStatus,
    updatedAt: new Date().toISOString(),
  }

  flights.set(flightId, updatedFlight)

  // Create update record
  const update: FlightUpdate = {
    id: `update-${Date.now()}`,
    flightId,
    timestamp: new Date().toISOString(),
    type: 'status_change',
    oldValue: flight.status,
    newValue: newStatus,
    message: message || `Flight status changed to ${newStatus}`,
    severity: newStatus === 'cancelled' || newStatus === 'diverted' ? 'critical' : 'info',
  }

  const existingUpdates = flightUpdates.get(flightId) || []
  flightUpdates.set(flightId, [...existingUpdates, update])

  return mockApiCall(updatedFlight)
}

export async function simulateGateChange(
  flightId: string,
  newGate: string
): Promise<Flight> {
  const flight = flights.get(flightId)

  if (!flight) {
    throw new ApiError('Flight not found', 404, 'FLIGHT_NOT_FOUND')
  }

  const oldGate = flight.departure.gate

  const updatedFlight: Flight = {
    ...flight,
    departure: {
      ...flight.departure,
      gate: newGate,
    },
    updatedAt: new Date().toISOString(),
  }

  flights.set(flightId, updatedFlight)

  // Create update record
  const update: FlightUpdate = {
    id: `update-${Date.now()}`,
    flightId,
    timestamp: new Date().toISOString(),
    type: 'gate_change',
    oldValue: oldGate,
    newValue: newGate,
    message: `Gate changed from ${oldGate} to ${newGate}`,
    severity: 'warning',
  }

  const existingUpdates = flightUpdates.get(flightId) || []
  flightUpdates.set(flightId, [...existingUpdates, update])

  return mockApiCall(updatedFlight)
}

export async function simulateDelay(
  flightId: string,
  delayMinutes: number
): Promise<Flight> {
  const flight = flights.get(flightId)

  if (!flight) {
    throw new ApiError('Flight not found', 404, 'FLIGHT_NOT_FOUND')
  }

  const scheduledTime = new Date(flight.departure.scheduled)
  const estimatedTime = new Date(scheduledTime.getTime() + delayMinutes * 60000)

  const updatedFlight: Flight = {
    ...flight,
    status: 'delayed',
    departure: {
      ...flight.departure,
      estimated: estimatedTime.toISOString(),
    },
    updatedAt: new Date().toISOString(),
  }

  flights.set(flightId, updatedFlight)

  // Create update record
  const update: FlightUpdate = {
    id: `update-${Date.now()}`,
    flightId,
    timestamp: new Date().toISOString(),
    type: 'delay',
    oldValue: flight.departure.scheduled,
    newValue: estimatedTime.toISOString(),
    message: `Flight delayed by ${delayMinutes} minutes`,
    severity: delayMinutes > 60 ? 'critical' : 'warning',
  }

  const existingUpdates = flightUpdates.get(flightId) || []
  flightUpdates.set(flightId, [...existingUpdates, update])

  return mockApiCall(updatedFlight)
}
