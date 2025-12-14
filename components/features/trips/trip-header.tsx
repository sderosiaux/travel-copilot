'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Trip } from '@/types'
import { MapPin, Calendar, Users, ArrowLeft, MoreVertical } from 'lucide-react'
import Link from 'next/link'

interface TripHeaderProps {
  trip: Trip
}

const statusVariants: Record<Trip['status'], 'success' | 'info' | 'default' | 'error'> = {
  upcoming: 'info',
  active: 'success',
  completed: 'default',
  cancelled: 'error',
}

export function TripHeader({ trip }: TripHeaderProps) {
  const startDate = new Date(trip.startDate)
  const endDate = new Date(trip.endDate)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/trips">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Trips
        </Button>
      </Link>

      {/* Hero Section with Destination Image Placeholder */}
      <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <MapPin className="h-12 w-12 mb-4 opacity-80" />
          <h1 className="text-4xl font-bold mb-2">{trip.destination}</h1>
          <p className="text-lg opacity-90">{trip.title}</p>
        </div>
      </div>

      {/* Trip Info Card */}
      <div className="bg-bg-secondary rounded-xl p-6 border border-border">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Badge variant={statusVariants[trip.status]} className="text-sm">
              {trip.status.toUpperCase()}
            </Badge>
            {trip.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dates */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-bg-primary">
              <Calendar className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Travel Dates</p>
              <p className="text-sm font-medium text-text-primary">
                {formatDate(startDate)}
              </p>
              <p className="text-sm font-medium text-text-primary">
                {formatDate(endDate)}
              </p>
            </div>
          </div>

          {/* Route */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-bg-primary">
              <MapPin className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Route</p>
              <p className="text-sm font-medium text-text-primary">
                {trip.origin} → {trip.destination}
              </p>
            </div>
          </div>

          {/* Travelers */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-bg-primary">
              <Users className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Travelers</p>
              <p className="text-sm font-medium text-text-primary">
                {trip.travelers.length} {trip.travelers.length === 1 ? 'traveler' : 'travelers'}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {trip.travelers.filter(t => t.role === 'child').length > 0 &&
                  `${trip.travelers.filter(t => t.role === 'child').length} children`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
