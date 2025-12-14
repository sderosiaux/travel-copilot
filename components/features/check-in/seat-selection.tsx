import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SeatSelectionProps {
  selectedSeats: { [passengerId: string]: string }
  onSeatSelect?: (passengerId: string, seat: string) => void
}

export function SeatSelection({ selectedSeats, onSeatSelect }: SeatSelectionProps) {
  // Simple seat map mockup
  const rows = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const columns = ['A', 'B', 'C', '', 'D', 'E', 'F']

  const isOccupied = (seat: string) => {
    return Math.random() > 0.6 // Mock some seats as occupied
  }

  const isSelected = (seat: string) => {
    return Object.values(selectedSeats).includes(seat)
  }

  return (
    <Card>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Seat Selection</h3>
          <p className="text-sm text-text-secondary">
            Select your preferred seats. Current selections are highlighted.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-bg-secondary border border-border" />
            <span className="text-text-tertiary">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-primary-500" />
            <span className="text-text-tertiary">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-bg-tertiary border border-border opacity-50" />
            <span className="text-text-tertiary">Occupied</span>
          </div>
        </div>

        {/* Seat Map */}
        <div className="space-y-2 max-w-md mx-auto">
          {/* Plane front indicator */}
          <div className="text-center text-xs text-text-tertiary mb-4">
            <div className="inline-block px-4 py-1 bg-bg-secondary rounded-full">
              Front of Aircraft
            </div>
          </div>

          {rows.map((row) => (
            <div key={row} className="flex items-center gap-1.5 justify-center">
              <div className="w-8 text-xs text-text-tertiary text-center font-mono">{row}</div>
              {columns.map((col, idx) => {
                if (col === '') {
                  return <div key={idx} className="w-6" />
                }
                const seat = `${row}${col}`
                const occupied = isOccupied(seat)
                const selected = isSelected(seat)

                return (
                  <button
                    key={col}
                    disabled={occupied}
                    className={cn(
                      'w-7 h-7 rounded text-xs font-medium transition-all',
                      selected && 'bg-primary-500 text-white',
                      !selected && !occupied && 'bg-bg-secondary border border-border hover:bg-bg-tertiary',
                      occupied && 'bg-bg-tertiary border border-border opacity-50 cursor-not-allowed'
                    )}
                  >
                    {col}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-text-tertiary text-center">
            This is a simplified seat map. Full seat selection with pricing will be available during check-in.
          </p>
        </div>
      </div>
    </Card>
  )
}
