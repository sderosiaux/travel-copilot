import { create } from 'zustand'
import type {
  LoyaltyProgram,
  TierProgress,
  RewardOption,
  RedemptionHistory,
  PointsActivity,
  RewardRecommendation,
} from '@/types/rewards'
import {
  loyaltyPrograms as mockPrograms,
  rewardOptions as mockRewards,
  redemptionHistory as mockHistory,
  pointsActivity as mockActivity,
  rewardRecommendations as mockRecommendations,
  getTierProgress,
  calculateRedemptionValue,
} from '@/data/rewards'

interface RewardsState {
  programs: LoyaltyProgram[]
  selectedProgramId: string | null
  rewardOptions: RewardOption[]
  redemptionHistory: RedemptionHistory[]
  pointsActivity: PointsActivity[]
  recommendations: RewardRecommendation[]
  isLoading: boolean
  error: string | null

  // Actions
  setPrograms: (programs: LoyaltyProgram[]) => void
  selectProgram: (programId: string) => void
  addProgram: (program: LoyaltyProgram) => void
  removeProgram: (programId: string) => void
  updateProgram: (programId: string, updates: Partial<LoyaltyProgram>) => void
  redeemReward: (programId: string, rewardId: string) => Promise<void>
  addPointsActivity: (activity: PointsActivity) => void
  refreshPrograms: () => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getSelectedProgram: () => LoyaltyProgram | null
  getTierProgress: (programId: string) => TierProgress | null
  getTotalPoints: () => number
  getTotalMiles: () => number
  getRecentActivity: (limit?: number) => PointsActivity[]
  getRecommendationsForProgram: (programId: string) => RewardRecommendation[]
  getBestRedemptions: () => RewardOption[]
}

export const useRewardsStore = create<RewardsState>((set, get) => ({
  programs: mockPrograms,
  selectedProgramId: mockPrograms[0]?.id || null,
  rewardOptions: mockRewards,
  redemptionHistory: mockHistory,
  pointsActivity: mockActivity,
  recommendations: mockRecommendations,
  isLoading: false,
  error: null,

  // Actions
  setPrograms: (programs) => set({ programs }),

  selectProgram: (programId) => set({ selectedProgramId: programId }),

  addProgram: (program) =>
    set((state) => ({
      programs: [...state.programs, program],
    })),

  removeProgram: (programId) =>
    set((state) => ({
      programs: state.programs.filter((p) => p.id !== programId),
      selectedProgramId:
        state.selectedProgramId === programId
          ? state.programs[0]?.id || null
          : state.selectedProgramId,
    })),

  updateProgram: (programId, updates) =>
    set((state) => ({
      programs: state.programs.map((p) =>
        p.id === programId ? { ...p, ...updates } : p
      ),
    })),

  redeemReward: async (programId, rewardId) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const program = get().programs.find((p) => p.id === programId)
      const reward = get().rewardOptions.find((r) => r.id === rewardId)

      if (!program || !reward) {
        throw new Error('Program or reward not found')
      }

      if (program.pointsBalance < reward.pointsCost) {
        throw new Error('Insufficient points')
      }

      // Update program points
      get().updateProgram(programId, {
        pointsBalance: program.pointsBalance - reward.pointsCost,
      })

      // Add to redemption history
      const redemption: RedemptionHistory = {
        id: `rh-${Date.now()}`,
        programId,
        rewardId,
        rewardTitle: reward.title,
        pointsUsed: reward.pointsCost,
        redeemedAt: new Date().toISOString(),
        status: 'pending',
      }

      set((state) => ({
        redemptionHistory: [redemption, ...state.redemptionHistory],
      }))

      // Add points activity
      const activity: PointsActivity = {
        id: `pa-${Date.now()}`,
        programId,
        type: 'redeemed',
        amount: -reward.pointsCost,
        description: `Redeemed: ${reward.title}`,
        date: new Date().toISOString(),
      }

      get().addPointsActivity(activity)

      set({ isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to redeem reward',
        isLoading: false,
      })
    }
  },

  addPointsActivity: (activity) =>
    set((state) => ({
      pointsActivity: [activity, ...state.pointsActivity],
    })),

  refreshPrograms: async () => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // In a real app, fetch updated program data from API
      set({ isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to refresh programs',
        isLoading: false,
      })
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed
  getSelectedProgram: () => {
    const { programs, selectedProgramId } = get()
    return programs.find((p) => p.id === selectedProgramId) || null
  },

  getTierProgress: (programId) => {
    const program = get().programs.find((p) => p.id === programId)
    return program ? getTierProgress(program) : null
  },

  getTotalPoints: () => {
    return get().programs.reduce((total, program) => total + program.pointsBalance, 0)
  },

  getTotalMiles: () => {
    return get().programs.reduce((total, program) => total + program.milesBalance, 0)
  },

  getRecentActivity: (limit = 10) => {
    return get().pointsActivity.slice(0, limit)
  },

  getRecommendationsForProgram: (programId) => {
    return get().recommendations.filter((rec) => rec.programId === programId)
  },

  getBestRedemptions: () => {
    // Sort rewards by value per point
    return [...get().rewardOptions]
      .sort((a, b) => {
        const valueA = calculateRedemptionValue(a)
        const valueB = calculateRedemptionValue(b)
        return valueB - valueA
      })
      .slice(0, 5)
  },
}))
