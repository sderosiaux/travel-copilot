import { create } from 'zustand'
import type { Currency, CurrencyConversion, HistoricalRate } from '@/types/currency'
import { getExchangeRate, convertCurrency } from '@/data/currency'

type ChartPeriod = '7d' | '30d' | '90d' | '1y'

interface CurrencyState {
  favoriteCurrencies: string[]
  recentConversions: CurrencyConversion[]
  fromCurrency: string
  toCurrency: string
  amount: number
  convertedAmount: number
  chartPeriod: ChartPeriod
  offlineMode: boolean
  lastUpdated: string | null
  isLoading: boolean
  error: string | null

  // Actions
  setFavoriteCurrencies: (currencies: string[]) => void
  addFavoriteCurrency: (currencyCode: string) => void
  removeFavoriteCurrency: (currencyCode: string) => void
  setFromCurrency: (currencyCode: string) => void
  setToCurrency: (currencyCode: string) => void
  setAmount: (amount: number) => void
  swapCurrencies: () => void
  convert: () => void
  addConversion: (conversion: CurrencyConversion) => void
  setChartPeriod: (period: ChartPeriod) => void
  setOfflineMode: (offline: boolean) => void
  refreshRates: () => Promise<void>
  clearRecentConversions: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getConversionRate: () => number
  getRecentConversions: (limit?: number) => CurrencyConversion[]
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  favoriteCurrencies: ['EUR', 'GBP', 'JPY'],
  recentConversions: [],
  fromCurrency: 'USD',
  toCurrency: 'EUR',
  amount: 100,
  convertedAmount: 92,
  chartPeriod: '30d',
  offlineMode: false,
  lastUpdated: new Date().toISOString(),
  isLoading: false,
  error: null,

  // Actions
  setFavoriteCurrencies: (currencies) => set({ favoriteCurrencies: currencies }),

  addFavoriteCurrency: (currencyCode) =>
    set((state) => {
      if (!state.favoriteCurrencies.includes(currencyCode)) {
        return {
          favoriteCurrencies: [...state.favoriteCurrencies, currencyCode],
        }
      }
      return state
    }),

  removeFavoriteCurrency: (currencyCode) =>
    set((state) => ({
      favoriteCurrencies: state.favoriteCurrencies.filter(
        (code) => code !== currencyCode
      ),
    })),

  setFromCurrency: (currencyCode) => {
    set({ fromCurrency: currencyCode })
    get().convert()
  },

  setToCurrency: (currencyCode) => {
    set({ toCurrency: currencyCode })
    get().convert()
  },

  setAmount: (amount) => {
    set({ amount })
    get().convert()
  },

  swapCurrencies: () => {
    const { fromCurrency, toCurrency } = get()
    set({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
    })
    get().convert()
  },

  convert: () => {
    const { amount, fromCurrency, toCurrency } = get()
    const converted = convertCurrency(amount, fromCurrency, toCurrency)
    set({ convertedAmount: converted })
  },

  addConversion: (conversion) =>
    set((state) => ({
      recentConversions: [conversion, ...state.recentConversions].slice(0, 10),
    })),

  setChartPeriod: (period) => set({ chartPeriod: period }),

  setOfflineMode: (offline) => set({ offlineMode: offline }),

  refreshRates: async () => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      set({
        lastUpdated: new Date().toISOString(),
        isLoading: false,
      })
      get().convert()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to refresh rates',
        isLoading: false,
      })
    }
  },

  clearRecentConversions: () => set({ recentConversions: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getConversionRate: () => {
    const { fromCurrency, toCurrency } = get()
    return getExchangeRate(fromCurrency, toCurrency)
  },

  getRecentConversions: (limit = 10) => {
    const { recentConversions } = get()
    return recentConversions.slice(0, limit)
  },
}))
