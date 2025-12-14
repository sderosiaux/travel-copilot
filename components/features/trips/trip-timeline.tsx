'use client'

import { Badge } from '@/components/ui/badge'
import type { TripTimeline as TripTimelineType } from '@/types'
import { Plane, Hotel, MapPin, Flag, Clock } from 'lucide-react'

interface TripTimelineProps {
  timeline: TripTimelineType[]
}

const iconMap = {
  flight: Plane,
  hotel: Hotel,
  activity: MapPin,
  transfer: Clock,
  milestone: Flag,
}

const statusVariants: Record<TripTimelineType['status'], 'success' | 'info' | 'default' | 'error' | 'warning'> = {
  scheduled: 'info',
  in_progress: 'warning',
  completed: 'success',
  cancelled: 'error',
}

export function TripTimeline({ timeline }: TripTimelineProps) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No timeline events available
      </div>
    )
  }

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  return (
    <div className="space-y-4">
      {timeline.map((event, index) => {
        const Icon = iconMap[event.type]
        const { date, time } = formatDateTime(event.timestamp)
        const isLast = index === timeline.length - 1

        return (
          <div key={event.id} className="relative pl-8 pb-8">
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-[15px] top-10 w-0.5 h-full bg-border" />
            )}

            {/* Icon */}
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-bg-secondary border-2 border-primary-500 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary-500" />
            </div>

            {/* Content */}
            <div className="bg-bg-secondary rounded-lg p-4 hover:bg-bg-tertiary transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-text-primary">
                      {event.title}
                    </h4>
                    <Badge variant={statusVariants[event.status]} className="text-xs">
                      {event.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  {event.description && (
                    <p className="text-sm text-text-secondary">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-text-tertiary">
                <span>{date}</span>
                <span>{time}</span>
                {event.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
