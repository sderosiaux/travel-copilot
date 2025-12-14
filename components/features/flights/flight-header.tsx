import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plane } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Flight } from '@/types'

interface FlightHeaderProps {
  flight: Flight
  originName: string
  destinationName: string
}

export function FlightHeader({ flight, originName, destinationName }: FlightHeaderProps) {
  const router = useRouter()

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'scheduled'
      case 'boarding':
        return 'boarding'
      case 'departed':
      case 'in_flight':
        return 'departed'
      case 'landed':
      case 'arrived':
        return 'arrived'
      case 'delayed':
        return 'delayed'
      case 'cancelled':
        return 'cancelled'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled'
      case 'boarding':
        return 'Boarding'
      case 'departed':
        return 'Departed'
      case 'in_flight':
        return 'In Flight'
      case 'landed':
        return 'Landed'
      case 'arrived':
        return 'Arrived'
      case 'delayed':
        return 'Delayed'
      case 'cancelled':
        return 'Cancelled'
      case 'diverted':
        return 'Diverted'
      default:
        return status
    }
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft size={16} />
        Back to Flights
      </Button>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10">
            <Plane size={24} className="text-primary-500" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-2xl font-semibold text-text-primary">{flight.flightNumber}</div>
            <div className="text-sm text-text-secondary">{flight.airline}</div>
          </div>
          <Badge variant={getStatusVariant(flight.status)} className="text-sm">
            {getStatusLabel(flight.status)}
          </Badge>
        </div>

        <div className="flex items-center gap-3 text-lg">
          <span className="font-semibold text-text-primary">{flight.origin}</span>
          <span className="text-text-tertiary">→</span>
          <span className="font-semibold text-text-primary">{flight.destination}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <span>{originName}</span>
          <span>→</span>
          <span>{destinationName}</span>
        </div>
      </div>
    </div>
  )
}
