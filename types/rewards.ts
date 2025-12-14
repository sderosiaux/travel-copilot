export type TierStatus = 'basic' | 'silver' | 'gold' | 'platinum' | 'diamond'

export interface LoyaltyProgram {
  id: string
  airlineCode: string
  airlineName: string
  programName: string
  memberNumber: string
  tierStatus: TierStatus
  pointsBalance: number
  milesBalance: number
  tierPoints: number
  tierPointsNeeded: number
  expiringPoints?: number
  expirationDate?: string
  joinedDate: string
  logo: string
}

export interface TierBenefit {
  id: string
  name: string
  description: string
  icon: string
  available: boolean
}

export interface TierProgress {
  currentTier: TierStatus
  nextTier: TierStatus | null
  currentPoints: number
  pointsToNextTier: number
  progressPercentage: number
  benefits: TierBenefit[]
}

export interface RewardOption {
  id: string
  type: 'flight' | 'upgrade' | 'lounge' | 'hotel' | 'rental' | 'shopping'
  title: string
  description: string
  pointsCost: number
  value: string
  savingsPercentage?: number
  validUntil?: string
  restrictions?: string[]
  imageUrl?: string
}

export interface RedemptionHistory {
  id: string
  programId: string
  rewardId: string
  rewardTitle: string
  pointsUsed: number
  redeemedAt: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  confirmationNumber?: string
}

export interface PointsActivity {
  id: string
  programId: string
  type: 'earned' | 'redeemed' | 'expired' | 'adjusted'
  amount: number
  description: string
  date: string
  referenceNumber?: string
}

export interface RewardRecommendation {
  id: string
  programId: string
  reward: RewardOption
  reason: string
  priority: 'high' | 'medium' | 'low'
  expiryWarning?: string
}
