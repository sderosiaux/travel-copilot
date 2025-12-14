'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckInWindowDisplay } from './check-in-window'
import { Plane, Users, Calendar, Clock } from 'lucide-react'
import type { FlightCheckIn } from '@/types'

interface CheckInCardProps {
  checkIn: FlightCheckIn
  onCheckIn: (flightId: string) => void
}

export function CheckInCard({ checkIn, onCheckIn }: CheckInCardProps) {
  const departureDate = new Date(checkIn.departure).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const departureTime = new Date(checkIn.departure).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const canCheckIn = checkIn.window.status === 'open' || checkIn.window.status === 'closing_soon'

  return (
    <Card variant="interactive">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10">
                <Plane className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {checkIn.airline} {checkIn.flightNumber}
                </h3>
                <p className="text-sm text-text-secondary">
                  {checkIn.origin} → {checkIn.destination}
                </p>
              </div>
            </div>
          </div>
          <CheckInWindowDisplay window={checkIn.window} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Flight Details */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-text-tertiary" />
            <span className="text-text-secondary">{departureDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-text-tertiary" />
            <span className="text-text-secondary">{departureTime}</span>
          </div>
        </div>

        {/* Passengers */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Users className="h-4 w-4 text-text-tertiary" />
            <span>
              {checkIn.passengers.length} {checkIn.passengers.length === 1 ? 'Passenger' : 'Passengers'}
            </span>
            {checkIn.groupCheckIn && (
              <Badge variant="info" className="ml-2">
                Group Check-in
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {checkIn.passengers.slice(0, 3).map((passenger) => (
              <div
                key={passenger.travelerId}
                className="text-xs bg-bg-secondary px-2 py-1 rounded text-text-secondary"
              >
                {passenger.name} {passenger.seat && `(${passenger.seat})`}
              </div>
            ))}
            {checkIn.passengers.length > 3 && (
              <div className="text-xs bg-bg-secondary px-2 py-1 rounded text-text-secondary">
                +{checkIn.passengers.length - 3} more
              </div>
            )}
          </div>
        </div>

        {/* Booking Reference */}
        <div className="text-sm">
          <span className="text-text-tertiary">Booking Reference: </span>
          <span className="font-mono font-semibold text-text-primary">
            {checkIn.bookingReference}
          </span>
        </div>

        {/* Actions */}
        <div className="pt-2 flex gap-2">
          {canCheckIn ? (
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => onCheckIn(checkIn.flightId)}
            >
              Check In Now
            </Button>
          ) : (
            <Button variant="secondary" className="flex-1" disabled>
              {checkIn.window.status === 'not_open' && 'Not Available Yet'}
              {checkIn.window.status === 'closed' && 'Check-in Closed'}
              {checkIn.window.status === 'completed' && 'Already Checked In'}
            </Button>
          )}
          <Button variant="ghost">View Details</Button>
        </div>
      </CardContent>
    </Card>
  )
}
