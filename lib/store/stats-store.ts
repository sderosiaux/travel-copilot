import { create } from 'zustand'
import type { TravelStats, StatsFilter, StatsPeriod } from '@/types/stats'

interface StatsState {
  stats: TravelStats | null
  filter: StatsFilter
  selectedPeriod: StatsPeriod
  isLoading: boolean
  error: string | null

  // Actions
  setStats: (stats: TravelStats) => void
  setFilter: (filter: StatsFilter) => void
  clearFilter: () => void
  setSelectedPeriod: (period: StatsPeriod) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getFilteredYearlyStats: () => TravelStats['yearlyStats']
  getTotalDistance: () => number
  getTotalFlightTime: () => number
  getTotalTrips: () => number
  getCountriesCount: () => number
}

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: null,
  filter: {},
  selectedPeriod: {
    label: 'All Time',
    value: 'all',
  },
  isLoading: false,
  error: null,

  // Actions
  setStats: (stats) => set({ stats, isLoading: false, error: null }),

  setFilter: (filter) => set({ filter }),

  clearFilter: () => set({ filter: {} }),

  setSelectedPeriod: (period) => {
    set({ selectedPeriod: period })
    // Update filter based on period
    if (period.value === 'year' && period.year) {
      set({ filter: { year: period.year } })
    } else if (period.value === 'custom' && period.startDate && period.endDate) {
      set({ filter: { startDate: period.startDate, endDate: period.endDate } })
    } else {
      set({ filter: {} })
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getFilteredYearlyStats: () => {
    const { stats, filter } = get()
    if (!stats) return []

    let yearlyStats = [...stats.yearlyStats]

    // Filter by year
    if (filter.year) {
      yearlyStats = yearlyStats.filter((stat) => stat.year === filter.year)
    }

    // Filter by date range (for custom periods)
    if (filter.startDate && filter.endDate) {
      const startYear = new Date(filter.startDate).getFullYear()
      const endYear = new Date(filter.endDate).getFullYear()
      yearlyStats = yearlyStats.filter(
        (stat) => stat.year >= startYear && stat.year <= endYear
      )
    }

    return yearlyStats
  },

  getTotalDistance: () => {
    const { stats, filter } = get()
    if (!stats) return 0

    if (Object.keys(filter).length === 0) {
      return stats.totalDistance
    }

    const filteredStats = get().getFilteredYearlyStats()
    return filteredStats.reduce((sum, stat) => sum + stat.distance, 0)
  },

  getTotalFlightTime: () => {
    const { stats, filter } = get()
    if (!stats) return 0

    if (Object.keys(filter).length === 0) {
      return stats.totalFlightTime
    }

    const filteredStats = get().getFilteredYearlyStats()
    return filteredStats.reduce((sum, stat) => sum + stat.flightTime, 0)
  },

  getTotalTrips: () => {
    const { stats, filter } = get()
    if (!stats) return 0

    if (Object.keys(filter).length === 0) {
      return stats.totalTrips
    }

    const filteredStats = get().getFilteredYearlyStats()
    return filteredStats.reduce((sum, stat) => sum + stat.trips, 0)
  },

  getCountriesCount: () => {
    const { stats, filter } = get()
    if (!stats) return 0

    if (Object.keys(filter).length === 0) {
      return stats.countriesVisited.length
    }

    const filteredStats = get().getFilteredYearlyStats()
    // This is an approximation - in a real app you'd track countries per year
    return Math.max(...filteredStats.map((stat) => stat.countries), 0)
  },
}))
