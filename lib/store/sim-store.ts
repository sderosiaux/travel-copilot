import { create } from 'zustand'
import type { SimOption } from '@/types/sim'

interface SimState {
  options: Record<string, SimOption[]>
  selectedCountry: string | null
  selectedOption: SimOption | null
  isLoading: boolean
  error: string | null
  setOptions: (country: string, options: SimOption[]) => void
  setSelectedCountry: (country: string | null) => void
  setSelectedOption: (option: SimOption | null) => void
  getOptionsByCountry: (country: string) => SimOption[]
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useSimStore = create<SimState>((set, get) => ({
  options: {},
  selectedCountry: null,
  selectedOption: null,
  isLoading: false,
  error: null,

  setOptions: (country, options) =>
    set((state) => ({
      options: {
        ...state.options,
        [country.toLowerCase()]: options,
      },
    })),

  setSelectedCountry: (country) => set({ selectedCountry: country }),

  setSelectedOption: (option) => set({ selectedOption: option }),

  getOptionsByCountry: (country) => {
    return get().options[country.toLowerCase()] || []
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),
}))
