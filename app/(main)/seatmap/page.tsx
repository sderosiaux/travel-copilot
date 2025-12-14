'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui'
import { SeatGrid } from '@/components/features/seatmap/seat-grid'
import { SeatFilters } from '@/components/features/seatmap/seat-filters'
import { SeatComparison } from '@/components/features/seatmap/seat-comparison'
import { SeatDetails } from '@/components/features/seatmap/seat-details'
import { useSeatMapStore } from '@/lib/store/seatmap-store'

export default function SeatMapPage() {
  const {
    seatMaps,
    selectedSeatMapId,
    selectSeatMap,
    getSelectedSeatMap,
    getTotalSelectionPrice,
    clearAllSelections,
  } = useSeatMapStore()

  const selectedSeatMap = getSelectedSeatMap()
  const totalPrice = getTotalSelectionPrice()

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Seat Map Viewer</h1>
        <p className="text-text-secondary">
          View seat maps, compare seats, and select your preferred seating
        </p>
      </div>

      {/* Flight Selection */}
      <div className="flex items-center gap-4 p-4 bg-bg-secondary rounded-lg">
        <div className="flex-1">
          <label className="text-sm font-medium text-text-primary mb-2 block">
            Select Flight
          </label>
          <Select value={selectedSeatMapId || ''} onValueChange={selectSeatMap}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a flight" />
            </SelectTrigger>
            <SelectContent>
              {seatMaps.map((seatMap) => (
                <SelectItem key={seatMap.id} value={seatMap.id}>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{seatMap.flightNumber}</span>
                    <span className="text-text-secondary">•</span>
                    <span className="text-text-secondary">{seatMap.aircraftType}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {totalPrice > 0 && (
          <div className="text-right">
            <p className="text-sm text-text-secondary mb-1">Total Selection</p>
            <p className="text-2xl font-bold text-accent-primary">${totalPrice}</p>
          </div>
        )}
      </div>

      {selectedSeatMap ? (
        <>
          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="xl:col-span-1 space-y-6">
              <SeatFilters />
              <SeatDetails />
            </div>

            {/* Center - Seat Map */}
            <div className="xl:col-span-3">
              <SeatGrid seatMap={selectedSeatMap} />
            </div>
          </div>

          {/* Seat Comparison */}
          <SeatComparison />

          {/* Actions */}
          <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
            <div>
              <p className="text-sm text-text-secondary">
                Click seats to select, double-click to compare
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={clearAllSelections}>
                Clear Selections
              </Button>
              <Button disabled={totalPrice === 0}>
                Confirm Selection (${totalPrice})
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-secondary text-lg mb-4">
            No seat map selected
          </p>
          <p className="text-text-tertiary">
            Select a flight above to view the seat map
          </p>
        </div>
      )}
    </div>
  )
}
