export type RecommendationType =
  | 'destination'
  | 'experience'
  | 'airline'
  | 'hotel'
  | 'season'

export type RecommendationReason =
  | 'based_on_preferences'
  | 'based_on_history'
  | 'trending'
  | 'seasonal'
  | 'similar_travelers'

export interface Recommendation {
  id: string
  userId: string
  type: RecommendationType
  title: string
  description: string
  reason: RecommendationReason
  score: number // 0-100, confidence score
  imageUrl?: string
  metadata: RecommendationMetadata
  tags: string[]
  createdAt: string
  expiresAt?: string
  isActive: boolean
  isDismissed: boolean
}

export interface RecommendationMetadata {
  // For destination recommendations
  destination?: {
    city: string
    country: string
    countryCode: string
    continent: string
    estimatedCost?: number
    bestTimeToVisit?: string[]
    flightTime?: number
    distance?: number
  }

  // For experience recommendations
  experience?: {
    category: string
    duration?: number
    difficulty?: 'easy' | 'moderate' | 'challenging'
    priceRange?: string
    minAge?: number
  }

  // For airline recommendations
  airline?: {
    airlineCode: string
    airlineName: string
    alliance?: string
    averagePrice?: number
    onTimePerformance?: number
  }

  // For hotel recommendations
  hotel?: {
    name: string
    chain?: string
    stars: number
    priceRange: string
    amenities: string[]
  }

  // For season recommendations
  season?: {
    destination: string
    months: string[]
    weatherCondition: string
    events?: string[]
  }
}

export interface RecommendationInsight {
  id: string
  title: string
  description: string
  category: 'preference' | 'pattern' | 'savings' | 'tip'
  iconName?: string
  priority: 'low' | 'medium' | 'high'
}

export interface PersonalizedFeed {
  userId: string
  recommendations: Recommendation[]
  insights: RecommendationInsight[]
  lastUpdated: string
}

export interface RecommendationFilter {
  types?: RecommendationType[]
  reasons?: RecommendationReason[]
  minScore?: number
  tags?: string[]
  isActive?: boolean
  isDismissed?: boolean
}

export interface RecommendationPreferences {
  interestedInDestinations: string[]
  interestedInExperiences: string[]
  preferredBudget: 'budget' | 'moderate' | 'luxury'
  travelStyle: 'adventure' | 'relaxation' | 'cultural' | 'mixed'
  seasonalPreferences: string[]
  avoidDestinations: string[]
}
