'use client'

import { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AirportCard, AirportSearch } from '@/components/features/airports'
import { Skeleton } from '@/components/ui/skeleton'
import { Plane, Star, Clock, MapPin } from 'lucide-react'
import { mockAirports } from '@/data/airports'
import type { Airport } from '@/types'

export default function AirportsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>(
    Object.values(mockAirports)
  )

  const allAirports = Object.values(mockAirports)

  // Popular airports (could be based on user data, flight frequency, etc.)
  const popularAirports = useMemo(() => {
    return [mockAirports.LHR, mockAirports.JFK, mockAirports.HND]
  }, [])

  // Recent airports (would come from user history in a real app)
  const recentAirports = useMemo(() => {
    return [mockAirports.LHR, mockAirports.CDG]
  }, [])

  const handleSearch = (filtered: Airport[]) => {
    setFilteredAirports(filtered)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Plane size={32} className="text-primary-500" />
          <h1 className="text-3xl font-bold text-text-primary">Airport Navigation</h1>
        </div>
        <p className="text-text-secondary">
          Explore airport terminals, facilities, and navigation information
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <AirportSearch
            airports={allAirports}
            onSearch={handleSearch}
            placeholder="Search airports by name, code, or city..."
          />
        </CardContent>
      </Card>

      {/* Recent Airports */}
      {recentAirports.length > 0 && filteredAirports.length === allAirports.length && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-text-secondary" />
            <h2 className="text-xl font-semibold text-text-primary">Recent Airports</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentAirports.map((airport) => (
              <AirportCard key={airport.code} airport={airport} />
            ))}
          </div>
        </div>
      )}

      {/* Popular Airports */}
      {popularAirports.length > 0 && filteredAirports.length === allAirports.length && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star size={20} className="text-text-secondary" />
            <h2 className="text-xl font-semibold text-text-primary">Popular Airports</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularAirports.map((airport) => (
              <AirportCard key={airport.code} airport={airport} />
            ))}
          </div>
        </div>
      )}

      {/* All Airports / Search Results */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={20} className="text-text-secondary" />
          <h2 className="text-xl font-semibold text-text-primary">
            {filteredAirports.length === allAirports.length ? 'All Airports' : 'Search Results'}
          </h2>
          <Badge variant="default">{filteredAirports.length}</Badge>
        </div>

        {filteredAirports.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAirports.map((airport) => (
              <AirportCard key={airport.code} airport={airport} />
            ))}
          </div>
        ) : (
          <Card variant="info" padding="lg">
            <div className="text-center py-8">
              <MapPin size={48} className="mx-auto text-text-tertiary mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No airports found
              </h3>
              <p className="text-text-secondary">
                Try adjusting your search terms or browse all available airports above.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
