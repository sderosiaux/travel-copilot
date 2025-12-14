import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GateBadge } from './gate-badge'
import { Plane, Clock, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import type { Flight } from '@/types'

interface FlightCardProps {
  flight: Flight
  originName: string
  destinationName: string
}

export function FlightCard({ flight, originName, destinationName }: FlightCardProps) {
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

  const departureDate = new Date(flight.departure.scheduled)
  const arrivalDate = new Date(flight.arrival.scheduled)

  return (
    <Card
      variant="interactive"
      onClick={() => router.push(`/flights/${flight.id}`)}
      className="transition-all hover:shadow-lg"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10">
              <Plane size={20} className="text-primary-500" />
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-text-primary">{flight.flightNumber}</div>
              <div className="text-sm text-text-secondary">{flight.airline}</div>
            </div>
          </div>
          <Badge variant={getStatusVariant(flight.status)}>
            {getStatusLabel(flight.status)}
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-1">
            <div className="text-2xl font-semibold text-text-primary">
              {format(departureDate, 'HH:mm')}
            </div>
            <div className="text-sm font-medium text-text-primary">{flight.origin}</div>
            <div className="text-xs text-text-secondary truncate">{originName}</div>
          </div>

          <div className="flex flex-col items-center justify-center px-4">
            <Clock size={16} className="text-text-tertiary mb-1" />
            <div className="text-xs text-text-tertiary whitespace-nowrap">
              {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
            </div>
          </div>

          <div className="flex-1 space-y-1 text-right">
            <div className="text-2xl font-semibold text-text-primary">
              {format(arrivalDate, 'HH:mm')}
            </div>
            <div className="text-sm font-medium text-text-primary">{flight.destination}</div>
            <div className="text-xs text-text-secondary truncate">{destinationName}</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
          <div className="flex items-center gap-4">
            <GateBadge
              gate={flight.departure.gate}
              terminal={flight.departure.terminal}
            />
            {flight.aircraftType && (
              <div className="text-sm text-text-tertiary">{flight.aircraftType}</div>
            )}
          </div>
          {flight.status === 'delayed' && (
            <div className="flex items-center gap-1 text-sm text-warning">
              <AlertCircle size={14} />
              <span>Delayed</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
