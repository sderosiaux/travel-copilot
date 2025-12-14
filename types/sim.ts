export type SimType = 'physical' | 'esim'
export type NetworkType = '3G' | '4G' | '5G'
export type CoverageLevel = 'excellent' | 'good' | 'fair' | 'limited'

export interface SimOption {
  id: string
  provider: string
  country: string
  countries: string[]
  type: SimType
  name: string
  description: string
  dataPlans: DataPlan[]
  features: string[]
  coverage: CoverageInfo
  setupInstructions: SetupInstruction[]
  activationTime: string
  supportContact: ContactInfo
  rating: number
  reviewCount: number
  bestFor: string[]
}

export interface DataPlan {
  id: string
  name: string
  data: string
  duration: string
  price: number
  currency: string
  speed: string
  throttledSpeed?: string
  unlimited: boolean
  additionalFeatures: string[]
  restrictions?: string[]
}

export interface CoverageInfo {
  level: CoverageLevel
  networkTypes: NetworkType[]
  regions: CoverageRegion[]
  notes?: string
}

export interface CoverageRegion {
  name: string
  level: CoverageLevel
  details?: string
}

export interface SetupInstruction {
  step: number
  title: string
  description: string
  note?: string
}

export interface ContactInfo {
  phone?: string
  email?: string
  website: string
  hours?: string
}

export interface SimComparison {
  options: SimOption[]
  criteria: ComparisonCriteria[]
}

export interface ComparisonCriteria {
  name: string
  key: string
  weight: number
}
