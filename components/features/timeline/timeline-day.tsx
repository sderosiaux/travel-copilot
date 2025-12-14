'use client'

import { TimelineEvent } from './timeline-event'
import type { TripTimeline } from '@/types/trip'
import { Calendar } from 'lucide-react'

interface TimelineDayProps {
  date: string
  events: TripTimeline[]
  isToday?: boolean
  onViewEventDetails?: (event: TripTimeline) => void
}

export function TimelineDay({
  date,
  events,
  isToday = false,
  onViewEventDetails,
}: TimelineDayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getDayOfWeek = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'short',
    })
  }

  const getDateNumber = (dateString: string) => {
    return new Date(dateString).getDate()
  }

  const getMonth = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      month: 'short',
    })
  }

  return (
    <div className="space-y-4">
      {/* Day Header */}
      <div className="flex items-center gap-4 sticky top-0 bg-bg-primary py-4 z-10">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-primary-500/10 border-2 border-primary-500/20">
            <div className="text-xs font-medium text-primary-500 uppercase">
              {getMonth(date)}
            </div>
            <div className="text-2xl font-bold text-primary-500">
              {getDateNumber(date)}
            </div>
            <div className="text-xs text-text-tertiary uppercase">
              {getDayOfWeek(date)}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text-primary">
              {formatDate(date)}
            </h3>
            <p className="text-sm text-text-secondary">
              {events.length} {events.length === 1 ? 'event' : 'events'}
            </p>
          </div>
        </div>
        {isToday && (
          <div className="ml-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-500 text-white rounded-full text-sm font-medium">
              <Calendar size={14} />
              Today
            </div>
          </div>
        )}
      </div>

      {/* Events */}
      <div className="space-y-0 pl-4">
        {events.map((event, index) => (
          <TimelineEvent
            key={event.id}
            event={event}
            isFirst={index === 0}
            isLast={index === events.length - 1}
            isCurrent={isToday && event.status === 'in_progress'}
            onViewDetails={onViewEventDetails}
          />
        ))}
      </div>
    </div>
  )
}
