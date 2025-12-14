'use client'

import { Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'
import type { Seat, SeatMap } from '@/types/seatmap'
import { useSeatMapStore } from '@/lib/store/seatmap-store'

interface SeatGridProps {
  seatMap: SeatMap
  passengerId?: string
  passengerName?: string
}

export function SeatGrid({ seatMap, passengerId = 'passenger-1', passengerName = 'Passenger' }: SeatGridProps) {
  const { selectSeat, selectedSeats, addToComparison } = useSeatMapStore()

  const getSeatColor = (seat: Seat) => {
    switch (seat.status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600 cursor-pointer'
      case 'occupied':
        return 'bg-gray-400 cursor-not-allowed'
      case 'selected':
        return 'bg-blue-500 cursor-pointer'
      case 'extra-legroom':
        return 'bg-purple-500 hover:bg-purple-600 cursor-pointer'
      case 'blocked':
        return 'bg-red-500 cursor-not-allowed'
      default:
        return 'bg-gray-300'
    }
  }

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied' || seat.status === 'blocked') return
    selectSeat(passengerId, passengerName, seat.id)
  }

  const renderSeatRow = (row: number) => {
    const rowSeats = seatMap.seats.filter((s) => s.row === row)
    const section = seatMap.sections.find((s) => row >= s.startRow && row <= s.endRow)

    if (!section) return null

    return (
      <div key={row} className="flex items-center gap-1 mb-1">
        {/* Row number */}
        <div className="w-8 text-center text-xs font-medium text-text-secondary">
          {row}
        </div>

        {/* Seats */}
        {section.columns.map((column, index) => {
          const seat = rowSeats.find((s) => s.column === column)
          const isAisle = section.aisleAfter?.includes(column)

          return (
            <div key={column} className="flex items-center">
              {seat ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={`w-8 h-8 rounded text-xs font-medium text-white transition-colors ${getSeatColor(
                          seat
                        )}`}
                        onClick={() => handleSeatClick(seat)}
                        onDoubleClick={() => addToComparison(seat)}
                      >
                        {column}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-semibold">{seat.seatNumber}</p>
                        <p className="text-xs">
                          {seat.type} • {seat.class}
                        </p>
                        <p className="text-xs">Legroom: {seat.legroom}&quot;</p>
                        {seat.price && (
                          <p className="text-xs font-semibold">${seat.price}</p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="w-8 h-8" />
              )}
              {isAisle && <div className="w-4" />}
            </div>
          )
        })}

        {/* Row number (right side) */}
        <div className="w-8 text-center text-xs font-medium text-text-secondary">
          {row}
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{seatMap.aircraftType}</CardTitle>
            <p className="text-sm text-text-secondary mt-1">
              Flight {seatMap.flightNumber}
            </p>
          </div>
          <Badge variant="secondary">{seatMap.totalSeats} seats</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6 p-3 bg-bg-secondary rounded-lg">
          {seatMap.legend.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${item.color}`} />
              <span className="text-xs text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Seat Map */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Column headers */}
            <div className="flex items-center gap-1 mb-2">
              <div className="w-8" />
              {seatMap.sections[0]?.columns.map((column, index) => {
                const isAisle = seatMap.sections[0]?.aisleAfter?.includes(column)
                return (
                  <div key={column} className="flex items-center">
                    <div className="w-8 text-center text-xs font-medium text-text-secondary">
                      {column}
                    </div>
                    {isAisle && <div className="w-4" />}
                  </div>
                )
              })}
              <div className="w-8" />
            </div>

            {/* Sections */}
            {seatMap.sections.map((section) => (
              <div key={section.id} className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="capitalize">
                    {section.class.replace('-', ' ')}
                  </Badge>
                </div>
                {Array.from(
                  { length: section.endRow - section.startRow + 1 },
                  (_, i) => section.startRow + i
                ).map((row) => renderSeatRow(row))}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 flex items-start gap-2 p-3 bg-info-bg border border-info-border rounded-lg">
          <Info className="h-4 w-4 text-info-text mt-0.5" />
          <p className="text-xs text-info-text">
            Click to select a seat, double-click to add to comparison
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
