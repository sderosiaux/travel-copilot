import { create } from 'zustand'
import type { Trip } from '@/types'

type TripStatus = 'upcoming' | 'active' | 'completed' | 'cancelled'

interface TripFilters {
  status?: TripStatus[]
  destination?: string
  dateRange?: {
    start: string
    end: string
  }
  tags?: string[]
}

type SortOption = 'date-asc' | 'date-desc' | 'name-asc' | 'name-desc'

interface TripState {
  trips: Trip[]
  currentTrip: Trip | null
  filters: TripFilters
  sortBy: SortOption
  isLoading: boolean
  error: string | null

  // Actions
  setTrips: (trips: Trip[]) => void
  addTrip: (trip: Trip) => void
  updateTrip: (tripId: string, updates: Partial<Trip>) => void
  deleteTrip: (tripId: string) => void
  setCurrentTrip: (trip: Trip | null) => void
  setFilters: (filters: TripFilters) => void
  clearFilters: () => void
  setSortBy: (sortBy: SortOption) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getUpcomingTrips: () => Trip[]
  getActiveTrips: () => Trip[]
  getPastTrips: () => Trip[]
  getFilteredTrips: () => Trip[]
  getSortedTrips: (trips: Trip[]) => Trip[]
}

export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  currentTrip: null,
  filters: {},
  sortBy: 'date-desc',
  isLoading: false,
  error: null,

  // Actions
  setTrips: (trips) => set({ trips, isLoading: false, error: null }),

  addTrip: (trip) =>
    set((state) => ({
      trips: [...state.trips, trip],
    })),

  updateTrip: (tripId, updates) =>
    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId
          ? { ...trip, ...updates, updatedAt: new Date().toISOString() }
          : trip
      ),
      currentTrip:
        state.currentTrip?.id === tripId
          ? { ...state.currentTrip, ...updates, updatedAt: new Date().toISOString() }
          : state.currentTrip,
    })),

  deleteTrip: (tripId) =>
    set((state) => ({
      trips: state.trips.filter((trip) => trip.id !== tripId),
      currentTrip: state.currentTrip?.id === tripId ? null : state.currentTrip,
    })),

  setCurrentTrip: (trip) => set({ currentTrip: trip }),

  setFilters: (filters) => set({ filters }),

  clearFilters: () => set({ filters: {} }),

  setSortBy: (sortBy) => set({ sortBy }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getUpcomingTrips: () => {
    const { trips } = get()
    return trips
      .filter((trip) => trip.status === 'upcoming')
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  },

  getActiveTrips: () => {
    const { trips } = get()
    return trips.filter((trip) => trip.status === 'active')
  },

  getPastTrips: () => {
    const { trips } = get()
    return trips
      .filter((trip) => trip.status === 'completed')
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  },

  getFilteredTrips: () => {
    const { trips, filters } = get()

    return trips.filter((trip) => {
      // Filter by status
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(trip.status)) return false
      }

      // Filter by destination
      if (filters.destination) {
        if (!trip.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
          return false
        }
      }

      // Filter by date range
      if (filters.dateRange) {
        const tripStart = new Date(trip.startDate)
        const filterStart = new Date(filters.dateRange.start)
        const filterEnd = new Date(filters.dateRange.end)

        if (tripStart < filterStart || tripStart > filterEnd) {
          return false
        }
      }

      // Filter by tags
      if (filters.tags && filters.tags.length > 0) {
        const hasTag = filters.tags.some((tag) => trip.tags.includes(tag))
        if (!hasTag) return false
      }

      return true
    })
  },

  getSortedTrips: (trips) => {
    const { sortBy } = get()
    const sorted = [...trips]

    switch (sortBy) {
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      case 'name-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'name-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return sorted
    }
  },
}))
