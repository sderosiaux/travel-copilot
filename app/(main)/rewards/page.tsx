'use client'

import { ProgramCard } from '@/components/features/rewards/program-card'
import { TierBenefits } from '@/components/features/rewards/tier-benefits'
import { RewardOptions } from '@/components/features/rewards/reward-options'
import { PointsActivityList } from '@/components/features/rewards/points-activity'
import { RewardRecommendations } from '@/components/features/rewards/recommendations'
import { useRewardsStore } from '@/lib/store/rewards-store'

export default function RewardsPage() {
  const {
    programs,
    selectedProgramId,
    getSelectedProgram,
    getTierProgress,
    getTotalPoints,
    getTotalMiles,
  } = useRewardsStore()

  const selectedProgram = getSelectedProgram()
  const tierProgress = selectedProgram ? getTierProgress(selectedProgram.id) : null
  const totalPoints = getTotalPoints()
  const totalMiles = getTotalMiles()

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Reward Tracking</h1>
        <p className="text-text-secondary">
          Manage your airline loyalty programs and redeem rewards
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Total Programs</p>
          <p className="text-3xl font-bold">{programs.length}</p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Total Points</p>
          <p className="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Total Miles</p>
          <p className="text-3xl font-bold">{totalMiles.toLocaleString()}</p>
        </div>
      </div>

      {/* Programs */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Your Loyalty Programs
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              isSelected={program.id === selectedProgramId}
            />
          ))}
        </div>
      </div>

      {/* Selected Program Details */}
      {selectedProgram && (
        <>
          {/* Recommendations */}
          <RewardRecommendations />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <RewardOptions />
              <PointsActivityList />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <TierBenefits tierProgress={tierProgress} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
