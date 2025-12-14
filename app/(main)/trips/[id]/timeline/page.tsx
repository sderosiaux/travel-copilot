'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { TripTimelineView } from '@/components/features/timeline'
import { mockTrips } from '@/data/trips'
import { mockFlights } from '@/data/flights'
import type { Trip, TripTimeline } from '@/types/trip'
import {
  ArrowLeft,
  AlertTriangle,
  Calendar,
  MapPin,
  Users,
  Download,
} from 'lucide-react'

export default function TripTimelinePage() {
  const params = useParams()
  const router = useRouter()
  const tripId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [trip, setTrip] = useState<Trip | null>(null)
  const [timelineEvents, setTimelineEvents] = useState<TripTimeline[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 600))

        // Find trip
        const tripData = Object.values(mockTrips).find((t) => t.id === tripId)
        if (!tripData) {
          setError('Trip not found')
          return
        }
        setTrip(tripData)

        // Enrich timeline with flight details
        const enrichedTimeline = await enrichTimelineWithFlightDetails(
          tripData.timeline || [],
          tripData.flights
        )
        setTimelineEvents(enrichedTimeline)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load timeline')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [tripId])

  const enrichTimelineWithFlightDetails = async (
    timeline: TripTimeline[],
    flightIds: string[]
  ): Promise<TripTimeline[]> => {
    return timeline.map((event) => {
      if (event.type === 'flight') {
        // Try to find matching flight
        const flight = Object.values(mockFlights).find((f) =>
          event.title.includes(f.flightNumber)
        )

        if (flight) {
          return {
            ...event,
            details: {
              ...event.details,
              flightNumber: flight.flightNumber,
              origin: flight.origin,
              destination: flight.destination,
              status: flight.status,
            },
          }
        }
      }
      return event
    })
  }

  const handleViewEventDetails = (event: TripTimeline) => {
    console.log('View event details:', event)
    // In a real app, this would open a modal or navigate to details page
    if (event.type === 'flight' && event.details?.flightNumber) {
      // Try to find the flight ID
      const flight = Object.values(mockFlights).find((f) =>
        event.title.includes(f.flightNumber)
      )
      if (flight) {
        router.push(`/flights/${flight.id}`)
      }
    }
  }

  const handleExportTimeline = () => {
    // In a real app, this would export the timeline to calendar or PDF
    alert('Timeline export feature coming soon!')
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    return `${start.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    })} - ${end.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}`
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (error || !trip) {
    return (
      <div className="container mx-auto p-6">
        <Card variant="alert" padding="lg">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-error flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Unable to Load Timeline
              </h2>
              <p className="text-text-secondary mb-4">
                {error || 'Unable to load timeline for this trip.'}
              </p>
              <Button
                variant="secondary"
                onClick={() => router.push(`/trips/${tripId}`)}
              >
                <ArrowLeft size={16} />
                Back to Trip Details
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/trips/${tripId}`)}
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-text-primary">{trip.title}</h1>
            <p className="text-text-secondary mt-1">Complete trip timeline</p>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={handleExportTimeline}
          className="gap-2"
        >
          <Download size={16} />
          Export Timeline
        </Button>
      </div>

      {/* Trip Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <Calendar size={20} className="text-text-tertiary mt-0.5" />
              <div>
                <div className="text-sm text-text-tertiary mb-1">Dates</div>
                <div className="text-base font-semibold text-text-primary">
                  {formatDateRange(trip.startDate, trip.endDate)}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-text-tertiary mt-0.5" />
              <div>
                <div className="text-sm text-text-tertiary mb-1">Destination</div>
                <div className="text-base font-semibold text-text-primary">
                  {trip.origin} → {trip.destination}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users size={20} className="text-text-tertiary mt-0.5" />
              <div>
                <div className="text-sm text-text-tertiary mb-1">Travelers</div>
                <div className="text-base font-semibold text-text-primary">
                  {trip.travelers.length}{' '}
                  {trip.travelers.length === 1 ? 'person' : 'people'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Badge
              variant={
                trip.status === 'active'
                  ? 'primary'
                  : trip.status === 'completed'
                  ? 'success'
                  : trip.status === 'cancelled'
                  ? 'error'
                  : 'default'
              }
            >
              {trip.status}
            </Badge>
            {trip.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline View */}
      <TripTimelineView
        events={timelineEvents}
        onViewEventDetails={handleViewEventDetails}
      />

      {/* Info Card */}
      <Card variant="info" padding="lg">
        <div className="space-y-2">
          <h3 className="font-semibold text-text-primary">About Timeline View</h3>
          <p className="text-sm text-text-secondary">
            This timeline shows all scheduled events for your trip in chronological order.
            You can filter by event type using the buttons above. Click on any event to view
            more details or make changes.
          </p>
          {trip.notes && (
            <div className="pt-3 mt-3 border-t border-info/20">
              <div className="text-xs text-text-tertiary mb-1">Trip Notes</div>
              <p className="text-sm text-text-secondary">{trip.notes}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
