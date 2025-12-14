'use client'

import { Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Slider } from '@/components/ui'
import { Switch } from '@/components/ui'
import { Label } from '@/components/ui'
import type { SeatClass, SeatType } from '@/types/seatmap'
import { useSeatMapStore } from '@/lib/store/seatmap-store'

export function SeatFilters() {
  const { filters, setFilters, resetFilters, getFilteredSeats } = useSeatMapStore()
  const filteredCount = getFilteredSeats().length

  const toggleClass = (seatClass: SeatClass) => {
    const newClasses = filters.classes.includes(seatClass)
      ? filters.classes.filter((c) => c !== seatClass)
      : [...filters.classes, seatClass]
    setFilters({ classes: newClasses })
  }

  const toggleType = (seatType: SeatType) => {
    const newTypes = filters.types.includes(seatType)
      ? filters.types.filter((t) => t !== seatType)
      : [...filters.types, seatType]
    setFilters({ types: newTypes })
  }

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity as any)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity as any]
    setFilters({ amenities: newAmenities })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-accent-primary" />
            <CardTitle>Filters</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          {filteredCount} seats match your criteria
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Class */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Class</Label>
          <div className="flex flex-wrap gap-2">
            {(['first', 'business', 'premium-economy', 'economy'] as SeatClass[]).map(
              (seatClass) => (
                <Badge
                  key={seatClass}
                  variant={filters.classes.includes(seatClass) ? 'default' : 'secondary'}
                  className="cursor-pointer capitalize"
                  onClick={() => toggleClass(seatClass)}
                >
                  {seatClass.replace('-', ' ')}
                </Badge>
              )
            )}
          </div>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Seat Type</Label>
          <div className="flex flex-wrap gap-2">
            {(['window', 'aisle', 'middle'] as SeatType[]).map((type) => (
              <Badge
                key={type}
                variant={filters.types.includes(type) ? 'default' : 'secondary'}
                className="cursor-pointer capitalize"
                onClick={() => toggleType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Legroom */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Min. Legroom</Label>
            <span className="text-sm text-text-secondary">
              {filters.minLegroom || 30}&quot;
            </span>
          </div>
          <Slider
            value={[filters.minLegroom || 30]}
            onValueChange={(value) => setFilters({ minLegroom: value[0] })}
            min={30}
            max={50}
            step={1}
          />
        </div>

        {/* Max Price */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Max. Price</Label>
            <span className="text-sm text-text-secondary">
              ${filters.maxPrice || 500}
            </span>
          </div>
          <Slider
            value={[filters.maxPrice || 500]}
            onValueChange={(value) => setFilters({ maxPrice: value[0] })}
            min={0}
            max={500}
            step={10}
          />
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Amenities</Label>
          <div className="space-y-2">
            {[
              { key: 'power', label: 'Power Outlet' },
              { key: 'usb', label: 'USB Port' },
              { key: 'wifi', label: 'WiFi' },
              { key: 'entertainment', label: 'Entertainment' },
              { key: 'recline', label: 'Recline' },
              { key: 'extraLegroom', label: 'Extra Legroom' },
            ].map((amenity) => (
              <div key={amenity.key} className="flex items-center justify-between">
                <Label htmlFor={amenity.key} className="text-sm font-normal">
                  {amenity.label}
                </Label>
                <Switch
                  id={amenity.key}
                  checked={filters.amenities.includes(amenity.key as any)}
                  onCheckedChange={() => toggleAmenity(amenity.key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Exit Row Only */}
        <div className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg">
          <Label htmlFor="exitRow" className="text-sm font-medium">
            Exit Row Only
          </Label>
          <Switch
            id="exitRow"
            checked={filters.exitRowOnly || false}
            onCheckedChange={(checked) => setFilters({ exitRowOnly: checked })}
          />
        </div>
      </CardContent>
    </Card>
  )
}
