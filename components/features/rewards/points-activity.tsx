'use client'

import { TrendingUp, TrendingDown, X, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Badge } from '@/components/ui'
import type { PointsActivity } from '@/types/rewards'
import { useRewardsStore } from '@/lib/store/rewards-store'

export function PointsActivityList() {
  const { getRecentActivity } = useRewardsStore()
  const activities = getRecentActivity(15)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'earned':
        return <TrendingUp className="h-4 w-4 text-success-text" />
      case 'redeemed':
        return <TrendingDown className="h-4 w-4 text-error-text" />
      case 'expired':
        return <X className="h-4 w-4 text-warning-text" />
      case 'adjusted':
        return <Info className="h-4 w-4 text-info-text" />
      default:
        return null
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'earned':
        return 'text-success-text'
      case 'redeemed':
        return 'text-error-text'
      case 'expired':
        return 'text-warning-text'
      case 'adjusted':
        return 'text-info-text'
      default:
        return 'text-text-primary'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Points Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              No activity yet
            </div>
          ) : (
            activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-bg-secondary transition-colors ${
                  index !== activities.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      {activity.description}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {new Date(activity.date).toLocaleDateString()} at{' '}
                      {new Date(activity.date).toLocaleTimeString()}
                    </p>
                    {activity.referenceNumber && (
                      <p className="text-xs text-text-tertiary mt-0.5">
                        Ref: {activity.referenceNumber}
                      </p>
                    )}
                  </div>
                </div>
                <div className={`font-semibold ${getActivityColor(activity.type)}`}>
                  {activity.amount > 0 ? '+' : ''}
                  {activity.amount.toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
