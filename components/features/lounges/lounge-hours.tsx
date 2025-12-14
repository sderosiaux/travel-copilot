import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import type { Lounge } from '@/types'

interface LoungeHoursProps {
  hours: Lounge['hours']
}

export function LoungeHours({ hours }: LoungeHoursProps) {
  const isOpen24Hours = hours.open === '00:00' && hours.close === '23:59'
  const isCurrentlyOpen = checkIfOpen(hours)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
          <Clock className="h-4 w-4" />
          <span>Operating Hours</span>
        </div>
        <Badge variant={isCurrentlyOpen ? 'success' : 'default'}>
          {isCurrentlyOpen ? 'Open Now' : 'Closed'}
        </Badge>
      </div>

      {isOpen24Hours ? (
        <p className="text-sm text-text-primary font-medium">Open 24 Hours</p>
      ) : (
        <p className="text-sm text-text-primary">
          <span className="font-medium">{formatTime(hours.open)}</span>
          {' - '}
          <span className="font-medium">{formatTime(hours.close)}</span>
        </p>
      )}

      {hours.days && (
        <p className="text-xs text-text-tertiary">
          {hours.days.join(', ')}
        </p>
      )}
    </div>
  )
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}

function checkIfOpen(hours: Lounge['hours']): boolean {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  const [openHour, openMin] = hours.open.split(':').map(Number)
  const [closeHour, closeMin] = hours.close.split(':').map(Number)

  const openTime = openHour * 60 + openMin
  const closeTime = closeHour * 60 + closeMin

  // Handle 24-hour operations
  if (openTime === 0 && closeTime === 1439) {
    return true
  }

  // Handle closing after midnight
  if (closeTime < openTime) {
    return currentTime >= openTime || currentTime <= closeTime
  }

  return currentTime >= openTime && currentTime <= closeTime
}
