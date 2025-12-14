'use client'

import { useState, useMemo } from 'react'
import { TripCard } from './trip-card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Trip } from '@/types'
import { Plus, Filter } from 'lucide-react'

interface TripListProps {
  trips: Trip[]
  onAddTrip?: () => void
}

type FilterOption = 'all' | 'upcoming' | 'past'

export function TripList({ trips, onAddTrip }: TripListProps) {
  const [filter, setFilter] = useState<FilterOption>('all')
  const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc'>('date-desc')

  const filteredAndSortedTrips = useMemo(() => {
    let filtered = [...trips]

    // Apply filter
    if (filter === 'upcoming') {
      filtered = filtered.filter(trip => trip.status === 'upcoming' || trip.status === 'active')
    } else if (filter === 'past') {
      filtered = filtered.filter(trip => trip.status === 'completed' || trip.status === 'cancelled')
    }

    // Apply sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime()
      const dateB = new Date(b.startDate).getTime()
      return sortBy === 'date-asc' ? dateA - dateB : dateB - dateA
    })

    return filtered
  }, [trips, filter, sortBy])

  const upcomingCount = trips.filter(t => t.status === 'upcoming' || t.status === 'active').length
  const pastCount = trips.filter(t => t.status === 'completed' || t.status === 'cancelled').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Trips</h1>
          <p className="text-text-secondary mt-1">
            Manage your travel itineraries and bookings
          </p>
        </div>
        <Button onClick={onAddTrip} variant="primary">
          <Plus className="h-4 w-4" />
          Add Trip
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterOption)}>
          <TabsList>
            <TabsTrigger value="all">
              All ({trips.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingCount})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSortBy(sortBy === 'date-asc' ? 'date-desc' : 'date-asc')}
        >
          <Filter className="h-4 w-4" />
          Sort: {sortBy === 'date-asc' ? 'Oldest first' : 'Newest first'}
        </Button>
      </div>

      {/* Trip Grid */}
      {filteredAndSortedTrips.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-secondary mb-4">
            <Plus className="h-8 w-8 text-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No trips found
          </h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            {filter === 'all'
              ? 'Start planning your next adventure by creating your first trip.'
              : `You have no ${filter} trips. ${filter === 'upcoming' ? 'Create a new trip to get started.' : ''}`}
          </p>
          {filter === 'all' && (
            <Button onClick={onAddTrip} variant="primary">
              <Plus className="h-4 w-4" />
              Create Your First Trip
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  )
}
