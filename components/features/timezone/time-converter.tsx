'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'
import type { TimeZone } from '@/types/timezone'

interface TimeConverterProps {
  timezones: TimeZone[]
}

export function TimeConverter({ timezones }: TimeConverterProps) {
  const [sourceTimezone, setSourceTimezone] = useState<string>(timezones[0]?.timezone || '')
  const [targetTimezone, setTargetTimezone] = useState<string>(timezones[1]?.timezone || '')
  const [sourceTime, setSourceTime] = useState<string>('12:00')
  const [sourceDate, setSourceDate] = useState<string>(new Date().toISOString().split('T')[0])

  const convertTime = () => {
    if (!sourceTimezone || !targetTimezone) return null

    const sourceDateTime = new Date(`${sourceDate}T${sourceTime}:00`)
    const targetTimeString = sourceDateTime.toLocaleTimeString('en-US', {
      timeZone: targetTimezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    })
    const targetDateString = sourceDateTime.toLocaleDateString('en-US', {
      timeZone: targetTimezone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    return { time: targetTimeString, date: targetDateString }
  }

  const result = convertTime()

  const getTimezoneLabel = (tz: string) => {
    const timezone = timezones.find((t) => t.timezone === tz)
    return timezone ? `${timezone.city}, ${timezone.country}` : tz
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Conversion Calculator</CardTitle>
        <CardDescription>Convert time between different time zones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Source timezone */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-timezone">From</Label>
                <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
                  <SelectTrigger id="source-timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.id} value={tz.timezone}>
                        {tz.city}, {tz.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                  <Input
                    id="source-date"
                    type="date"
                    value={sourceDate}
                    onChange={(e) => setSourceDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-time">Time</Label>
                <Input
                  id="source-time"
                  type="time"
                  value={sourceTime}
                  onChange={(e) => setSourceTime(e.target.value)}
                />
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-text-tertiary" />
            </div>

            {/* Target timezone */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-timezone">To</Label>
                <Select value={targetTimezone} onValueChange={setTargetTimezone}>
                  <SelectTrigger id="target-timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.id} value={tz.timezone}>
                        {tz.city}, {tz.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {result && (
                <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-950 rounded-lg">
                  <p className="text-sm text-text-secondary mb-2">Converted Time</p>
                  <p className="text-3xl font-bold text-text-primary">{result.time}</p>
                  <p className="text-sm text-text-secondary mt-2">{result.date}</p>
                </div>
              )}
            </div>
          </div>

          {result && (
            <div className="pt-4 border-t border-border-primary">
              <div className="text-sm text-text-secondary space-y-1">
                <p>
                  <span className="font-medium">{sourceTime}</span> in{' '}
                  <span className="font-medium">{getTimezoneLabel(sourceTimezone)}</span>
                </p>
                <p className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span className="font-medium">{result.time}</span> in{' '}
                  <span className="font-medium">{getTimezoneLabel(targetTimezone)}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
