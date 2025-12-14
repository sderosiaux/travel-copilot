'use client'

import { Check, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Badge } from '@/components/ui'
import type { TierProgress } from '@/types/rewards'
import * as LucideIcons from 'lucide-react'

interface TierBenefitsProps {
  tierProgress: TierProgress | null
}

export function TierBenefits({ tierProgress }: TierBenefitsProps) {
  if (!tierProgress) {
    return null
  }

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName]
    return Icon ? <Icon className="h-4 w-4" /> : null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tier Benefits</CardTitle>
          <Badge variant="secondary" className="capitalize">
            {tierProgress.currentTier} Member
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tierProgress.benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors"
            >
              <div className="mt-0.5">
                {benefit.available ? (
                  <div className="rounded-full bg-success-bg p-1">
                    <Check className="h-3 w-3 text-success-text" />
                  </div>
                ) : (
                  <div className="rounded-full bg-error-bg p-1">
                    <X className="h-3 w-3 text-error-text" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getIcon(benefit.icon)}
                  <p className="font-medium text-text-primary">{benefit.name}</p>
                </div>
                <p className="text-sm text-text-secondary">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {tierProgress.nextTier && (
          <div className="mt-6 p-4 rounded-lg bg-accent-bg border border-accent-border">
            <p className="text-sm font-medium text-accent-text mb-1">
              Next Tier: {tierProgress.nextTier}
            </p>
            <p className="text-xs text-accent-text/80">
              Unlock more benefits by earning{' '}
              {tierProgress.pointsToNextTier.toLocaleString()} more points
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
