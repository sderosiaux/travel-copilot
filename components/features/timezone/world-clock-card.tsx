'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Sun, Moon, Trash2 } from 'lucide-react'
import type { TimeZone } from '@/types/timezone'

interface WorldClockCardProps {
  timezone: TimeZone
  onRemove?: (timezoneId: string) => void
  showRemove?: boolean
}

export function WorldClockCard({ timezone, onRemove, showRemove = false }: WorldClockCardProps) {
  const currentTime = new Date(timezone.currentTime)
  const timeString = currentTime.toLocaleTimeString('en-US', {
    timeZone: timezone.timezone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })
  const dateString = currentTime.toLocaleDateString('en-US', {
    timeZone: timezone.timezone,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{timezone.city}</CardTitle>
            <p className="text-sm text-text-secondary mt-1">{timezone.country}</p>
          </div>
          <div className="flex items-center gap-2">
            {timezone.isDaytime ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-blue-400" />
            )}
            {showRemove && onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(timezone.id)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <Clock className="h-4 w-4 text-text-tertiary mt-1" />
            <div>
              <p className="text-3xl font-bold text-text-primary">{timeString}</p>
              <p className="text-sm text-text-secondary mt-1">{dateString}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="default" className="text-xs">
              {timezone.offset}
            </Badge>
            <Badge variant="default" className="text-xs">
              {timezone.abbreviation}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
