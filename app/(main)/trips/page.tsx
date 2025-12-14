'use client'

import { useState, useEffect } from 'react'
import { TripList } from '@/components/features/trips/trip-list'
import { AddTripDialog } from '@/components/features/trips/add-trip-dialog'
import { useTripStore } from '@/lib/store/trip-store'
import { mockTrips } from '@/data/trips'

export default function TripsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { trips, setTrips, addTrip } = useTripStore()

  useEffect(() => {
    // Load mock trips on mount
    setTrips(Object.values(mockTrips))
  }, [setTrips])

  const handleAddTrip = (tripData: {
    title: string
    destination: string
    origin: string
    startDate: string
    endDate: string
  }) => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      userId: 'user-carlos-001',
      status: 'upcoming' as const,
      title: tripData.title,
      destination: tripData.destination,
      origin: tripData.origin,
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      travelers: [
        {
          userId: 'user-carlos-001',
          role: 'primary' as const,
        },
      ],
      flights: [],
      hotels: [],
      activities: [],
      documents: [],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addTrip(newTrip)
  }

  return (
    <>
      <TripList trips={trips} onAddTrip={() => setIsAddDialogOpen(true)} />
      <AddTripDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddTrip={handleAddTrip}
      />
    </>
  )
}
