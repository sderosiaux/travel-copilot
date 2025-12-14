'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Plane, Clock } from 'lucide-react'
import type { TripTimelineEntry } from '@/types/stats'

interface TripTimelineProps {
  timeline: TripTimelineEntry[]
}

export function TripTimeline({ timeline }: TripTimelineProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatFlightTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-text-secondary" />
          Recent Trip History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((trip, index) => (
            <div key={trip.id} className="relative">
              {/* Timeline line */}
              {index < timeline.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border-primary" />
              )}

              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Plane className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-bg-secondary rounded-lg p-4 border border-border-primary hover:border-border-secondary transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-1">
                          {trip.destination}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                          <span>
                            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                          </span>
                          <Badge variant="secondary">{trip.duration} days</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-tertiary">
                      <div className="flex items-center gap-1">
                        <Plane className="h-3 w-3" />
                        <span>{trip.distance.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatFlightTime(trip.flightTime)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
