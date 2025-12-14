'use client'

import Link from 'next/link'
import { format, differenceInDays, parseISO } from 'date-fns'
import { Calendar, MapPin, Plane, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'
import type { Trip } from '@/types'

export interface UpcomingTripsProps {
  trips: Trip[]
  isLoading?: boolean
}

export function UpcomingTrips({ trips, isLoading }: UpcomingTripsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Upcoming Trips</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse" padding="md">
              <div className="h-40 bg-bg-secondary rounded" />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (trips.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">Upcoming Trips</h2>
        <Card padding="none">
          <EmptyState
            icon={<Plane size={32} />}
            title="No upcoming trips"
            description="Start planning your next adventure by creating a new trip."
            action={{
              label: 'Create Trip',
              href: '/trips/new',
            }}
          />
        </Card>
      </div>
    )
  }

  // Show maximum 3 trips
  const displayTrips = trips.slice(0, 3)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-text-primary">Upcoming Trips</h2>
        {trips.length > 3 && (
          <Button variant="link" asChild>
            <Link href="/trips">View all trips</Link>
          </Button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}

interface TripCardProps {
  trip: Trip
}

function TripCard({ trip }: TripCardProps) {
  const startDate = parseISO(trip.startDate)
  const endDate = parseISO(trip.endDate)
  const daysUntil = differenceInDays(startDate, new Date())
  const hasDisruption = trip.briefing?.risks.level === 'high' || trip.briefing?.risks.level === 'medium'

  const getFlightStatus = () => {
    if (hasDisruption) {
      return { variant: 'warning' as const, label: 'Disrupted' }
    }
    if (daysUntil <= 3) {
      return { variant: 'info' as const, label: 'Soon' }
    }
    return { variant: 'scheduled' as const, label: 'Scheduled' }
  }

  const flightStatus = getFlightStatus()

  return (
    <Card variant="interactive" padding="md" className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={18} className="text-primary-500" />
              <CardTitle className="text-lg">{trip.destination}</CardTitle>
            </div>
            <p className="text-sm text-text-secondary">{trip.title}</p>
          </div>
          <Badge variant={flightStatus.variant}>{flightStatus.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Calendar size={16} />
          <span>
            {format(startDate, 'd MMM')} - {format(endDate, 'd MMM yyyy')}
          </span>
        </div>

        {hasDisruption && (
          <div className="flex items-start gap-2 rounded-md bg-warning-light/20 p-2">
            <AlertTriangle size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-secondary">
              {trip.briefing?.risks.factors[0]}
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-border">
          {daysUntil > 0 ? (
            <p className="text-sm font-medium text-primary-500">
              {daysUntil} {daysUntil === 1 ? 'day' : 'days'} until departure
            </p>
          ) : daysUntil === 0 ? (
            <p className="text-sm font-medium text-success">Departing today!</p>
          ) : (
            <p className="text-sm font-medium text-text-secondary">Trip in progress</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1" asChild>
            <Link href={`/trips/${trip.id}`}>View</Link>
          </Button>
          {daysUntil <= 2 && (
            <Button variant="primary" size="sm" className="flex-1" asChild>
              <Link href={`/trips/${trip.id}#checkin`}>Check-in</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
