'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Navigation, TrendingUp, TrendingDown } from 'lucide-react'

interface WalkingTimeProps {
  from: string
  to: string
  minutes: number
  estimatedWaitTime?: 'low' | 'medium' | 'high'
  type?: 'gate' | 'security' | 'immigration' | 'transport' | 'facility'
}

export function WalkingTime({ from, to, minutes, estimatedWaitTime, type = 'gate' }: WalkingTimeProps) {
  const waitTimeBadge = estimatedWaitTime ? (
    <Badge
      variant={
        estimatedWaitTime === 'low'
          ? 'success'
          : estimatedWaitTime === 'medium'
          ? 'warning'
          : 'error'
      }
      className="text-xs"
    >
      {estimatedWaitTime === 'low' ? 'Low Wait' : estimatedWaitTime === 'medium' ? 'Moderate Wait' : 'High Wait'}
    </Badge>
  ) : null

  const totalMinutes = estimatedWaitTime
    ? minutes + (estimatedWaitTime === 'low' ? 5 : estimatedWaitTime === 'medium' ? 15 : 30)
    : minutes

  return (
    <Card padding="md" variant={estimatedWaitTime === 'high' ? 'alert' : 'default'}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-primary-500/10">
            <Navigation size={20} className="text-primary-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-text-primary mb-1">
              {from} → {to}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Clock size={14} />
              <span>Walking time: {minutes} min</span>
            </div>
            {estimatedWaitTime && (
              <div className="flex items-center gap-2 text-sm text-text-secondary mt-1">
                {estimatedWaitTime === 'high' ? (
                  <TrendingUp size={14} className="text-warning" />
                ) : (
                  <TrendingDown size={14} className="text-success" />
                )}
                <span>
                  Est. wait: {estimatedWaitTime === 'low' ? '5' : estimatedWaitTime === 'medium' ? '15' : '30'} min
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="primary" className="text-base font-semibold">
            {totalMinutes} min
          </Badge>
          {waitTimeBadge}
        </div>
      </div>
    </Card>
  )
}
