'use client'

import { useEffect, useState } from 'react'
import {
  FlightHeader,
  FlightStatusCard,
  AirportInfo,
} from '@/components/features/flights'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { mockFlights } from '@/data/flights'
import { mockAirports } from '@/data/airports'
import { mockAirlines } from '@/data/airlines'
import {
  AlertTriangle,
  Plane,
  Clock,
  MapPin,
  Users,
  Utensils,
  Tv,
} from 'lucide-react'
import type { Flight } from '@/types'

interface FlightDetailClientProps {
  flightId: string
}

export default function FlightDetailClient({ flightId }: FlightDetailClientProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [flight, setFlight] = useState<Flight | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFlight = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const flightData = Object.values(mockFlights).find((f) => f.id === flightId)
        if (!flightData) {
          setError('Flight not found')
          return
        }

        setFlight(flightData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load flight')
      } finally {
        setIsLoading(false)
      }
    }

    loadFlight()
  }, [flightId])

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (error || !flight) {
    return (
      <div className="container mx-auto p-6">
        <Card variant="alert" padding="lg">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-error flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Error Loading Flight
              </h2>
              <p className="text-text-secondary">
                {error || 'Flight not found. Please try again later.'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const originAirport = mockAirports[flight.origin as keyof typeof mockAirports]
  const destinationAirport = mockAirports[flight.destination as keyof typeof mockAirports]
  const airline = mockAirlines[flight.airline as keyof typeof mockAirlines]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <FlightHeader
        flight={flight}
        originName={originAirport ? `${originAirport.city}, ${originAirport.country}` : flight.origin}
        destinationName={
          destinationAirport
            ? `${destinationAirport.city}, ${destinationAirport.country}`
            : flight.destination
        }
      />

      <Tabs defaultValue="status" className="space-y-6">
        <TabsList>
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="airports">Airport Info</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-6">
          <FlightStatusCard flight={flight} />
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Flight Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-text-tertiary mb-1">Flight Number</div>
                    <div className="text-lg font-semibold text-text-primary">
                      {flight.flightNumber}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-text-tertiary mb-1">Airline</div>
                    <div className="text-lg font-semibold text-text-primary">
                      {airline ? airline.name : flight.airline}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-text-tertiary mb-1">Aircraft Type</div>
                    <div className="text-lg font-semibold text-text-primary">
                      {flight.aircraftType || 'Not available'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-text-tertiary mb-1">Duration</div>
                    <div className="flex items-center gap-2">
                      <Clock size={20} className="text-text-tertiary" />
                      <div className="text-lg font-semibold text-text-primary">
                        {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
                      </div>
                    </div>
                  </div>

                  {flight.distance && (
                    <div>
                      <div className="text-sm text-text-tertiary mb-1">Distance</div>
                      <div className="flex items-center gap-2">
                        <MapPin size={20} className="text-text-tertiary" />
                        <div className="text-lg font-semibold text-text-primary">
                          {flight.distance.toLocaleString()} km
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-sm text-text-tertiary mb-1">Booking Reference</div>
                    <div className="text-lg font-semibold text-text-primary font-mono">
                      {flight.bookingReference}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                  <Users size={20} />
                  <span>Seat Assignments</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(flight.seats).map(([travelerId, seat]) => (
                    <div
                      key={travelerId}
                      className="flex items-center justify-between rounded-lg border border-border bg-bg-secondary p-3"
                    >
                      <span className="text-sm text-text-secondary">Passenger</span>
                      <Badge variant="primary">{seat}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-text-primary">
                  <Plane size={20} />
                  <span>Service Information</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-bg-secondary p-4 space-y-2">
                    <div className="flex items-center gap-2 text-text-primary font-medium">
                      <Utensils size={16} />
                      <span>Meals</span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Meal service available based on cabin class
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-bg-secondary p-4 space-y-2">
                    <div className="flex items-center gap-2 text-text-primary font-medium">
                      <Tv size={16} />
                      <span>Entertainment</span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      In-flight entertainment system available
                    </p>
                  </div>
                </div>
              </div>

              {flight.fareClass && (
                <div className="border-t border-border pt-6 space-y-2">
                  <div className="text-sm text-text-tertiary">Fare Class</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" className="text-base">
                      {flight.fareClass}
                    </Badge>
                    {flight.fareBasis && (
                      <span className="text-sm text-text-secondary font-mono">
                        ({flight.fareBasis})
                      </span>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="airports" className="space-y-6">
          <div className="space-y-6">
            {originAirport && (
              <AirportInfo
                airport={originAirport}
                type="departure"
                terminal={flight.departure.terminal}
              />
            )}
            {destinationAirport && (
              <AirportInfo
                airport={destinationAirport}
                type="arrival"
                terminal={flight.arrival.terminal}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
