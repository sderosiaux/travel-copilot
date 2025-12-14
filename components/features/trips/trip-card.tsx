'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { TravelerAvatars } from './traveler-avatars'
import type { Trip } from '@/types'
import { Calendar, MapPin, Plane } from 'lucide-react'

interface TripCardProps {
  trip: Trip
}

const statusVariants: Record<Trip['status'], 'success' | 'info' | 'default' | 'error'> = {
  upcoming: 'info',
  active: 'success',
  completed: 'default',
  cancelled: 'error',
}

export function TripCard({ trip }: TripCardProps) {
  const startDate = new Date(trip.startDate)
  const endDate = new Date(trip.endDate)
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <Link href={`/trips/${trip.id}`}>
      <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:border-primary-500 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary-500 transition-colors">
                {trip.title}
              </h3>
              <Badge variant={statusVariants[trip.status]}>
                {trip.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <MapPin className="h-4 w-4" />
              <span>{trip.origin} → {trip.destination}</span>
            </div>
          </div>
          <TravelerAvatars travelers={trip.travelers} maxVisible={3} size="md" />
        </div>

        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            <span>{trip.flights.length} {trip.flights.length === 1 ? 'flight' : 'flights'}</span>
          </div>
          <div className="text-text-tertiary">
            {duration} {duration === 1 ? 'day' : 'days'}
          </div>
        </div>

        {trip.tags.length > 0 && (
          <div className="flex gap-2 mt-4">
            {trip.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Card>
    </Link>
  )
}
