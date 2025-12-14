'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Info } from 'lucide-react'
import type { WeatherAlert } from '@/types/weather'

interface WeatherAlertsProps {
  alerts: WeatherAlert[]
}

const alertVariants = {
  info: { variant: 'default' as const, icon: Info, color: 'text-primary-600' },
  warning: { variant: 'warning' as const, icon: AlertTriangle, color: 'text-warning-600' },
  severe: { variant: 'error' as const, icon: AlertTriangle, color: 'text-error-600' },
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (alerts.length === 0) {
    return null
  }

  return (
    <Card className="border-warning-200 bg-warning-50 dark:bg-warning-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-text-primary">
          <AlertTriangle className="h-5 w-5 text-warning-600" />
          Weather Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => {
          const config = alertVariants[alert.level]
          const Icon = config.icon

          return (
            <div
              key={alert.id}
              className="p-4 bg-bg-primary rounded-lg border border-border-primary"
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 ${config.color}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-text-primary">{alert.title}</h4>
                    <Badge variant={config.variant}>{alert.level}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-tertiary">
                    <span>
                      {new Date(alert.startDate).toLocaleDateString('en-GB', {
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      -{' '}
                      {new Date(alert.endDate).toLocaleDateString('en-GB', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    {alert.affectedAreas.length > 0 && (
                      <span>Affected: {alert.affectedAreas.join(', ')}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
