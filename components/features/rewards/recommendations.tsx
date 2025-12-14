'use client'

import { Target, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Button } from '@/components/ui'
import type { RewardRecommendation } from '@/types/rewards'
import { useRewardsStore } from '@/lib/store/rewards-store'

export function RewardRecommendations() {
  const { getSelectedProgram, getRecommendationsForProgram, redeemReward } =
    useRewardsStore()
  const selectedProgram = getSelectedProgram()
  const recommendations = selectedProgram
    ? getRecommendationsForProgram(selectedProgram.id)
    : []

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-error-bg text-error-text'
      case 'medium':
        return 'bg-warning-bg text-warning-text'
      case 'low':
        return 'bg-info-bg text-info-text'
      default:
        return 'bg-bg-secondary text-text-primary'
    }
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-accent-primary" />
          <CardTitle>Recommended Redemptions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="rounded-lg border border-border bg-bg-secondary p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className={getPriorityColor(rec.priority)}
                  >
                    {rec.priority} priority
                  </Badge>
                </div>
                <h4 className="font-semibold text-text-primary mb-1">
                  {rec.reward.title}
                </h4>
                <p className="text-sm text-text-secondary mb-2">{rec.reason}</p>
              </div>
            </div>

            {rec.expiryWarning && (
              <div className="rounded-lg bg-warning-bg border border-warning-border p-2 mb-3">
                <p className="text-xs text-warning-text">{rec.expiryWarning}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-text-secondary">Points needed: </span>
                <span className="font-semibold text-text-primary">
                  {rec.reward.pointsCost.toLocaleString()}
                </span>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  selectedProgram && redeemReward(selectedProgram.id, rec.reward.id)
                }
              >
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
