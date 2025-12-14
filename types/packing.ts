export interface PackingItem {
  id: string
  name: string
  category: PackingCategory
  quantity: number
  isPacked: boolean
  isEssential: boolean
  notes?: string
  addedBy?: string
  createdAt: string
  updatedAt: string
}

export type PackingCategory =
  | 'clothing'
  | 'toiletries'
  | 'electronics'
  | 'documents'
  | 'medications'
  | 'accessories'
  | 'outdoor'
  | 'entertainment'
  | 'food'
  | 'other'

export interface PackingList {
  id: string
  tripId?: string
  userId: string
  title: string
  description?: string
  destination?: string
  startDate?: string
  endDate?: string
  tripType: TripType
  weatherConditions?: WeatherCondition[]
  items: PackingItem[]
  sharedWith: string[] // User IDs
  isTemplate: boolean
  templateType?: TemplateType
  progress: PackingProgress
  createdAt: string
  updatedAt: string
}

export type TripType = 'beach' | 'business' | 'winter' | 'hiking' | 'city' | 'camping' | 'cruise' | 'mixed'

export type WeatherCondition = 'hot' | 'cold' | 'rainy' | 'snowy' | 'humid' | 'windy' | 'mild'

export type TemplateType = 'beach' | 'business' | 'winter' | 'hiking' | 'city' | 'camping' | 'cruise'

export interface PackingProgress {
  totalItems: number
  packedItems: number
  percentage: number
  essentialsPacked: number
  essentialsTotal: number
}

export interface PackingSuggestion {
  category: PackingCategory
  items: SuggestionItem[]
  reason: string
  priority: 'high' | 'medium' | 'low'
}

export interface SuggestionItem {
  name: string
  quantity: number
  isEssential: boolean
  reason?: string
}

export interface PackingTemplate {
  id: string
  type: TemplateType
  name: string
  description: string
  tripTypes: TripType[]
  weatherConditions: WeatherCondition[]
  categories: PackingTemplateCategory[]
  estimatedDuration: string // e.g., '3-5 days', '1 week+'
}

export interface PackingTemplateCategory {
  category: PackingCategory
  items: TemplateItem[]
}

export interface TemplateItem {
  name: string
  quantity: number
  isEssential: boolean
  conditions?: string[] // When to include this item
}

export interface PackingPreference {
  defaultTripType: TripType
  autoSuggest: boolean
  includeWeatherBasedItems: boolean
  defaultCategories: PackingCategory[]
  customCategories: string[]
}

export interface ShareSettings {
  allowEditing: boolean
  allowAdding: boolean
  allowDeleting: boolean
  sharedUsers: SharedUser[]
}

export interface SharedUser {
  userId: string
  name: string
  email: string
  canEdit: boolean
  sharedAt: string
}
