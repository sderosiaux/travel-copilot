import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import type { CheckInWindow } from '@/types'

interface CheckInWindowProps {
  window: CheckInWindow
}

export function CheckInWindowDisplay({ window }: CheckInWindowProps) {
  const getStatusConfig = () => {
    switch (window.status) {
      case 'not_open':
        return {
          badge: 'warning' as const,
          icon: Clock,
          label: 'Opens Soon',
          message: window.hoursUntilOpen
            ? `Opens in ${Math.round(window.hoursUntilOpen)} hours`
            : 'Not open yet',
        }
      case 'open':
        return {
          badge: 'success' as const,
          icon: CheckCircle2,
          label: 'Open Now',
          message: window.hoursUntilClose
            ? `Closes in ${Math.round(window.hoursUntilClose)} hours`
            : 'Check-in available',
        }
      case 'closing_soon':
        return {
          badge: 'warning' as const,
          icon: AlertCircle,
          label: 'Closing Soon',
          message: window.hoursUntilClose
            ? `Closes in ${Math.round(window.hoursUntilClose * 60)} minutes`
            : 'Check-in closing soon',
        }
      case 'closed':
        return {
          badge: 'error' as const,
          icon: XCircle,
          label: 'Closed',
          message: 'Check-in has closed',
        }
      case 'completed':
        return {
          badge: 'success' as const,
          icon: CheckCircle2,
          label: 'Completed',
          message: 'Already checked in',
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-text-secondary" />
        <div className="flex flex-col">
          <Badge variant={config.badge}>{config.label}</Badge>
          <p className="text-xs text-text-tertiary mt-1">{config.message}</p>
        </div>
      </div>
    </div>
  )
}
