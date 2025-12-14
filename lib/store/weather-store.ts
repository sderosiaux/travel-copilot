import { create } from 'zustand'
import type { WeatherForecast } from '@/types/weather'

interface WeatherState {
  forecasts: Record<string, WeatherForecast>
  selectedDestination: string | null
  isLoading: boolean
  error: string | null
  setForecasts: (forecasts: WeatherForecast[]) => void
  addForecast: (forecast: WeatherForecast) => void
  setSelectedDestination: (destination: string | null) => void
  getForecastByDestination: (destination: string) => WeatherForecast | undefined
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
  forecasts: {},
  selectedDestination: null,
  isLoading: false,
  error: null,

  setForecasts: (forecasts) =>
    set({
      forecasts: forecasts.reduce(
        (acc, forecast) => {
          acc[forecast.id] = forecast
          return acc
        },
        {} as Record<string, WeatherForecast>
      ),
    }),

  addForecast: (forecast) =>
    set((state) => ({
      forecasts: {
        ...state.forecasts,
        [forecast.id]: forecast,
      },
    })),

  setSelectedDestination: (destination) =>
    set({ selectedDestination: destination }),

  getForecastByDestination: (destination) => {
    const forecasts = get().forecasts
    return Object.values(forecasts).find(
      (f) => f.destination.toLowerCase() === destination.toLowerCase()
    )
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),
}))
