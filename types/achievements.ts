export type AchievementCategory =
  | 'explorer'
  | 'frequent-flyer'
  | 'planner'
  | 'adventurer'
  | 'milestone'

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface Achievement {
  id: string
  category: AchievementCategory
  name: string
  description: string
  icon: string
  rarity: AchievementRarity
  points: number
  requirement: {
    type: 'count' | 'milestone' | 'streak' | 'special'
    target: number
    current: number
    unit: string
  }
  isUnlocked: boolean
  unlockedAt?: string
  progress: number
  nextMilestone?: string
}

export interface UserAchievements {
  userId: string
  totalPoints: number
  level: number
  nextLevelPoints: number
  achievements: Achievement[]
  recentUnlocks: Achievement[]
  stats: {
    totalUnlocked: number
    commonUnlocked: number
    rareUnlocked: number
    epicUnlocked: number
    legendaryUnlocked: number
  }
  updatedAt: string
}

export interface AchievementProgress {
  achievementId: string
  userId: string
  currentProgress: number
  targetProgress: number
  percentage: number
  startedAt: string
  lastUpdatedAt: string
}

export interface Milestone {
  id: string
  type: 'trips' | 'flights' | 'countries' | 'cities' | 'days' | 'special'
  value: number
  achievedAt: string
  celebratedAt?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  earnedAt: string
  displayOrder: number
}

export interface Streak {
  type: 'booking' | 'travel' | 'planning'
  currentStreak: number
  longestStreak: number
  startDate: string
  lastActivityDate: string
}

export interface Leaderboard {
  userId: string
  userName: string
  avatarUrl?: string
  totalPoints: number
  level: number
  rank: number
  badges: Badge[]
}
