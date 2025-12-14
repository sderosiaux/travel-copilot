'use client'

import { Award, Star, TrendingUp, Gift } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Progress } from '@/components/ui'
import type { LoyaltyProgram } from '@/types/rewards'
import { useRewardsStore } from '@/lib/store/rewards-store'

interface ProgramCardProps {
  program: LoyaltyProgram
  isSelected?: boolean
}

export function ProgramCard({ program, isSelected }: ProgramCardProps) {
  const { selectProgram, getTierProgress } = useRewardsStore()
  const tierProgress = getTierProgress(program.id)

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return 'bg-blue-500'
      case 'platinum':
        return 'bg-purple-500'
      case 'gold':
        return 'bg-yellow-500'
      case 'silver':
        return 'bg-gray-400'
      default:
        return 'bg-gray-500'
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'diamond':
      case 'platinum':
        return <Award className="h-4 w-4" />
      case 'gold':
        return <Star className="h-4 w-4" />
      default:
        return <Gift className="h-4 w-4" />
    }
  }

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-accent-primary' : ''
      }`}
      onClick={() => selectProgram(program.id)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{program.logo}</span>
              <CardTitle className="text-lg">{program.airlineName}</CardTitle>
            </div>
            <p className="text-sm text-text-secondary">{program.programName}</p>
            <p className="text-xs text-text-tertiary mt-1">
              Member #{program.memberNumber}
            </p>
          </div>
          <Badge className={getTierColor(program.tierStatus)}>
            <div className="flex items-center gap-1">
              {getTierIcon(program.tierStatus)}
              <span className="capitalize">{program.tierStatus}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Points & Miles */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-bg-secondary p-3">
            <p className="text-xs text-text-secondary">Points</p>
            <p className="text-xl font-bold text-text-primary">
              {program.pointsBalance.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-bg-secondary p-3">
            <p className="text-xs text-text-secondary">Miles</p>
            <p className="text-xl font-bold text-text-primary">
              {program.milesBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tier Progress */}
        {tierProgress && tierProgress.nextTier && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">
                Progress to {tierProgress.nextTier}
              </span>
              <span className="text-text-primary font-medium">
                {Math.round(tierProgress.progressPercentage)}%
              </span>
            </div>
            <Progress value={tierProgress.progressPercentage} />
            <p className="text-xs text-text-tertiary">
              {tierProgress.pointsToNextTier.toLocaleString()} points needed
            </p>
          </div>
        )}

        {/* Expiring Points Warning */}
        {program.expiringPoints && program.expirationDate && (
          <div className="rounded-lg bg-warning-bg border border-warning-border p-3">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-warning-text mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-warning-text">
                  {program.expiringPoints.toLocaleString()} points expiring
                </p>
                <p className="text-xs text-warning-text/80">
                  {new Date(program.expirationDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
