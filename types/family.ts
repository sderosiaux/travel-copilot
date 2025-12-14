export interface FamilyMember {
  id: string
  firstName: string
  lastName: string
  relationship: 'self' | 'spouse' | 'partner' | 'child' | 'parent' | 'sibling' | 'other'
  dateOfBirth?: string
  email?: string
  phone?: string
  avatar?: string
  documents: string[]
  specialNeeds?: SpecialNeeds
  preferences?: {
    seatPosition?: 'window' | 'middle' | 'aisle' | 'no_preference'
    mealPreference?: 'regular' | 'vegetarian' | 'vegan' | 'halal' | 'kosher' | 'gluten_free'
    requiresSupervision?: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface Household {
  id: string
  primaryUserId: string
  name: string
  members: string[]
  preferences: {
    keepTogether: boolean
    preferredSeating?: 'together' | 'nearby' | 'flexible'
    specialRequirements?: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface SpecialNeeds {
  wheelchair: boolean
  hearingAssistance: boolean
  visualAssistance: boolean
  cognitiveAssistance: boolean
  medicalConditions?: string[]
  medications?: Array<{
    name: string
    dosage: string
    frequency: string
    keepInCarryOn: boolean
  }>
  dietaryRestrictions?: string[]
  allergies?: string[]
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
  notes?: string
}
