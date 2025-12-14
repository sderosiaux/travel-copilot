'use client'

import { useEffect } from 'react'
import { FlightList } from '@/components/features/flights'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { useFlightStore } from '@/lib/store/flight-store'
import { mockFlights } from '@/data/flights'
import { mockAirports } from '@/data/airports'
import { Plane, AlertTriangle } from 'lucide-react'

export default function FlightsPage() {
  const { flights, setFlights, isLoading, error, setLoading, setError } = useFlightStore()

  useEffect(() => {
    const loadFlights = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setFlights(Object.values(mockFlights))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load flights')
      }
    }

    loadFlights()
  }, [setFlights, setLoading, setError])

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card variant="alert" padding="lg">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-error flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Error Loading Flights
              </h2>
              <p className="text-text-secondary">
                {error || 'Something went wrong. Please try again later.'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const airportsMap = Object.entries(mockAirports).reduce(
    (acc, [code, airport]) => {
      acc[code] = {
        name: airport.name,
        city: airport.city,
        country: airport.country,
      }
      return acc
    },
    {} as Record<string, { name: string; city: string; country: string }>
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10">
            <Plane size={24} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Flights</h1>
            <p className="text-text-secondary">Track and manage your flight bookings</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <FlightList flights={flights} airports={airportsMap} isLoading={false} />
      )}
    </div>
  )
}
