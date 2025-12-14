import { CheckInCard } from './check-in-card'
import { EmptyState } from '@/components/shared/empty-state'
import { Plane } from 'lucide-react'
import type { FlightCheckIn } from '@/types'

interface CheckInListProps {
  checkIns: FlightCheckIn[]
  onCheckIn: (flightId: string) => void
}

export function CheckInList({ checkIns, onCheckIn }: CheckInListProps) {
  if (checkIns.length === 0) {
    return (
      <EmptyState
        icon={<Plane size={32} />}
        title="No flights available for check-in"
        description="You don't have any upcoming flights that are ready for check-in. Check-in typically opens 24 hours before departure."
      />
    )
  }

  // Sort by check-in status and departure time
  const sortedCheckIns = [...checkIns].sort((a, b) => {
    // Priority order: open > closing_soon > not_open > completed > closed
    const statusOrder = {
      open: 1,
      closing_soon: 2,
      not_open: 3,
      completed: 4,
      closed: 5,
    }

    const aOrder = statusOrder[a.window.status]
    const bOrder = statusOrder[b.window.status]

    if (aOrder !== bOrder) {
      return aOrder - bOrder
    }

    // If same status, sort by departure time
    return new Date(a.departure).getTime() - new Date(b.departure).getTime()
  })

  return (
    <div className="space-y-4">
      {sortedCheckIns.map((checkIn) => (
        <CheckInCard key={checkIn.flightId} checkIn={checkIn} onCheckIn={onCheckIn} />
      ))}
    </div>
  )
}
