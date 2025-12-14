'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { TimelineDay } from './timeline-day'
import { TimelineFilters } from './timeline-filters'
import { CurrentTimeIndicator } from './current-time-indicator'
import type { TripTimeline } from '@/types/trip'
import { AlertCircle } from 'lucide-react'

interface TripTimelineViewProps {
  events: TripTimeline[]
  onViewEventDetails?: (event: TripTimeline) => void
}

export function TripTimelineView({
  events,
  onViewEventDetails,
}: TripTimelineViewProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Filter events by selected types
  const filteredEvents = useMemo(() => {
    if (selectedTypes.length === 0) return events
    return events.filter((event) => selectedTypes.includes(event.type))
  }, [events, selectedTypes])

  // Group events by day
  const eventsByDay = useMemo(() => {
    const groups: Record<string, TripTimeline[]> = {}

    filteredEvents.forEach((event) => {
      const date = new Date(event.timestamp)
      const dayKey = date.toISOString().split('T')[0]

      if (!groups[dayKey]) {
        groups[dayKey] = []
      }
      groups[dayKey].push(event)
    })

    // Sort events within each day by timestamp
    Object.keys(groups).forEach((day) => {
      groups[day].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    })

    return groups
  }, [filteredEvents])

  // Get sorted day keys
  const sortedDays = useMemo(() => {
    return Object.keys(eventsByDay).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    )
  }, [eventsByDay])

  // Check if today falls within the timeline
  const todayKey = new Date().toISOString().split('T')[0]
  const hasTodayEvents = eventsByDay[todayKey] !== undefined

  // Find where "now" indicator should go
  const nowPosition = useMemo(() => {
    const now = new Date()
    const nowTime = now.getTime()

    for (let i = 0; i < sortedDays.length; i++) {
      const dayKey = sortedDays[i]
      const dayEvents = eventsByDay[dayKey]

      // Check if now falls on this day
      if (dayKey === todayKey) {
        // Find position within the day's events
        const eventIndex = dayEvents.findIndex((event) => {
          return new Date(event.timestamp).getTime() > nowTime
        })

        return {
          dayIndex: i,
          eventIndex: eventIndex === -1 ? dayEvents.length : eventIndex,
        }
      }

      // Check if now falls between days
      const dayDate = new Date(dayKey)
      const nextDayKey = sortedDays[i + 1]
      const nextDayDate = nextDayKey ? new Date(nextDayKey) : null

      if (
        dayDate.getTime() < nowTime &&
        (!nextDayDate || nextDayDate.getTime() > nowTime)
      ) {
        return {
          dayIndex: i,
          eventIndex: dayEvents.length,
        }
      }
    }

    return null
  }, [sortedDays, eventsByDay, todayKey])

  const handleToggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleClearFilters = () => {
    setSelectedTypes([])
  }

  if (events.length === 0) {
    return (
      <Card variant="info" padding="lg">
        <div className="flex items-start gap-4">
          <AlertCircle size={24} className="text-info flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              No Timeline Events
            </h3>
            <p className="text-text-secondary">
              There are no events to display in the timeline for this trip.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="space-y-6">
        <TimelineFilters
          selectedTypes={selectedTypes}
          onToggleType={handleToggleType}
          onClearAll={handleClearFilters}
        />
        <Card variant="info" padding="lg">
          <div className="flex items-start gap-4">
            <AlertCircle size={24} className="text-info flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No Events Match Your Filters
              </h3>
              <p className="text-text-secondary">
                Try adjusting your filters to see more events.
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <TimelineFilters
        selectedTypes={selectedTypes}
        onToggleType={handleToggleType}
        onClearAll={handleClearFilters}
      />

      {/* Timeline */}
      <div className="space-y-8">
        {sortedDays.map((dayKey, dayIndex) => {
          const dayEvents = eventsByDay[dayKey]
          const isToday = dayKey === todayKey

          return (
            <div key={dayKey}>
              <TimelineDay
                date={dayKey}
                events={dayEvents}
                isToday={isToday}
                onViewEventDetails={onViewEventDetails}
              />

              {/* Current time indicator */}
              {nowPosition &&
                nowPosition.dayIndex === dayIndex &&
                nowPosition.eventIndex === dayEvents.length && (
                  <div className="pl-4">
                    <CurrentTimeIndicator />
                  </div>
                )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
