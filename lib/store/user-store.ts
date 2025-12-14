import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserPreferences, UserSettings } from '@/types'

interface UserState {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User) => void
  updatePreferences: (prefs: Partial<UserPreferences>) => void
  updateSettings: (settings: Partial<UserSettings>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      error: null,

      setUser: (user) => set({ user, isLoading: false, error: null }),

      updatePreferences: (prefs) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                preferences: { ...state.user.preferences, ...prefs },
                updatedAt: new Date().toISOString(),
              }
            : null,
        })),

      updateSettings: (settings) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                settings: { ...state.user.settings, ...settings },
                updatedAt: new Date().toISOString(),
              }
            : null,
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      logout: () => set({ user: null, isLoading: false, error: null }),
    }),
    {
      name: 'travel-copilot-user',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
