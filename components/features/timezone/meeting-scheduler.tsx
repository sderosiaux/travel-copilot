'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Globe } from 'lucide-react'
import type { MeetingSchedule } from '@/types/timezone'

interface MeetingSchedulerProps {
  meetings: MeetingSchedule[]
}

export function MeetingScheduler({ meetings }: MeetingSchedulerProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Scheduler</CardTitle>
        <CardDescription>View meeting times across different time zones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetings.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              <Clock className="h-12 w-12 mx-auto mb-3 text-text-tertiary" />
              <p>No meetings scheduled</p>
            </div>
          ) : (
            meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-4 border border-border-primary rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  {/* Meeting header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary">{meeting.title}</h3>
                      {meeting.description && (
                        <p className="text-sm text-text-secondary mt-1">
                          {meeting.description}
                        </p>
                      )}
                    </div>
                    <Badge variant="info" className="ml-2">
                      {formatDuration(meeting.duration)}
                    </Badge>
                  </div>

                  {/* Date and time */}
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(meeting.date)}</span>
                    <span>•</span>
                    <span>{meeting.time}</span>
                  </div>

                  {/* Participants */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Users className="h-4 w-4" />
                      <span>{meeting.participants.length} participants</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {meeting.participants.map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between p-2 bg-bg-secondary rounded"
                        >
                          <div className="flex items-center gap-2">
                            <Globe className="h-3 w-3 text-text-tertiary" />
                            <span className="text-sm text-text-primary">
                              {participant.name}
                              {participant.isOrganizer && (
                                <Badge variant="default" className="ml-2 text-xs">
                                  Organizer
                                </Badge>
                              )}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-text-primary">
                            {participant.localTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
