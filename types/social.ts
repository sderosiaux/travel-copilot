export type SharePrivacy = 'public' | 'friends' | 'private'
export type SharePlatform = 'twitter' | 'facebook' | 'instagram' | 'whatsapp' | 'copy-link'

export interface ShareableContent {
  id: string
  type: 'trip-highlight' | 'achievement' | 'trip-card'
  title: string
  description?: string
  imageUrl?: string
  url: string
  createdAt: string
}

export interface TripHighlight {
  id: string
  tripId: string
  tripTitle: string
  destination: string
  type: 'photo' | 'memory' | 'milestone'
  title: string
  description: string
  imageUrl?: string
  location?: string
  timestamp: string
  tags: string[]
  privacy: SharePrivacy
  createdAt: string
}

export interface ShareSettings {
  userId: string
  defaultPrivacy: SharePrivacy
  allowedPlatforms: SharePlatform[]
  autoShareAchievements: boolean
  autoShareMilestones: boolean
  watermarkEnabled: boolean
  includeLocation: boolean
  updatedAt: string
}

export interface SharedItem {
  id: string
  contentId: string
  userId: string
  platform: SharePlatform
  privacy: SharePrivacy
  url?: string
  views: number
  likes: number
  sharedAt: string
}

export interface TripCard {
  id: string
  tripId: string
  template: 'minimal' | 'detailed' | 'photo-grid'
  title: string
  destination: string
  dates: {
    start: string
    end: string
  }
  highlights: string[]
  stats: {
    countries: number
    cities: number
    flights: number
    days: number
  }
  photos: string[]
  backgroundColor: string
  textColor: string
  privacy: SharePrivacy
  createdAt: string
}
