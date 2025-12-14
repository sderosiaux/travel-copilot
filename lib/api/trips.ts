import type { Trip } from '@/types'
import { mockApiCall, ApiError } from './client'
import { tokyoTrip, nycTrip, parisTrip } from '@/data'

// Simulated trips database
const trips = new Map<string, Trip>([
  [tokyoTrip.id, tokyoTrip],
  [nycTrip.id, nycTrip],
  [parisTrip.id, parisTrip],
])

export async function getTrips(userId: string): Promise<Trip[]> {
  const userTrips = Array.from(trips.values()).filter(trip => trip.userId === userId)
  return mockApiCall(userTrips)
}

export async function getTrip(tripId: string): Promise<Trip> {
  const trip = trips.get(tripId)

  if (!trip) {
    throw new ApiError('Trip not found', 404, 'TRIP_NOT_FOUND')
  }

  return mockApiCall(trip)
}

export async function getUpcomingTrips(userId: string): Promise<Trip[]> {
  const userTrips = Array.from(trips.values()).filter(
    trip => trip.userId === userId && trip.status === 'upcoming'
  )

  // Sort by start date
  userTrips.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  return mockApiCall(userTrips)
}

export async function getActiveTrips(userId: string): Promise<Trip[]> {
  const userTrips = Array.from(trips.values()).filter(
    trip => trip.userId === userId && trip.status === 'active'
  )

  return mockApiCall(userTrips)
}

export async function getPastTrips(userId: string): Promise<Trip[]> {
  const userTrips = Array.from(trips.values()).filter(
    trip => trip.userId === userId && trip.status === 'completed'
  )

  // Sort by start date (most recent first)
  userTrips.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  return mockApiCall(userTrips)
}

export async function createTrip(trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> {
  const now = new Date().toISOString()
  const newTrip: Trip = {
    ...trip,
    id: `trip-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  }

  trips.set(newTrip.id, newTrip)

  return mockApiCall(newTrip, 500)
}

export async function updateTrip(
  tripId: string,
  updates: Partial<Omit<Trip, 'id' | 'userId' | 'createdAt'>>
): Promise<Trip> {
  const trip = trips.get(tripId)

  if (!trip) {
    throw new ApiError('Trip not found', 404, 'TRIP_NOT_FOUND')
  }

  const updatedTrip: Trip = {
    ...trip,
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  trips.set(tripId, updatedTrip)

  return mockApiCall(updatedTrip)
}

export async function deleteTrip(tripId: string): Promise<void> {
  if (!trips.has(tripId)) {
    throw new ApiError('Trip not found', 404, 'TRIP_NOT_FOUND')
  }

  trips.delete(tripId)

  return mockApiCall(undefined)
}
