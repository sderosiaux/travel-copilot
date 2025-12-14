import { create } from 'zustand'
import type {
  TripHighlight,
  ShareSettings,
  SharedItem,
  TripCard,
  SharePrivacy,
  SharePlatform,
} from '@/types/social'

interface SocialState {
  highlights: TripHighlight[]
  tripCards: TripCard[]
  sharedItems: SharedItem[]
  settings: ShareSettings | null
  isLoading: boolean
  error: string | null

  // Actions
  setHighlights: (highlights: TripHighlight[]) => void
  addHighlight: (highlight: TripHighlight) => void
  updateHighlight: (highlightId: string, updates: Partial<TripHighlight>) => void
  deleteHighlight: (highlightId: string) => void

  setTripCards: (cards: TripCard[]) => void
  addTripCard: (card: TripCard) => void
  updateTripCard: (cardId: string, updates: Partial<TripCard>) => void
  deleteTripCard: (cardId: string) => void

  setSharedItems: (items: SharedItem[]) => void
  addSharedItem: (item: SharedItem) => void

  setSettings: (settings: ShareSettings) => void
  updateSettings: (updates: Partial<ShareSettings>) => void

  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getHighlightsByTrip: (tripId: string) => TripHighlight[]
  getHighlightsByPrivacy: (privacy: SharePrivacy) => TripHighlight[]
  getTripCardByTripId: (tripId: string) => TripCard | undefined
  getSharedItemsByPlatform: (platform: SharePlatform) => SharedItem[]
  getRecentHighlights: (limit?: number) => TripHighlight[]
}

export const useSocialStore = create<SocialState>((set, get) => ({
  highlights: [],
  tripCards: [],
  sharedItems: [],
  settings: null,
  isLoading: false,
  error: null,

  // Actions
  setHighlights: (highlights) =>
    set({ highlights, isLoading: false, error: null }),

  addHighlight: (highlight) =>
    set((state) => ({
      highlights: [...state.highlights, highlight],
    })),

  updateHighlight: (highlightId, updates) =>
    set((state) => ({
      highlights: state.highlights.map((highlight) =>
        highlight.id === highlightId
          ? { ...highlight, ...updates }
          : highlight
      ),
    })),

  deleteHighlight: (highlightId) =>
    set((state) => ({
      highlights: state.highlights.filter((h) => h.id !== highlightId),
    })),

  setTripCards: (cards) =>
    set({ tripCards: cards, isLoading: false, error: null }),

  addTripCard: (card) =>
    set((state) => ({
      tripCards: [...state.tripCards, card],
    })),

  updateTripCard: (cardId, updates) =>
    set((state) => ({
      tripCards: state.tripCards.map((card) =>
        card.id === cardId ? { ...card, ...updates } : card
      ),
    })),

  deleteTripCard: (cardId) =>
    set((state) => ({
      tripCards: state.tripCards.filter((c) => c.id !== cardId),
    })),

  setSharedItems: (items) =>
    set({ sharedItems: items, isLoading: false, error: null }),

  addSharedItem: (item) =>
    set((state) => ({
      sharedItems: [...state.sharedItems, item],
    })),

  setSettings: (settings) =>
    set({ settings, isLoading: false, error: null }),

  updateSettings: (updates) =>
    set((state) => ({
      settings: state.settings
        ? { ...state.settings, ...updates, updatedAt: new Date().toISOString() }
        : null,
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getHighlightsByTrip: (tripId) => {
    const { highlights } = get()
    return highlights.filter((h) => h.tripId === tripId)
  },

  getHighlightsByPrivacy: (privacy) => {
    const { highlights } = get()
    return highlights.filter((h) => h.privacy === privacy)
  },

  getTripCardByTripId: (tripId) => {
    const { tripCards } = get()
    return tripCards.find((c) => c.tripId === tripId)
  },

  getSharedItemsByPlatform: (platform) => {
    const { sharedItems } = get()
    return sharedItems.filter((i) => i.platform === platform)
  },

  getRecentHighlights: (limit = 10) => {
    const { highlights } = get()
    return [...highlights]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  },
}))
