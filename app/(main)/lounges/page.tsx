'use client'

import { useState, useMemo } from 'react'
import { LoungeList, LoungeDetail, AirportSearch } from '@/components/features/lounges'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { mockAirports, additionalLounges } from '@/data'
import { Coffee, SlidersHorizontal } from 'lucide-react'
import type { Lounge } from '@/types'

export default function LoungesPage() {
  const [isLoading] = useState(false)
  const [selectedAirport, setSelectedAirport] = useState<string>('LHR')
  const [selectedLounge, setSelectedLounge] = useState<Lounge | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    priorityPass: false,
    loungeKey: false,
    dayPass: false,
    showers: false,
    food: false,
    bar: false,
  })

  // Get airport list for search
  const airportList = useMemo(() => {
    return Object.values(mockAirports).map((airport) => ({
      code: airport.code,
      name: airport.name,
      city: airport.city,
      country: airport.country,
    }))
  }, [])

  // Get lounges for selected airport
  const lounges = useMemo(() => {
    if (!selectedAirport) return []

    const airport = mockAirports[selectedAirport as keyof typeof mockAirports]
    if (!airport) return []

    // Combine airport lounges with additional lounges
    const airportLounges = airport.facilities.lounges || []
    const additionalAirportLounges = additionalLounges.filter((lounge) =>
      lounge.id.includes(selectedAirport.toLowerCase())
    )

    return [...airportLounges, ...additionalAirportLounges]
  }, [selectedAirport])

  // Apply filters
  const filteredLounges = useMemo(() => {
    return lounges.filter((lounge) => {
      if (filters.priorityPass && !lounge.access.priorityPass) return false
      if (filters.loungeKey && !lounge.access.loungeKey) return false
      if (filters.dayPass && !lounge.access.dayPass?.available) return false
      if (filters.showers && !lounge.amenities.showers) return false
      if (filters.food && lounge.amenities.food === 'snacks') return false
      if (filters.bar && !lounge.amenities.bar) return false
      return true
    })
  }, [lounges, filters])

  const handleViewDetails = (loungeId: string) => {
    const lounge = lounges.find((l) => l.id === loungeId)
    if (lounge) {
      setSelectedLounge(lounge)
    }
  }

  const hasActiveFilters = Object.values(filters).some((v) => v)

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-12 w-full max-w-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10">
              <Coffee size={24} className="text-primary-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Lounge Finder</h1>
              <p className="text-text-secondary">
                Find and access airport lounges worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <Card className="p-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 max-w-md">
              <AirportSearch
                airports={airportList}
                selectedAirport={selectedAirport}
                onSelect={setSelectedAirport}
                placeholder="Search for an airport..."
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:self-end"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 bg-primary-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {Object.values(filters).filter((v) => v).length}
                </span>
              )}
            </Button>
          </div>

          {showFilters && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium text-text-primary">Filter by Access</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="filter-pp" className="text-sm font-normal">
                      Priority Pass
                    </Label>
                    <Switch
                      id="filter-pp"
                      checked={filters.priorityPass}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, priorityPass: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="filter-lk" className="text-sm font-normal">
                      LoungeKey
                    </Label>
                    <Switch
                      id="filter-lk"
                      checked={filters.loungeKey}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, loungeKey: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="filter-dp" className="text-sm font-normal">
                      Day Pass Available
                    </Label>
                    <Switch
                      id="filter-dp"
                      checked={filters.dayPass}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, dayPass: checked }))
                      }
                    />
                  </div>
                </div>

                <h3 className="font-medium text-text-primary pt-2">Filter by Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="filter-showers" className="text-sm font-normal">
                      Showers
                    </Label>
                    <Switch
                      id="filter-showers"
                      checked={filters.showers}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, showers: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="filter-food" className="text-sm font-normal">
                      Full Food Service
                    </Label>
                    <Switch
                      id="filter-food"
                      checked={filters.food}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, food: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="filter-bar" className="text-sm font-normal">
                      Bar
                    </Label>
                    <Switch
                      id="filter-bar"
                      checked={filters.bar}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, bar: checked }))
                      }
                    />
                  </div>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setFilters({
                        priorityPass: false,
                        loungeKey: false,
                        dayPass: false,
                        showers: false,
                        food: false,
                        bar: false,
                      })
                    }
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            </>
          )}
        </Card>

        {/* Results */}
        {selectedAirport && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-primary">
                {filteredLounges.length} {filteredLounges.length === 1 ? 'Lounge' : 'Lounges'}{' '}
                at {mockAirports[selectedAirport as keyof typeof mockAirports]?.name}
              </h2>
            </div>
            <LoungeList lounges={filteredLounges} onViewDetails={handleViewDetails} />
          </div>
        )}
      </div>

      {/* Lounge Detail Dialog */}
      <Dialog open={!!selectedLounge} onOpenChange={() => setSelectedLounge(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lounge Details</DialogTitle>
          </DialogHeader>
          {selectedLounge && <LoungeDetail lounge={selectedLounge} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
