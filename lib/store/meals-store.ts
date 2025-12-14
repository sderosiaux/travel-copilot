import { create } from 'zustand'
import type { Meal, MealPreorder, FlightMealService, DietaryOption } from '@/types/meals'

interface MealFilters {
  flightId?: string
  dietaryOptions?: DietaryOption[]
  searchQuery?: string
}

interface MealsState {
  meals: Meal[]
  preorders: MealPreorder[]
  flightServices: FlightMealService[]
  filters: MealFilters
  isLoading: boolean
  error: string | null

  // Actions
  setMeals: (meals: Meal[]) => void
  setPreorders: (preorders: MealPreorder[]) => void
  setFlightServices: (services: FlightMealService[]) => void
  addPreorder: (preorder: MealPreorder) => void
  updatePreorder: (preorderId: string, updates: Partial<MealPreorder>) => void
  cancelPreorder: (preorderId: string) => void
  setFilters: (filters: MealFilters) => void
  clearFilters: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getFlightService: (flightId: string) => FlightMealService | null
  getPreordersByFlight: (flightId: string) => MealPreorder[]
  getPreorderByTraveler: (flightId: string, travelerId: string) => MealPreorder | null
  getFilteredMeals: (flightId: string) => Meal[]
  isPreorderDeadlinePassed: (flightId: string) => boolean
  canPreorder: (flightId: string) => boolean
}

export const useMealsStore = create<MealsState>((set, get) => ({
  meals: [],
  preorders: [],
  flightServices: [],
  filters: {},
  isLoading: false,
  error: null,

  // Actions
  setMeals: (meals) => set({ meals, isLoading: false, error: null }),

  setPreorders: (preorders) => set({ preorders }),

  setFlightServices: (services) => set({ flightServices: services }),

  addPreorder: (preorder) =>
    set((state) => ({
      preorders: [...state.preorders, preorder],
    })),

  updatePreorder: (preorderId, updates) =>
    set((state) => ({
      preorders: state.preorders.map((preorder) =>
        preorder.id === preorderId
          ? { ...preorder, ...updates, updatedAt: new Date().toISOString() }
          : preorder
      ),
    })),

  cancelPreorder: (preorderId) =>
    set((state) => ({
      preorders: state.preorders.map((preorder) =>
        preorder.id === preorderId
          ? { ...preorder, status: 'cancelled' as const, updatedAt: new Date().toISOString() }
          : preorder
      ),
    })),

  setFilters: (filters) => set({ filters }),

  clearFilters: () => set({ filters: {} }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getFlightService: (flightId) => {
    const { flightServices } = get()
    return flightServices.find((service) => service.flightId === flightId) || null
  },

  getPreordersByFlight: (flightId) => {
    const { preorders } = get()
    return preorders.filter((preorder) => preorder.flightId === flightId)
  },

  getPreorderByTraveler: (flightId, travelerId) => {
    const { preorders } = get()
    return (
      preorders.find(
        (preorder) =>
          preorder.flightId === flightId &&
          preorder.travelerId === travelerId &&
          preorder.status !== 'cancelled'
      ) || null
    )
  },

  getFilteredMeals: (flightId) => {
    const { filters } = get()
    const service = get().getFlightService(flightId)

    if (!service) return []

    let filtered = [...service.availableMeals]

    // Filter by dietary options
    if (filters.dietaryOptions && filters.dietaryOptions.length > 0) {
      filtered = filtered.filter((meal) =>
        filters.dietaryOptions!.some((option) => meal.dietaryOptions.includes(option))
      )
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (meal) =>
          meal.name.toLowerCase().includes(query) ||
          meal.description.toLowerCase().includes(query) ||
          meal.cuisine.toLowerCase().includes(query)
      )
    }

    return filtered
  },

  isPreorderDeadlinePassed: (flightId) => {
    const service = get().getFlightService(flightId)
    if (!service) return true

    const deadline = new Date(service.preorderDeadline)
    const now = new Date()
    return now > deadline
  },

  canPreorder: (flightId) => {
    const service = get().getFlightService(flightId)
    if (!service) return false

    return !get().isPreorderDeadlinePassed(flightId) && service.availableMeals.length > 0
  },
}))
