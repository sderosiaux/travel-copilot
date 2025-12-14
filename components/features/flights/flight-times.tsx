import { format } from 'date-fns'
import { Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FlightTimesProps {
  scheduled: string
  estimated?: string
  actual?: string
  label: string
  showDelay?: boolean
  className?: string
}

export function FlightTimes({
  scheduled,
  estimated,
  actual,
  label,
  showDelay = true,
  className,
}: FlightTimesProps) {
  const scheduledDate = new Date(scheduled)
  const estimatedDate = estimated ? new Date(estimated) : null
  const actualDate = actual ? new Date(actual) : null

  const displayTime = actualDate || estimatedDate || scheduledDate
  const isDelayed = estimatedDate && estimatedDate > scheduledDate
  const delayMinutes = isDelayed
    ? Math.round((estimatedDate.getTime() - scheduledDate.getTime()) / 60000)
    : 0

  return (
    <div className={cn('space-y-1', className)}>
      <div className="text-xs text-text-tertiary uppercase tracking-wide">{label}</div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-semibold text-text-primary">
          {format(displayTime, 'HH:mm')}
        </div>
        <div className="text-sm text-text-secondary">{format(displayTime, 'EEE, MMM d')}</div>
      </div>
      {showDelay && isDelayed && delayMinutes > 0 && (
        <div className="flex items-center gap-1 text-sm text-warning">
          <AlertCircle size={14} />
          <span>Delayed {delayMinutes} min</span>
        </div>
      )}
      {actual && (
        <div className="flex items-center gap-1 text-xs text-text-tertiary">
          <Clock size={12} />
          <span>Scheduled: {format(scheduledDate, 'HH:mm')}</span>
        </div>
      )}
    </div>
  )
}
