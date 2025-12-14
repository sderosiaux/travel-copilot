export type ReviewableType = 'flight' | 'hotel' | 'activity' | 'restaurant' | 'lounge'

export type ReviewStatus = 'pending' | 'published' | 'flagged' | 'removed'

export interface ReviewPhoto {
  id: string
  url: string
  caption?: string
  uploadedAt: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  reviewableType: ReviewableType
  reviewableId: string
  reviewableName: string
  rating: number // 1-5
  title: string
  content: string
  photos: ReviewPhoto[]
  helpfulVotes: number
  notHelpfulVotes: number
  verified: boolean
  status: ReviewStatus
  createdAt: string
  updatedAt: string
}

export interface ReviewVote {
  id: string
  reviewId: string
  userId: string
  helpful: boolean // true = helpful, false = not helpful
  createdAt: string
}

export interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  verifiedReviews: number
  withPhotos: number
}

export interface Reviewable {
  id: string
  type: ReviewableType
  name: string
  description?: string
  imageUrl?: string
  stats: ReviewStats
}
