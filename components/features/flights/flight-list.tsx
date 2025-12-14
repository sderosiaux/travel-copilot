'use client'

import { useState, useMemo } from 'react'
import { FlightCard } from './flight-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Plane, Filter } from 'lucide-react'
import type { Flight, FlightStatus } from '@/types'

interface FlightListProps {
  flights: Flight[]
  airports: Record<string, { name: string; city: string; country: string }>
  isLoading?: boolean
}

type FilterStatus = 'all' | FlightStatus

export function FlightList({ flights, airports, isLoading }: FlightListProps) {
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('all')

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

  const { upcomingFlights, todayFlights, pastFlights } = useMemo(() => {
    const filtered =
      selectedStatus === 'all'
        ? flights
        : flights.filter((flight) => flight.status === selectedStatus)

    const upcoming = filtered
      .filter((flight) => {
        const departureDate = new Date(flight.departure.scheduled)
        return (
          departureDate > now &&
          flight.status !== 'arrived' &&
          flight.status !== 'cancelled'
        )
      })
      .sort(
        (a, b) =>
          new Date(a.departure.scheduled).getTime() -
          new Date(b.departure.scheduled).getTime()
      )

    const todayItems = filtered
      .filter((flight) => {
        const departureDate = new Date(flight.departure.scheduled)
        return departureDate >= today && departureDate < tomorrow
      })
      .sort(
        (a, b) =>
          new Date(a.departure.scheduled).getTime() -
          new Date(b.departure.scheduled).getTime()
      )

    const past = filtered
      .filter((flight) => {
        const departureDate = new Date(flight.departure.scheduled)
        return (
          departureDate < now &&
          (flight.status === 'arrived' || flight.status === 'cancelled')
        )
      })
      .sort(
        (a, b) =>
          new Date(b.departure.scheduled).getTime() -
          new Date(a.departure.scheduled).getTime()
      )

    return { upcomingFlights: upcoming, todayFlights: todayItems, pastFlights: past }
  }, [flights, selectedStatus, now, today, tomorrow])

  const filterOptions: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'arrived', label: 'Arrived' },
  ]

  if (isLoading) {
    return (
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
    )
  }

  const getAirportName = (code: string) => {
    const airport = airports[code]
    return airport ? `${airport.city}, ${airport.country}` : code
  }

  const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-secondary mb-4">
        <Plane size={32} className="text-text-tertiary" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-md">{description}</p>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={16} className="text-text-tertiary" />
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedStatus === option.value ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedStatus(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {todayFlights.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Today</h2>
          <div className="space-y-4">
            {todayFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                originName={getAirportName(flight.origin)}
                destinationName={getAirportName(flight.destination)}
              />
            ))}
          </div>
        </div>
      )}

      {upcomingFlights.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Upcoming</h2>
          <div className="space-y-4">
            {upcomingFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                originName={getAirportName(flight.origin)}
                destinationName={getAirportName(flight.destination)}
              />
            ))}
          </div>
        </div>
      )}

      {pastFlights.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Past Flights</h2>
          <div className="space-y-4">
            {pastFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                originName={getAirportName(flight.origin)}
                destinationName={getAirportName(flight.destination)}
              />
            ))}
          </div>
        </div>
      )}

      {upcomingFlights.length === 0 &&
        todayFlights.length === 0 &&
        pastFlights.length === 0 && (
          <EmptyState
            title="No flights found"
            description={
              selectedStatus === 'all'
                ? 'You have no flights scheduled. Add a flight to get started.'
                : `No ${selectedStatus} flights found. Try changing your filter.`
            }
          />
        )}
    </div>
  )
}
