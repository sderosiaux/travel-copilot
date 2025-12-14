import { create } from 'zustand'
import type {
  Seat,
  SeatMap,
  SeatSelection,
  SeatFilter,
  SeatClass,
  SeatType,
  SeatAmenities,
} from '@/types/seatmap'
import {
  seatMaps as mockSeatMaps,
  seatSelections as mockSelections,
  getSeatById,
  getSeatsByClass,
  getAvailableSeats,
  compareSeatAmenities,
  calculateSeatScore,
} from '@/data/seatmaps'

interface SeatMapState {
  seatMaps: SeatMap[]
  selectedSeatMapId: string | null
  selectedSeats: Map<string, string> // passengerId -> seatId
  seatSelections: SeatSelection[]
  filters: SeatFilter
  comparisonSeats: Seat[]
  isLoading: boolean
  error: string | null

  // Actions
  setSeatMaps: (seatMaps: SeatMap[]) => void
  selectSeatMap: (seatMapId: string) => void
  selectSeat: (passengerId: string, passengerName: string, seatId: string) => void
  deselectSeat: (passengerId: string) => void
  clearAllSelections: () => void
  setFilters: (filters: Partial<SeatFilter>) => void
  resetFilters: () => void
  addToComparison: (seat: Seat) => void
  removeFromComparison: (seatId: string) => void
  clearComparison: () => void
  confirmSelection: (flightId: string, seatClass: SeatClass, price: number) => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getSelectedSeatMap: () => SeatMap | null
  getFilteredSeats: () => Seat[]
  getSeatByPosition: (row: number, column: string) => Seat | null
  getSelectedSeatForPassenger: (passengerId: string) => Seat | null
  getTotalSelectionPrice: () => number
  getSeatRecommendations: (preferences: {
    preferWindow?: boolean
    preferAisle?: boolean
    wantExtraLegroom?: boolean
  }) => Seat[]
  getComparisonData: () => {
    seats: Seat[]
    differences: string[]
  }
}

const defaultFilters: SeatFilter = {
  classes: ['economy', 'premium-economy', 'business', 'first'],
  types: ['window', 'middle', 'aisle'],
  amenities: [],
  exitRowOnly: false,
}

export const useSeatMapStore = create<SeatMapState>((set, get) => ({
  seatMaps: mockSeatMaps,
  selectedSeatMapId: mockSeatMaps[0]?.id || null,
  selectedSeats: new Map(),
  seatSelections: mockSelections,
  filters: defaultFilters,
  comparisonSeats: [],
  isLoading: false,
  error: null,

  // Actions
  setSeatMaps: (seatMaps) => set({ seatMaps }),

  selectSeatMap: (seatMapId) =>
    set({
      selectedSeatMapId: seatMapId,
      selectedSeats: new Map(),
      comparisonSeats: [],
    }),

  selectSeat: (passengerId, passengerName, seatId) => {
    const seatMap = get().getSelectedSeatMap()
    if (!seatMap) return

    const seat = seatMap.seats.find((s) => s.id === seatId)
    if (!seat || seat.status === 'occupied' || seat.status === 'blocked') {
      set({ error: 'Seat not available' })
      return
    }

    set((state) => {
      const newSelectedSeats = new Map(state.selectedSeats)

      // Remove previous selection for this passenger
      const previousSeatId = newSelectedSeats.get(passengerId)
      if (previousSeatId) {
        // Update previous seat status back to available
        const updatedMaps = state.seatMaps.map((map) => {
          if (map.id === state.selectedSeatMapId) {
            return {
              ...map,
              seats: map.seats.map((s) =>
                s.id === previousSeatId
                  ? { ...s, status: s.isExitRow ? 'extra-legroom' as const : 'available' as const }
                  : s
              ),
            }
          }
          return map
        })
        set({ seatMaps: updatedMaps })
      }

      newSelectedSeats.set(passengerId, seatId)

      // Update seat status to selected
      const updatedMaps = state.seatMaps.map((map) => {
        if (map.id === state.selectedSeatMapId) {
          return {
            ...map,
            seats: map.seats.map((s) =>
              s.id === seatId ? { ...s, status: 'selected' as const } : s
            ),
          }
        }
        return map
      })

      return {
        selectedSeats: newSelectedSeats,
        seatMaps: updatedMaps,
        error: null,
      }
    })
  },

  deselectSeat: (passengerId) => {
    set((state) => {
      const newSelectedSeats = new Map(state.selectedSeats)
      const seatId = newSelectedSeats.get(passengerId)

      if (seatId) {
        newSelectedSeats.delete(passengerId)

        // Update seat status back to available
        const updatedMaps = state.seatMaps.map((map) => {
          if (map.id === state.selectedSeatMapId) {
            return {
              ...map,
              seats: map.seats.map((s) => {
                if (s.id === seatId) {
                  return {
                    ...s,
                    status: s.isExitRow ? 'extra-legroom' : 'available',
                  } as Seat
                }
                return s
              }),
            }
          }
          return map
        })

        return {
          selectedSeats: newSelectedSeats,
          seatMaps: updatedMaps,
        }
      }

      return state
    })
  },

  clearAllSelections: () => {
    set((state) => {
      // Reset all selected seats to available
      const updatedMaps = state.seatMaps.map((map) => {
        if (map.id === state.selectedSeatMapId) {
          return {
            ...map,
            seats: map.seats.map((s) => {
              if (s.status === 'selected') {
                return {
                  ...s,
                  status: s.isExitRow ? 'extra-legroom' : 'available',
                } as Seat
              }
              return s
            }),
          }
        }
        return map
      })

      return {
        selectedSeats: new Map(),
        seatMaps: updatedMaps,
      }
    })
  },

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  addToComparison: (seat) => {
    set((state) => {
      if (state.comparisonSeats.length >= 3) {
        return { error: 'Maximum 3 seats for comparison' }
      }
      if (state.comparisonSeats.some((s) => s.id === seat.id)) {
        return state
      }
      return {
        comparisonSeats: [...state.comparisonSeats, seat],
        error: null,
      }
    })
  },

  removeFromComparison: (seatId) =>
    set((state) => ({
      comparisonSeats: state.comparisonSeats.filter((s) => s.id !== seatId),
    })),

  clearComparison: () => set({ comparisonSeats: [] }),

  confirmSelection: async (flightId, seatClass, price) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { selectedSeats } = get()
      const newSelections: SeatSelection[] = []

      selectedSeats.forEach((seatId, passengerId) => {
        const seat = get().getSeatByPosition(
          parseInt(seatId.split('-')[1].match(/\d+/)?.[0] || '0'),
          seatId.split('-')[1].match(/[A-Z]+/)?.[0] || ''
        )

        if (seat) {
          newSelections.push({
            id: `sel-${Date.now()}-${passengerId}`,
            flightId,
            passengerId,
            passengerName: passengerId, // In real app, get from passenger data
            seatId,
            seatNumber: seat.seatNumber,
            class: seatClass,
            price: seat.price || price,
            selectedAt: new Date().toISOString(),
          })
        }
      })

      set((state) => ({
        seatSelections: [...newSelections, ...state.seatSelections],
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to confirm selection',
        isLoading: false,
      })
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getSelectedSeatMap: () => {
    const { seatMaps, selectedSeatMapId } = get()
    return seatMaps.find((sm) => sm.id === selectedSeatMapId) || null
  },

  getFilteredSeats: () => {
    const seatMap = get().getSelectedSeatMap()
    if (!seatMap) return []

    const { filters } = get()

    return seatMap.seats.filter((seat) => {
      // Class filter
      if (!filters.classes.includes(seat.class)) return false

      // Type filter
      if (!filters.types.includes(seat.type)) return false

      // Legroom filter
      if (filters.minLegroom && seat.legroom < filters.minLegroom) return false

      // Price filter
      if (filters.maxPrice && seat.price && seat.price > filters.maxPrice) return false

      // Exit row filter
      if (filters.exitRowOnly && !seat.isExitRow) return false

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(
          (amenity) => seat.amenities[amenity]
        )
        if (!hasAllAmenities) return false
      }

      // Only show available or extra-legroom seats
      return seat.status === 'available' || seat.status === 'extra-legroom'
    })
  },

  getSeatByPosition: (row, column) => {
    const seatMap = get().getSelectedSeatMap()
    return seatMap?.seats.find((s) => s.row === row && s.column === column) || null
  },

  getSelectedSeatForPassenger: (passengerId) => {
    const seatId = get().selectedSeats.get(passengerId)
    if (!seatId) return null

    const seatMap = get().getSelectedSeatMap()
    return seatMap?.seats.find((s) => s.id === seatId) || null
  },

  getTotalSelectionPrice: () => {
    const { selectedSeats } = get()
    const seatMap = get().getSelectedSeatMap()
    if (!seatMap) return 0

    let total = 0
    selectedSeats.forEach((seatId) => {
      const seat = seatMap.seats.find((s) => s.id === seatId)
      if (seat?.price) {
        total += seat.price
      }
    })

    return total
  },

  getSeatRecommendations: (preferences) => {
    const availableSeats = get().getFilteredSeats()

    return availableSeats
      .map((seat) => ({
        seat,
        score: calculateSeatScore(seat, preferences),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((item) => item.seat)
  },

  getComparisonData: () => {
    const { comparisonSeats } = get()
    if (comparisonSeats.length < 2) {
      return { seats: comparisonSeats, differences: [] }
    }

    const allDifferences = new Set<string>()

    // Compare all pairs of seats
    for (let i = 0; i < comparisonSeats.length; i++) {
      for (let j = i + 1; j < comparisonSeats.length; j++) {
        const diffs = compareSeatAmenities(comparisonSeats[i], comparisonSeats[j])
        diffs.forEach((diff) => allDifferences.add(diff))
      }
    }

    return {
      seats: comparisonSeats,
      differences: Array.from(allDifferences),
    }
  },
}))
