import { create } from 'zustand'
import type { Review, ReviewVote, Reviewable, ReviewableType } from '@/types/reviews'

interface ReviewFilters {
  reviewableType?: ReviewableType
  reviewableId?: string
  minRating?: number
  verified?: boolean
  withPhotos?: boolean
}

type SortOption = 'most_recent' | 'highest_rated' | 'lowest_rated' | 'most_helpful'

interface ReviewsState {
  reviews: Review[]
  votes: ReviewVote[]
  reviewables: Reviewable[]
  filters: ReviewFilters
  sortBy: SortOption
  isLoading: boolean
  error: string | null

  // Actions
  setReviews: (reviews: Review[]) => void
  setVotes: (votes: ReviewVote[]) => void
  setReviewables: (reviewables: Reviewable[]) => void
  addReview: (review: Review) => void
  updateReview: (reviewId: string, updates: Partial<Review>) => void
  deleteReview: (reviewId: string) => void
  addVote: (vote: ReviewVote) => void
  removeVote: (voteId: string) => void
  setFilters: (filters: ReviewFilters) => void
  clearFilters: () => void
  setSortBy: (sortBy: SortOption) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getReviewsByReviewable: (reviewableId: string) => Review[]
  getReviewable: (reviewableId: string) => Reviewable | null
  getUserVote: (reviewId: string, userId: string) => ReviewVote | null
  hasUserVoted: (reviewId: string, userId: string) => boolean
  getFilteredReviews: () => Review[]
  getSortedReviews: (reviews: Review[]) => Review[]
  getUserReviews: (userId: string) => Review[]
  canUserReview: (userId: string, reviewableId: string) => boolean
}

export const useReviewsStore = create<ReviewsState>((set, get) => ({
  reviews: [],
  votes: [],
  reviewables: [],
  filters: {},
  sortBy: 'most_recent',
  isLoading: false,
  error: null,

  // Actions
  setReviews: (reviews) => set({ reviews, isLoading: false, error: null }),

  setVotes: (votes) => set({ votes }),

  setReviewables: (reviewables) => set({ reviewables }),

  addReview: (review) =>
    set((state) => ({
      reviews: [...state.reviews, review],
    })),

  updateReview: (reviewId, updates) =>
    set((state) => ({
      reviews: state.reviews.map((review) =>
        review.id === reviewId
          ? { ...review, ...updates, updatedAt: new Date().toISOString() }
          : review
      ),
    })),

  deleteReview: (reviewId) =>
    set((state) => ({
      reviews: state.reviews.filter((review) => review.id !== reviewId),
      votes: state.votes.filter((vote) => vote.reviewId !== reviewId),
    })),

  addVote: (vote) =>
    set((state) => {
      const existingVote = state.votes.find(
        (v) => v.reviewId === vote.reviewId && v.userId === vote.userId
      )

      // Remove existing vote if changing vote type
      const filteredVotes = existingVote
        ? state.votes.filter((v) => v.id !== existingVote.id)
        : state.votes

      // Update review vote counts
      const reviews = state.reviews.map((review) => {
        if (review.id === vote.reviewId) {
          let helpfulVotes = review.helpfulVotes
          let notHelpfulVotes = review.notHelpfulVotes

          // Remove old vote counts
          if (existingVote) {
            if (existingVote.helpful) {
              helpfulVotes--
            } else {
              notHelpfulVotes--
            }
          }

          // Add new vote counts
          if (vote.helpful) {
            helpfulVotes++
          } else {
            notHelpfulVotes++
          }

          return { ...review, helpfulVotes, notHelpfulVotes }
        }
        return review
      })

      return {
        votes: [...filteredVotes, vote],
        reviews,
      }
    }),

  removeVote: (voteId) =>
    set((state) => {
      const vote = state.votes.find((v) => v.id === voteId)
      if (!vote) return state

      // Update review vote counts
      const reviews = state.reviews.map((review) => {
        if (review.id === vote.reviewId) {
          return {
            ...review,
            helpfulVotes: vote.helpful ? review.helpfulVotes - 1 : review.helpfulVotes,
            notHelpfulVotes: !vote.helpful ? review.notHelpfulVotes - 1 : review.notHelpfulVotes,
          }
        }
        return review
      })

      return {
        votes: state.votes.filter((v) => v.id !== voteId),
        reviews,
      }
    }),

  setFilters: (filters) => set({ filters }),

  clearFilters: () => set({ filters: {} }),

  setSortBy: (sortBy) => set({ sortBy }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getReviewsByReviewable: (reviewableId) => {
    const { reviews } = get()
    return reviews.filter((review) => review.reviewableId === reviewableId)
  },

  getReviewable: (reviewableId) => {
    const { reviewables } = get()
    return reviewables.find((r) => r.id === reviewableId) || null
  },

  getUserVote: (reviewId, userId) => {
    const { votes } = get()
    return votes.find((vote) => vote.reviewId === reviewId && vote.userId === userId) || null
  },

  hasUserVoted: (reviewId, userId) => {
    return get().getUserVote(reviewId, userId) !== null
  },

  getFilteredReviews: () => {
    const { reviews, filters } = get()

    return reviews.filter((review) => {
      // Filter by reviewable type
      if (filters.reviewableType && review.reviewableType !== filters.reviewableType) {
        return false
      }

      // Filter by reviewable ID
      if (filters.reviewableId && review.reviewableId !== filters.reviewableId) {
        return false
      }

      // Filter by minimum rating
      if (filters.minRating !== undefined && review.rating < filters.minRating) {
        return false
      }

      // Filter by verified status
      if (filters.verified !== undefined && review.verified !== filters.verified) {
        return false
      }

      // Filter by photos
      if (filters.withPhotos && review.photos.length === 0) {
        return false
      }

      return true
    })
  },

  getSortedReviews: (reviews) => {
    const { sortBy } = get()
    const sorted = [...reviews]

    switch (sortBy) {
      case 'most_recent':
        return sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      case 'highest_rated':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'lowest_rated':
        return sorted.sort((a, b) => a.rating - b.rating)
      case 'most_helpful':
        return sorted.sort((a, b) => {
          const aScore = a.helpfulVotes - a.notHelpfulVotes
          const bScore = b.helpfulVotes - b.notHelpfulVotes
          return bScore - aScore
        })
      default:
        return sorted
    }
  },

  getUserReviews: (userId) => {
    const { reviews } = get()
    return reviews.filter((review) => review.userId === userId)
  },

  canUserReview: (userId, reviewableId) => {
    const reviews = get().getReviewsByReviewable(reviewableId)
    // Check if user has already reviewed this item
    return !reviews.some((review) => review.userId === userId && review.status !== 'removed')
  },
}))
