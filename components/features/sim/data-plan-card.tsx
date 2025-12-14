'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { DataPlan } from '@/types/sim'
import { Wifi, Clock, Check } from 'lucide-react'

interface DataPlanCardProps {
  plan: DataPlan
  onSelect?: (plan: DataPlan) => void
}

export function DataPlanCard({ plan, onSelect }: DataPlanCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-text-primary mb-1">{plan.name}</h4>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Wifi className="h-4 w-4" />
              <span>{plan.data}</span>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>{plan.duration}</span>
            </div>
          </div>
          {plan.unlimited && (
            <Badge variant="success" className="text-xs">
              Unlimited
            </Badge>
          )}
        </div>

        <div className="mb-3">
          <div className="text-2xl font-bold text-primary-600">
            {plan.currency} {plan.price}
          </div>
          <div className="text-xs text-text-secondary">Speed: {plan.speed}</div>
          {plan.throttledSpeed && (
            <div className="text-xs text-text-tertiary">
              Throttled to {plan.throttledSpeed}
            </div>
          )}
        </div>

        {plan.additionalFeatures.length > 0 && (
          <div className="mb-3 space-y-1">
            {plan.additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-3 w-3 text-success-600" />
                <span className="text-text-secondary">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {plan.restrictions && plan.restrictions.length > 0 && (
          <div className="mb-3 p-2 bg-warning-50 dark:bg-warning-900/10 rounded text-xs text-warning-700">
            {plan.restrictions.join(', ')}
          </div>
        )}

        {onSelect && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => onSelect(plan)}
          >
            Select Plan
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
