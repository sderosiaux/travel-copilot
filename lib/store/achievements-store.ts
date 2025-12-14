import { create } from 'zustand'
import type {
  Achievement,
  UserAchievements,
  Milestone,
  Badge,
  Streak,
  AchievementCategory,
  AchievementRarity,
} from '@/types/achievements'

interface AchievementsState {
  userAchievements: UserAchievements | null
  milestones: Milestone[]
  badges: Badge[]
  streaks: Streak[]
  isLoading: boolean
  error: string | null

  // Actions
  setUserAchievements: (userAchievements: UserAchievements) => void
  unlockAchievement: (achievementId: string) => void
  updateAchievementProgress: (
    achievementId: string,
    progress: number
  ) => void

  setMilestones: (milestones: Milestone[]) => void
  addMilestone: (milestone: Milestone) => void

  setBadges: (badges: Badge[]) => void
  addBadge: (badge: Badge) => void

  setStreaks: (streaks: Streak[]) => void
  updateStreak: (type: Streak['type'], updates: Partial<Streak>) => void

  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getUnlockedAchievements: () => Achievement[]
  getLockedAchievements: () => Achievement[]
  getAchievementsByCategory: (category: AchievementCategory) => Achievement[]
  getAchievementsByRarity: (rarity: AchievementRarity) => Achievement[]
  getProgressPercentage: () => number
  getNextLevelProgress: () => number
  getRecentUnlocks: (limit?: number) => Achievement[]
}

export const useAchievementsStore = create<AchievementsState>((set, get) => ({
  userAchievements: null,
  milestones: [],
  badges: [],
  streaks: [],
  isLoading: false,
  error: null,

  // Actions
  setUserAchievements: (userAchievements) =>
    set({ userAchievements, isLoading: false, error: null }),

  unlockAchievement: (achievementId) =>
    set((state) => {
      if (!state.userAchievements) return state

      const achievement = state.userAchievements.achievements.find(
        (a) => a.id === achievementId
      )

      if (!achievement || achievement.isUnlocked) return state

      const updatedAchievement = {
        ...achievement,
        isUnlocked: true,
        unlockedAt: new Date().toISOString(),
        progress: 100,
        requirement: {
          ...achievement.requirement,
          current: achievement.requirement.target,
        },
      }

      const updatedAchievements = state.userAchievements.achievements.map((a) =>
        a.id === achievementId ? updatedAchievement : a
      )

      const rarityKey = `${achievement.rarity}Unlocked` as keyof typeof state.userAchievements.stats

      return {
        userAchievements: {
          ...state.userAchievements,
          achievements: updatedAchievements,
          totalPoints: state.userAchievements.totalPoints + achievement.points,
          stats: {
            ...state.userAchievements.stats,
            totalUnlocked: state.userAchievements.stats.totalUnlocked + 1,
            [rarityKey]: state.userAchievements.stats[rarityKey] + 1,
          },
          recentUnlocks: [updatedAchievement, ...state.userAchievements.recentUnlocks].slice(0, 5),
          updatedAt: new Date().toISOString(),
        },
      }
    }),

  updateAchievementProgress: (achievementId, progress) =>
    set((state) => {
      if (!state.userAchievements) return state

      const updatedAchievements = state.userAchievements.achievements.map((a) =>
        a.id === achievementId
          ? {
              ...a,
              progress,
              requirement: {
                ...a.requirement,
                current: Math.floor((progress / 100) * a.requirement.target),
              },
            }
          : a
      )

      return {
        userAchievements: {
          ...state.userAchievements,
          achievements: updatedAchievements,
          updatedAt: new Date().toISOString(),
        },
      }
    }),

  setMilestones: (milestones) =>
    set({ milestones, isLoading: false, error: null }),

  addMilestone: (milestone) =>
    set((state) => ({
      milestones: [...state.milestones, milestone],
    })),

  setBadges: (badges) =>
    set({ badges, isLoading: false, error: null }),

  addBadge: (badge) =>
    set((state) => ({
      badges: [...state.badges, badge],
    })),

  setStreaks: (streaks) =>
    set({ streaks, isLoading: false, error: null }),

  updateStreak: (type, updates) =>
    set((state) => ({
      streaks: state.streaks.map((s) =>
        s.type === type ? { ...s, ...updates } : s
      ),
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getUnlockedAchievements: () => {
    const { userAchievements } = get()
    if (!userAchievements) return []
    return userAchievements.achievements.filter((a) => a.isUnlocked)
  },

  getLockedAchievements: () => {
    const { userAchievements } = get()
    if (!userAchievements) return []
    return userAchievements.achievements.filter((a) => !a.isUnlocked)
  },

  getAchievementsByCategory: (category) => {
    const { userAchievements } = get()
    if (!userAchievements) return []
    return userAchievements.achievements.filter((a) => a.category === category)
  },

  getAchievementsByRarity: (rarity) => {
    const { userAchievements } = get()
    if (!userAchievements) return []
    return userAchievements.achievements.filter((a) => a.rarity === rarity)
  },

  getProgressPercentage: () => {
    const { userAchievements } = get()
    if (!userAchievements) return 0
    const total = userAchievements.achievements.length
    const unlocked = userAchievements.stats.totalUnlocked
    return Math.round((unlocked / total) * 100)
  },

  getNextLevelProgress: () => {
    const { userAchievements } = get()
    if (!userAchievements) return 0
    const currentPoints = userAchievements.totalPoints
    const nextLevel = userAchievements.nextLevelPoints
    return Math.round((currentPoints / nextLevel) * 100)
  },

  getRecentUnlocks: (limit = 5) => {
    const { userAchievements } = get()
    if (!userAchievements) return []
    return userAchievements.recentUnlocks.slice(0, limit)
  },
}))
