import { create } from 'zustand'
import type { Flight, FlightStatus } from '@/types'

type FlightGroup = 'upcoming' | 'today' | 'past'

interface FlightFilters {
  status?: FlightStatus | 'all'
  group?: FlightGroup
}

interface FlightState {
  flights: Flight[]
  selectedFlight: Flight | null
  filters: FlightFilters
  isLoading: boolean
  error: string | null

  // Actions
  setFlights: (flights: Flight[]) => void
  addFlight: (flight: Flight) => void
  updateFlight: (flightId: string, updates: Partial<Flight>) => void
  deleteFlight: (flightId: string) => void
  setSelectedFlight: (flight: Flight | null) => void
  setFilters: (filters: FlightFilters) => void
  clearFilters: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getFlightById: (id: string) => Flight | undefined
  getUpcomingFlights: () => Flight[]
  getTodayFlights: () => Flight[]
  getPastFlights: () => Flight[]
  getFilteredFlights: () => Flight[]
}

export const useFlightStore = create<FlightState>((set, get) => ({
  flights: [],
  selectedFlight: null,
  filters: { status: 'all' },
  isLoading: false,
  error: null,

  // Actions
  setFlights: (flights) => set({ flights, isLoading: false, error: null }),

  addFlight: (flight) =>
    set((state) => ({
      flights: [...state.flights, flight],
    })),

  updateFlight: (flightId, updates) =>
    set((state) => ({
      flights: state.flights.map((flight) =>
        flight.id === flightId
          ? { ...flight, ...updates, updatedAt: new Date().toISOString() }
          : flight
      ),
      selectedFlight:
        state.selectedFlight?.id === flightId
          ? { ...state.selectedFlight, ...updates, updatedAt: new Date().toISOString() }
          : state.selectedFlight,
    })),

  deleteFlight: (flightId) =>
    set((state) => ({
      flights: state.flights.filter((flight) => flight.id !== flightId),
      selectedFlight: state.selectedFlight?.id === flightId ? null : state.selectedFlight,
    })),

  setSelectedFlight: (flight) => set({ selectedFlight: flight }),

  setFilters: (filters) => set({ filters }),

  clearFilters: () => set({ filters: { status: 'all' } }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getFlightById: (id) => {
    const { flights } = get()
    return flights.find((flight) => flight.id === id)
  },

  getUpcomingFlights: () => {
    const { flights } = get()
    const now = new Date()
    return flights
      .filter((flight) => {
        const departureDate = new Date(flight.departure.scheduled)
        return departureDate > now && flight.status !== 'arrived' && flight.status !== 'cancelled'
      })
      .sort((a, b) =>
        new Date(a.departure.scheduled).getTime() - new Date(b.departure.scheduled).getTime()
      )
  },

  getTodayFlights: () => {
    const { flights } = get()
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

    return flights
      .filter((flight) => {
        const departureDate = new Date(flight.departure.scheduled)
        return departureDate >= today && departureDate < tomorrow
      })
      .sort((a, b) =>
        new Date(a.departure.scheduled).getTime() - new Date(b.departure.scheduled).getTime()
      )
  },

  getPastFlights: () => {
    const { flights } = get()
    const now = new Date()
    return flights
      .filter((flight) => {
        const departureDate = new Date(flight.departure.scheduled)
        return departureDate < now && (flight.status === 'arrived' || flight.status === 'cancelled')
      })
      .sort((a, b) =>
        new Date(b.departure.scheduled).getTime() - new Date(a.departure.scheduled).getTime()
      )
  },

  getFilteredFlights: () => {
    const { flights, filters } = get()

    return flights.filter((flight) => {
      // Filter by status
      if (filters.status && filters.status !== 'all') {
        if (flight.status !== filters.status) return false
      }

      // Filter by group
      if (filters.group) {
        const now = new Date()
        const departureDate = new Date(flight.departure.scheduled)
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

        switch (filters.group) {
          case 'upcoming':
            if (departureDate <= now || flight.status === 'arrived' || flight.status === 'cancelled') {
              return false
            }
            break
          case 'today':
            if (departureDate < today || departureDate >= tomorrow) {
              return false
            }
            break
          case 'past':
            if (departureDate >= now || (flight.status !== 'arrived' && flight.status !== 'cancelled')) {
              return false
            }
            break
        }
      }

      return true
    })
  },
}))
