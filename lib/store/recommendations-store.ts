import { create } from 'zustand'
import type {
  Recommendation,
  RecommendationInsight,
  RecommendationFilter,
  RecommendationType,
} from '@/types/recommendations'

interface RecommendationsState {
  recommendations: Recommendation[]
  insights: RecommendationInsight[]
  filter: RecommendationFilter
  selectedType: RecommendationType | 'all'
  isLoading: boolean
  error: string | null

  // Actions
  setRecommendations: (recommendations: Recommendation[]) => void
  setInsights: (insights: RecommendationInsight[]) => void
  dismissRecommendation: (recommendationId: string) => void
  restoreRecommendation: (recommendationId: string) => void
  setFilter: (filter: RecommendationFilter) => void
  clearFilter: () => void
  setSelectedType: (type: RecommendationType | 'all') => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getActiveRecommendations: () => Recommendation[]
  getDismissedRecommendations: () => Recommendation[]
  getFilteredRecommendations: () => Recommendation[]
  getRecommendationsByType: (type: RecommendationType) => Recommendation[]
  getHighPriorityInsights: () => RecommendationInsight[]
}

export const useRecommendationsStore = create<RecommendationsState>((set, get) => ({
  recommendations: [],
  insights: [],
  filter: {},
  selectedType: 'all',
  isLoading: false,
  error: null,

  // Actions
  setRecommendations: (recommendations) =>
    set({ recommendations, isLoading: false, error: null }),

  setInsights: (insights) => set({ insights }),

  dismissRecommendation: (recommendationId) =>
    set((state) => ({
      recommendations: state.recommendations.map((rec) =>
        rec.id === recommendationId ? { ...rec, isDismissed: true, isActive: false } : rec
      ),
    })),

  restoreRecommendation: (recommendationId) =>
    set((state) => ({
      recommendations: state.recommendations.map((rec) =>
        rec.id === recommendationId ? { ...rec, isDismissed: false, isActive: true } : rec
      ),
    })),

  setFilter: (filter) => set({ filter }),

  clearFilter: () => set({ filter: {} }),

  setSelectedType: (type) => set({ selectedType: type }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getActiveRecommendations: () => {
    const { recommendations } = get()
    return recommendations
      .filter((rec) => rec.isActive && !rec.isDismissed)
      .sort((a, b) => b.score - a.score)
  },

  getDismissedRecommendations: () => {
    const { recommendations } = get()
    return recommendations.filter((rec) => rec.isDismissed)
  },

  getFilteredRecommendations: () => {
    const { recommendations, filter, selectedType } = get()

    return recommendations.filter((rec) => {
      // Filter by active status
      if (filter.isActive !== undefined && rec.isActive !== filter.isActive) {
        return false
      }

      // Filter by dismissed status
      if (filter.isDismissed !== undefined && rec.isDismissed !== filter.isDismissed) {
        return false
      }

      // Filter by type
      if (selectedType !== 'all' && rec.type !== selectedType) {
        return false
      }

      if (filter.types && filter.types.length > 0) {
        if (!filter.types.includes(rec.type)) return false
      }

      // Filter by reason
      if (filter.reasons && filter.reasons.length > 0) {
        if (!filter.reasons.includes(rec.reason)) return false
      }

      // Filter by min score
      if (filter.minScore !== undefined && rec.score < filter.minScore) {
        return false
      }

      // Filter by tags
      if (filter.tags && filter.tags.length > 0) {
        const hasTag = filter.tags.some((tag) => rec.tags.includes(tag))
        if (!hasTag) return false
      }

      return true
    }).sort((a, b) => b.score - a.score)
  },

  getRecommendationsByType: (type) => {
    const { recommendations } = get()
    return recommendations
      .filter((rec) => rec.type === type && rec.isActive && !rec.isDismissed)
      .sort((a, b) => b.score - a.score)
  },

  getHighPriorityInsights: () => {
    const { insights } = get()
    return insights.filter((insight) => insight.priority === 'high')
  },
}))
