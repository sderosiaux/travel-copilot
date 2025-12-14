'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Flight } from '@/types'
import { Plane, Clock, ArrowRight } from 'lucide-react'

interface TripFlightCardProps {
  flight: Flight
}

const statusVariants: Record<Flight['status'], 'success' | 'info' | 'default' | 'error' | 'warning'> = {
  scheduled: 'info',
  boarding: 'warning',
  departed: 'info',
  in_flight: 'info',
  landed: 'success',
  arrived: 'success',
  delayed: 'warning',
  cancelled: 'error',
  diverted: 'error',
}

export function TripFlightCard({ flight }: TripFlightCardProps) {
  const departureDate = new Date(flight.departure.scheduled)
  const arrivalDate = new Date(flight.arrival.scheduled)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <Link href={`/flights/${flight.id}`}>
      <Card className="p-4 hover:shadow-md transition-all duration-200 hover:border-primary-500 cursor-pointer group">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-500/10">
              <Plane className="h-4 w-4 text-primary-500" />
            </div>
            <div>
              <p className="font-semibold text-text-primary group-hover:text-primary-500 transition-colors">
                {flight.flightNumber}
              </p>
              <p className="text-xs text-text-tertiary">{flight.airline}</p>
            </div>
          </div>
          <Badge variant={statusVariants[flight.status]} className="text-xs">
            {flight.status}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-lg font-bold text-text-primary">{formatTime(departureDate)}</p>
            <p className="text-sm text-text-secondary">{flight.origin}</p>
            <p className="text-xs text-text-tertiary">{formatDate(departureDate)}</p>
          </div>

          <div className="flex flex-col items-center px-2">
            <Clock className="h-3 w-3 text-text-tertiary mb-1" />
            <p className="text-xs text-text-tertiary whitespace-nowrap">
              {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
            </p>
            <ArrowRight className="h-3 w-3 text-text-tertiary mt-1" />
          </div>

          <div className="flex-1 text-right">
            <p className="text-lg font-bold text-text-primary">{formatTime(arrivalDate)}</p>
            <p className="text-sm text-text-secondary">{flight.destination}</p>
            <p className="text-xs text-text-tertiary">{formatDate(arrivalDate)}</p>
          </div>
        </div>

        {(flight.departure.gate || flight.departure.terminal) && (
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-xs text-text-secondary">
            {flight.departure.terminal && <span>Terminal {flight.departure.terminal}</span>}
            {flight.departure.gate && <span>Gate {flight.departure.gate}</span>}
          </div>
        )}
      </Card>
    </Link>
  )
}
