'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { CoverageInfo } from '@/types/sim'
import { Signal } from 'lucide-react'

interface CoverageMapProps {
  coverage: CoverageInfo
}

const coverageLevelColors = {
  excellent: 'text-success-600 bg-success-50 dark:bg-success-900/20',
  good: 'text-primary-600 bg-primary-50 dark:bg-primary-900/20',
  fair: 'text-warning-600 bg-warning-50 dark:bg-warning-900/20',
  limited: 'text-error-600 bg-error-50 dark:bg-error-900/20',
}

const coverageLevelVariants = {
  excellent: 'success' as const,
  good: 'default' as const,
  fair: 'warning' as const,
  limited: 'error' as const,
}

export function CoverageMap({ coverage }: CoverageMapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-text-primary">
          <Signal className="h-5 w-5 text-primary-600" />
          Coverage Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-text-secondary">Overall Coverage:</span>
            <Badge variant={coverageLevelVariants[coverage.level]}>
              {coverage.level}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {coverage.networkTypes.map((type) => (
              <Badge key={type} variant="default" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {coverage.regions.length > 0 && (
          <div>
            <div className="text-sm font-semibold text-text-secondary mb-3">
              Regional Coverage:
            </div>
            <div className="space-y-2">
              {coverage.regions.map((region, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${coverageLevelColors[region.level]}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{region.name}</span>
                    <Badge variant={coverageLevelVariants[region.level]} className="text-xs">
                      {region.level}
                    </Badge>
                  </div>
                  {region.details && (
                    <div className="text-xs opacity-80">{region.details}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {coverage.notes && (
          <div className="mt-4 p-3 bg-bg-secondary rounded text-sm text-text-secondary">
            {coverage.notes}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
