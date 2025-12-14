import type {
  LoyaltyProgram,
  TierBenefit,
  TierProgress,
  RewardOption,
  RedemptionHistory,
  PointsActivity,
  RewardRecommendation,
  TierStatus,
} from '@/types/rewards'

export const loyaltyPrograms: LoyaltyProgram[] = [
  {
    id: 'lp-1',
    airlineCode: 'BA',
    airlineName: 'British Airways',
    programName: 'Executive Club',
    memberNumber: 'BA123456789',
    tierStatus: 'gold',
    pointsBalance: 145000,
    milesBalance: 85000,
    tierPoints: 1800,
    tierPointsNeeded: 2500,
    expiringPoints: 12000,
    expirationDate: '2025-06-30',
    joinedDate: '2018-03-15',
    logo: '🇬🇧',
  },
  {
    id: 'lp-2',
    airlineCode: 'AF',
    airlineName: 'Air France',
    programName: 'Flying Blue',
    memberNumber: 'AF987654321',
    tierStatus: 'silver',
    pointsBalance: 68000,
    milesBalance: 42000,
    tierPoints: 450,
    tierPointsNeeded: 600,
    joinedDate: '2020-01-10',
    logo: '🇫🇷',
  },
  {
    id: 'lp-3',
    airlineCode: 'LH',
    airlineName: 'Lufthansa',
    programName: 'Miles & More',
    memberNumber: 'LH456789012',
    tierStatus: 'platinum',
    pointsBalance: 230000,
    milesBalance: 150000,
    tierPoints: 3200,
    tierPointsNeeded: 4000,
    expiringPoints: 8500,
    expirationDate: '2025-12-31',
    joinedDate: '2017-06-20',
    logo: '🇩🇪',
  },
]

export const tierBenefits: Record<TierStatus, TierBenefit[]> = {
  basic: [
    {
      id: 'b1',
      name: 'Earn Miles',
      description: 'Earn 1 mile per dollar spent',
      icon: 'Plane',
      available: true,
    },
    {
      id: 'b2',
      name: 'Online Check-in',
      description: '24-hour advance check-in',
      icon: 'Check',
      available: true,
    },
  ],
  silver: [
    {
      id: 's1',
      name: 'Priority Boarding',
      description: 'Board before general boarding',
      icon: 'Users',
      available: true,
    },
    {
      id: 's2',
      name: 'Extra Baggage',
      description: '+1 checked bag allowance',
      icon: 'Plus',
      available: true,
    },
    {
      id: 's3',
      name: 'Bonus Miles',
      description: '25% bonus on earned miles',
      icon: 'TrendingUp',
      available: true,
    },
  ],
  gold: [
    {
      id: 'g1',
      name: 'Lounge Access',
      description: 'Access to partner lounges worldwide',
      icon: 'Star',
      available: true,
    },
    {
      id: 'g2',
      name: 'Priority Check-in',
      description: 'Dedicated check-in counters',
      icon: 'Zap',
      available: true,
    },
    {
      id: 'g3',
      name: 'Free Upgrades',
      description: 'Complimentary upgrades when available',
      icon: 'TrendingUp',
      available: true,
    },
    {
      id: 'g4',
      name: 'Bonus Miles',
      description: '50% bonus on earned miles',
      icon: 'Target',
      available: true,
    },
  ],
  platinum: [
    {
      id: 'p1',
      name: 'Premium Lounge Access',
      description: 'First class lounge access',
      icon: 'Crown',
      available: true,
    },
    {
      id: 'p2',
      name: 'Guaranteed Upgrades',
      description: 'Confirmed upgrades on select flights',
      icon: 'Award',
      available: true,
    },
    {
      id: 'p3',
      name: 'Concierge Service',
      description: '24/7 dedicated support',
      icon: 'Users',
      available: true,
    },
    {
      id: 'p4',
      name: 'Bonus Miles',
      description: '75% bonus on earned miles',
      icon: 'Target',
      available: true,
    },
  ],
  diamond: [
    {
      id: 'd1',
      name: 'Lifetime Status',
      description: 'Status guaranteed for life',
      icon: 'Trophy',
      available: true,
    },
    {
      id: 'd2',
      name: 'Unlimited Upgrades',
      description: 'Unlimited upgrade certificates',
      icon: 'Gift',
      available: true,
    },
    {
      id: 'd3',
      name: 'VIP Treatment',
      description: 'Expedited security & immigration',
      icon: 'Crown',
      available: true,
    },
    {
      id: 'd4',
      name: 'Bonus Miles',
      description: '100% bonus on earned miles',
      icon: 'Target',
      available: true,
    },
  ],
}

export const rewardOptions: RewardOption[] = [
  {
    id: 'r1',
    type: 'flight',
    title: 'Round-trip to Paris',
    description: 'Economy class, flexible dates',
    pointsCost: 45000,
    value: '$850',
    savingsPercentage: 15,
    validUntil: '2025-12-31',
    restrictions: ['Blackout dates apply', 'Subject to availability'],
  },
  {
    id: 'r2',
    type: 'upgrade',
    title: 'Business Class Upgrade',
    description: 'One-way upgrade certificate',
    pointsCost: 25000,
    value: '$1,200',
    savingsPercentage: 20,
    validUntil: '2025-06-30',
  },
  {
    id: 'r3',
    type: 'lounge',
    title: 'Annual Lounge Pass',
    description: 'Unlimited lounge access for 1 year',
    pointsCost: 15000,
    value: '$450',
    savingsPercentage: 10,
  },
  {
    id: 'r4',
    type: 'hotel',
    title: '3 Nights Luxury Hotel',
    description: 'Partner hotel stay, major cities',
    pointsCost: 35000,
    value: '$900',
    savingsPercentage: 18,
    validUntil: '2025-09-30',
  },
  {
    id: 'r5',
    type: 'rental',
    title: 'Car Rental - 5 Days',
    description: 'Mid-size car rental',
    pointsCost: 8000,
    value: '$250',
  },
  {
    id: 'r6',
    type: 'shopping',
    title: 'Gift Card $100',
    description: 'Major retailer gift card',
    pointsCost: 12000,
    value: '$100',
  },
]

export const redemptionHistory: RedemptionHistory[] = [
  {
    id: 'rh1',
    programId: 'lp-1',
    rewardId: 'r2',
    rewardTitle: 'Business Class Upgrade - LHR to JFK',
    pointsUsed: 25000,
    redeemedAt: '2024-11-15T10:30:00Z',
    status: 'completed',
    confirmationNumber: 'UP123456',
  },
  {
    id: 'rh2',
    programId: 'lp-1',
    rewardId: 'r3',
    rewardTitle: 'Lounge Pass - 3 visits',
    pointsUsed: 5000,
    redeemedAt: '2024-10-20T14:15:00Z',
    status: 'confirmed',
    confirmationNumber: 'LP789012',
  },
  {
    id: 'rh3',
    programId: 'lp-3',
    rewardId: 'r1',
    rewardTitle: 'Round-trip to Munich',
    pointsUsed: 40000,
    redeemedAt: '2024-12-01T09:00:00Z',
    status: 'pending',
  },
]

export const pointsActivity: PointsActivity[] = [
  {
    id: 'pa1',
    programId: 'lp-1',
    type: 'earned',
    amount: 5000,
    description: 'Flight LHR-JFK',
    date: '2024-12-10T18:30:00Z',
    referenceNumber: 'BA456',
  },
  {
    id: 'pa2',
    programId: 'lp-1',
    type: 'redeemed',
    amount: -25000,
    description: 'Business Class Upgrade',
    date: '2024-11-15T10:30:00Z',
    referenceNumber: 'UP123456',
  },
  {
    id: 'pa3',
    programId: 'lp-1',
    type: 'earned',
    amount: 3200,
    description: 'Partner hotel stay',
    date: '2024-11-05T12:00:00Z',
  },
  {
    id: 'pa4',
    programId: 'lp-2',
    type: 'earned',
    amount: 4500,
    description: 'Flight CDG-NRT',
    date: '2024-11-20T08:15:00Z',
    referenceNumber: 'AF234',
  },
  {
    id: 'pa5',
    programId: 'lp-3',
    type: 'expired',
    amount: -2000,
    description: 'Points expired',
    date: '2024-10-31T23:59:00Z',
  },
  {
    id: 'pa6',
    programId: 'lp-3',
    type: 'adjusted',
    amount: 1500,
    description: 'Bonus points adjustment',
    date: '2024-11-01T10:00:00Z',
  },
]

export const rewardRecommendations: RewardRecommendation[] = [
  {
    id: 'rec1',
    programId: 'lp-1',
    reward: rewardOptions[0],
    reason: 'You have enough points and Paris is on your wishlist',
    priority: 'high',
    expiryWarning: '12,000 points expiring in 6 months',
  },
  {
    id: 'rec2',
    programId: 'lp-1',
    reward: rewardOptions[1],
    reason: 'Best value for your upcoming long-haul flight',
    priority: 'high',
  },
  {
    id: 'rec3',
    programId: 'lp-2',
    reward: rewardOptions[3],
    reason: 'Great value and you travel frequently to business destinations',
    priority: 'medium',
  },
  {
    id: 'rec4',
    programId: 'lp-3',
    reward: rewardOptions[2],
    reason: 'Save on lounge access costs',
    priority: 'medium',
  },
]

export const getTierProgress = (program: LoyaltyProgram): TierProgress => {
  const tierOrder: TierStatus[] = ['basic', 'silver', 'gold', 'platinum', 'diamond']
  const currentIndex = tierOrder.indexOf(program.tierStatus)
  const nextTier = currentIndex < tierOrder.length - 1 ? tierOrder[currentIndex + 1] : null

  return {
    currentTier: program.tierStatus,
    nextTier,
    currentPoints: program.tierPoints,
    pointsToNextTier: program.tierPointsNeeded - program.tierPoints,
    progressPercentage: (program.tierPoints / program.tierPointsNeeded) * 100,
    benefits: tierBenefits[program.tierStatus],
  }
}

export const calculateRedemptionValue = (reward: RewardOption): number => {
  // Parse the value string (e.g., "$850" -> 850)
  const value = parseFloat(reward.value.replace(/[$,]/g, ''))
  const pointsValue = value / reward.pointsCost
  return parseFloat((pointsValue * 100).toFixed(2)) // cents per point
}
