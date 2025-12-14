import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FlightProgress } from './flight-progress'
import { FlightTimes } from './flight-times'
import { GateBadge } from './gate-badge'
import { AlertCircle, Clock, MapPin } from 'lucide-react'
import type { Flight } from '@/types'

interface FlightStatusCardProps {
  flight: Flight
}

export function FlightStatusCard({ flight }: FlightStatusCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'on_time':
      case 'arrived':
        return 'on_time'
      case 'delayed':
        return 'delayed'
      case 'cancelled':
        return 'cancelled'
      case 'boarding':
        return 'boarding'
      case 'departed':
        return 'departed'
      default:
        return 'scheduled'
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Live Status</CardTitle>
          <Badge variant={getStatusVariant(flight.status)}>{getStatusLabel(flight.status)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FlightProgress status={flight.status} />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <FlightTimes
              scheduled={flight.departure.scheduled}
              estimated={flight.departure.estimated}
              actual={flight.departure.actual}
              label="Departure"
            />
            <GateBadge gate={flight.departure.gate} terminal={flight.departure.terminal} />
          </div>

          <div className="space-y-4">
            <FlightTimes
              scheduled={flight.arrival.scheduled}
              estimated={flight.arrival.estimated}
              actual={flight.arrival.actual}
              label="Arrival"
            />
            <GateBadge gate={flight.arrival.gate} terminal={flight.arrival.terminal} />
            {flight.arrival.baggage && (
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                <MapPin size={14} />
                <span>Baggage Carousel {flight.arrival.baggage}</span>
              </div>
            )}
          </div>
        </div>

        {flight.status === 'delayed' && (
          <div className="flex items-start gap-3 rounded-lg border border-warning bg-warning/10 p-4">
            <AlertCircle className="flex-shrink-0 text-warning" size={20} />
            <div className="space-y-1">
              <div className="font-medium text-text-primary">Flight Delayed</div>
              <div className="text-sm text-text-secondary">
                This flight is currently delayed. Please check with the airline for the latest updates.
              </div>
            </div>
          </div>
        )}

        {flight.status === 'cancelled' && (
          <div className="flex items-start gap-3 rounded-lg border border-error bg-error/10 p-4">
            <AlertCircle className="flex-shrink-0 text-error" size={20} />
            <div className="space-y-1">
              <div className="font-medium text-text-primary">Flight Cancelled</div>
              <div className="text-sm text-text-secondary">
                This flight has been cancelled. Please contact the airline for rebooking options.
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
