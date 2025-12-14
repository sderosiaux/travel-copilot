'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TripHeader } from '@/components/features/trips/trip-header'
import { TripOverview } from '@/components/features/trips/trip-overview'
import { TripTimeline } from '@/components/features/trips/trip-timeline'
import { TripFlightCard } from '@/components/features/trips/trip-flight-card'
import { DocumentCard } from '@/components/features/documents/document-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useTripStore } from '@/lib/store/trip-store'
import { mockTrips } from '@/data/trips'
import { mockFlights } from '@/data/flights'
import { mockDocuments } from '@/data/documents'
import type { Trip, Flight, Document } from '@/types'

export default function TripDetailPage() {
  const params = useParams()
  const tripId = params.id as string
  const [trip, setTrip] = useState<Trip | null>(null)
  const [flights, setFlights] = useState<Flight[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { trips, setTrips } = useTripStore()

  useEffect(() => {
    // Load mock data
    if (trips.length === 0) {
      setTrips(Object.values(mockTrips))
    }

    // Find the trip
    const foundTrip = trips.find(t => t.id === tripId) || Object.values(mockTrips).find(t => t.id === tripId)

    if (foundTrip) {
      setTrip(foundTrip)

      // Load flights for this trip
      const tripFlights = Object.values(mockFlights).filter(f =>
        foundTrip.flights.includes(f.id)
      )
      setFlights(tripFlights)

      // Load documents for this trip
      const tripDocuments = Object.values(mockDocuments).filter(d =>
        foundTrip.documents.includes(d.id)
      )
      setDocuments(tripDocuments)
    }

    setIsLoading(false)
  }, [tripId, trips, setTrips])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Trip Not Found</h2>
        <p className="text-text-secondary">The trip you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <TripHeader trip={trip} />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="flights">
            Flights ({flights.length})
          </TabsTrigger>
          <TabsTrigger value="documents">
            Documents ({documents.length})
          </TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <TripOverview trip={trip} />
        </TabsContent>

        <TabsContent value="flights" className="mt-6">
          {flights.length === 0 ? (
            <div className="text-center py-12 px-4">
              <p className="text-text-secondary">No flights added to this trip yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Flight Itinerary</h3>
                {trip.timeline && trip.timeline.length > 0 && (
                  <TripTimeline timeline={trip.timeline.filter(t => t.type === 'flight')} />
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">All Flights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flights.map((flight) => (
                    <TripFlightCard key={flight.id} flight={flight} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          {documents.length === 0 ? (
            <div className="text-center py-12 px-4">
              <p className="text-text-secondary">No documents linked to this trip yet.</p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Travel Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onClick={() => {
                      // Navigate to document detail if needed
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <div className="bg-bg-secondary rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Trip Notes</h3>
            {trip.notes ? (
              <div className="prose prose-sm max-w-none">
                <p className="text-text-secondary whitespace-pre-wrap">{trip.notes}</p>
              </div>
            ) : (
              <p className="text-text-tertiary italic">No notes added yet.</p>
            )}
          </div>

          {trip.briefing && (
            <div className="mt-6 space-y-4">
              {trip.briefing.recommendations.localTips.length > 0 && (
                <div className="bg-bg-secondary rounded-lg p-6 border border-border">
                  <h4 className="font-semibold text-text-primary mb-3">Local Tips</h4>
                  <ul className="space-y-2">
                    {trip.briefing.recommendations.localTips.map((tip, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="mt-1.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {trip.briefing.risks && trip.briefing.risks.factors.length > 0 && (
                <div className="bg-warning/10 rounded-lg p-6 border border-warning/20">
                  <h4 className="font-semibold text-text-primary mb-3">Risk Factors</h4>
                  <div className="mb-3">
                    <span className="text-xs font-medium text-text-tertiary uppercase">
                      Risk Level:
                    </span>
                    <span className={`ml-2 text-sm font-semibold ${
                      trip.briefing.risks.level === 'high' ? 'text-error' :
                      trip.briefing.risks.level === 'medium' ? 'text-warning' :
                      'text-success'
                    }`}>
                      {trip.briefing.risks.level.toUpperCase()}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {trip.briefing.risks.factors.map((factor, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="mt-1.5">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
