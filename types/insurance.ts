export interface InsurancePolicy {
  id: string
  userId: string
  policyNumber: string
  provider: string
  type: InsuranceType
  status: 'active' | 'expired' | 'cancelled'
  coverageStart: string
  coverageEnd: string
  coverageDetails: CoverageDetails
  claimInfo: ClaimInfo
  emergencyContacts: InsuranceEmergencyContact[]
  policyDocuments: PolicyDocument[]
  premium: {
    amount: number
    currency: string
    frequency: 'annual' | 'per-trip' | 'monthly'
  }
  createdAt: string
  updatedAt: string
}

export type InsuranceType =
  | 'comprehensive'
  | 'medical'
  | 'cancellation'
  | 'baggage'
  | 'flight_delay'
  | 'multi_trip'

export interface CoverageDetails {
  medicalExpenses: CoverageLimits
  emergencyEvacuation: CoverageLimits
  tripCancellation: CoverageLimits
  tripInterruption: CoverageLimits
  baggageLoss: CoverageLimits
  baggageDelay: CoverageLimits
  flightDelay: CoverageLimits
  personalLiability: CoverageLimits
  additionalBenefits: string[]
  exclusions: string[]
}

export interface CoverageLimits {
  covered: boolean
  maxAmount: number
  currency: string
  deductible?: number
  notes?: string
}

export interface ClaimInfo {
  howToFile: string[]
  requiredDocuments: string[]
  processingTime: string
  claimNumber?: string
  claimStatus?: 'pending' | 'approved' | 'rejected' | 'processing'
}

export interface InsuranceEmergencyContact {
  type: 'emergency' | 'claims' | 'assistance' | 'medical'
  name: string
  phone: string
  phoneInternational: string
  email?: string
  available: string
  region?: string
}

export interface PolicyDocument {
  id: string
  name: string
  type: 'policy' | 'certificate' | 'terms' | 'claim_form'
  url: string
  size: number
  uploadedAt: string
}

export interface ActiveClaim {
  id: string
  policyId: string
  claimNumber: string
  type: string
  status: 'pending' | 'approved' | 'rejected' | 'processing'
  amount: number
  currency: string
  filedDate: string
  description: string
  documents: string[]
  updates: ClaimUpdate[]
}

export interface ClaimUpdate {
  date: string
  status: string
  message: string
  updatedBy: string
}
