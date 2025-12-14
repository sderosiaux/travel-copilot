import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FlightStatus } from '@/types'

interface FlightProgressProps {
  status: FlightStatus
  className?: string
}

const statusSteps = [
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'boarding', label: 'Boarding' },
  { key: 'departed', label: 'Departed' },
  { key: 'arrived', label: 'Arrived' },
] as const

const statusOrder: Record<FlightStatus, number> = {
  scheduled: 0,
  boarding: 1,
  departed: 2,
  in_flight: 2,
  landed: 3,
  arrived: 4,
  delayed: 0,
  cancelled: -1,
  diverted: 2,
}

export function FlightProgress({ status, className }: FlightProgressProps) {
  const currentStep = statusOrder[status]
  const isCancelled = status === 'cancelled'

  if (isCancelled) {
    return (
      <div className={cn('space-y-4', className)}>
        <Badge variant="cancelled">Flight Cancelled</Badge>
      </div>
    )
  }

  const progressValue = ((currentStep + 1) / statusSteps.length) * 100

  return (
    <div className={cn('space-y-4', className)}>
      <Progress value={progressValue} className="h-2" />
      <div className="grid grid-cols-4 gap-2">
        {statusSteps.map((step, index) => {
          const isCompleted = currentStep >= index
          const isCurrent = currentStep === index

          return (
            <div key={step.key} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all',
                  isCompleted && 'border-primary-500 bg-primary-500 text-white',
                  isCurrent && 'border-primary-500 bg-primary-500 text-white shadow-lg',
                  !isCompleted && 'border-border bg-bg-secondary text-text-tertiary'
                )}
              >
                {isCompleted ? <Check size={16} /> : <Circle size={12} fill="currentColor" />}
              </div>
              <span
                className={cn(
                  'text-xs text-center transition-colors',
                  isCompleted ? 'text-text-primary font-medium' : 'text-text-tertiary'
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
