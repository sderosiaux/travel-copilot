import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { Clock, ArrowRight } from 'lucide-react'
import type { DestinationInfo } from '@/data/destinations'

interface TimezoneWidgetProps {
  origin: DestinationInfo
  destination: DestinationInfo
}

export function TimezoneWidget({ origin, destination }: TimezoneWidgetProps) {
  // Calculate time difference
  const parseOffset = (offset: string) => {
    const match = offset.match(/([+-])(\d{2}):(\d{2})/)
    if (!match) return 0
    const hours = parseInt(match[2])
    const minutes = parseInt(match[3])
    const totalMinutes = hours * 60 + minutes
    return match[1] === '+' ? totalMinutes : -totalMinutes
  }

  const originOffset = parseOffset(origin.timezoneOffset)
  const destOffset = parseOffset(destination.timezoneOffset)
  const differenceMinutes = destOffset - originOffset
  const differenceHours = Math.abs(Math.floor(differenceMinutes / 60))
  const differenceRemainder = Math.abs(differenceMinutes % 60)

  const ahead = differenceMinutes > 0

  // Get current times (mock - in real app would use actual timezone libraries)
  const now = new Date()
  const originTime = new Date(now.getTime() + originOffset * 60 * 1000)
  const destTime = new Date(now.getTime() + destOffset * 60 * 1000)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timezone Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Time Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Origin Time */}
            <div className="text-center p-4 bg-bg-secondary rounded-lg">
              <p className="text-sm text-text-secondary mb-2">{origin.city}</p>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="w-5 h-5 text-primary-500" />
                <p className="text-2xl font-bold text-text-primary">
                  {formatTime(originTime)}
                </p>
              </div>
              <p className="text-xs text-text-tertiary">UTC{origin.timezoneOffset}</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-text-tertiary" />
            </div>

            {/* Destination Time */}
            <div className="text-center p-4 bg-primary-500/10 rounded-lg border-2 border-primary-500/20">
              <p className="text-sm text-text-secondary mb-2">{destination.city}</p>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="w-5 h-5 text-primary-500" />
                <p className="text-2xl font-bold text-text-primary">
                  {formatTime(destTime)}
                </p>
              </div>
              <p className="text-xs text-text-tertiary">UTC{destination.timezoneOffset}</p>
            </div>
          </div>

          {/* Time Difference */}
          <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-info" />
              <p className="text-sm font-semibold text-text-primary">Time Difference</p>
            </div>
            <p className="text-sm text-text-secondary">
              {destination.city} is{' '}
              <span className="font-semibold text-text-primary">
                {differenceHours} hour{differenceHours !== 1 ? 's' : ''}
                {differenceRemainder > 0 && ` ${differenceRemainder} min`}
              </span>{' '}
              {ahead ? 'ahead of' : 'behind'} {origin.city}
            </p>
          </div>

          {/* Jet Lag Tips */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-text-primary">Jet Lag Tips</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-primary-500 mt-1">•</span>
                <span>
                  Start adjusting your sleep schedule 2-3 days before departure
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 mt-1">•</span>
                <span>
                  Stay hydrated during the flight and avoid excessive alcohol
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 mt-1">•</span>
                <span>
                  Get sunlight exposure at your destination to help reset your body clock
                </span>
              </li>
              {differenceHours >= 5 && (
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-1">•</span>
                  <span className="text-warning">
                    With a {differenceHours}-hour time difference, allow 2-3 days for full adjustment
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
