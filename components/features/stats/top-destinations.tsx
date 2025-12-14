'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Award, MapPin } from 'lucide-react'
import type { DestinationStats } from '@/types/stats'

interface TopDestinationsProps {
  destinations: DestinationStats[]
}

export function TopDestinations({ destinations }: TopDestinationsProps) {
  const topFive = destinations.slice(0, 5)
  const maxVisits = Math.max(...topFive.map((d) => d.visitCount))

  const getMedalEmoji = (index: number) => {
    switch (index) {
      case 0:
        return '🥇'
      case 1:
        return '🥈'
      case 2:
        return '🥉'
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-text-secondary" />
          Top Destinations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topFive.map((destination, index) => {
            const percentage = (destination.visitCount / maxVisits) * 100
            const medal = getMedalEmoji(index)

            return (
              <div key={destination.destination} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {medal && <span className="text-xl">{medal}</span>}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-text-primary">
                          {destination.destination}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {destination.visitCount} visits
                        </Badge>
                      </div>
                      <div className="text-xs text-text-tertiary flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {destination.country}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-text-secondary">
                    {destination.totalDays} days
                  </div>
                </div>

                {/* Progress bar */}
                <div className="relative h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {destinations.length > 5 && (
          <div className="mt-4 pt-4 border-t border-border-primary">
            <p className="text-xs text-text-tertiary text-center">
              +{destinations.length - 5} more destinations
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
