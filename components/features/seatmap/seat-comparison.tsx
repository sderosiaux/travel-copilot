'use client'

import { X, Check, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui'
import { useSeatMapStore } from '@/lib/store/seatmap-store'

export function SeatComparison() {
  const { comparisonSeats, removeFromComparison, clearComparison, selectSeat } =
    useSeatMapStore()

  if (comparisonSeats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Seat Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-text-secondary">
            <p className="mb-2">No seats selected for comparison</p>
            <p className="text-xs">Double-click on seats in the map to compare</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const amenityKeys = [
    { key: 'power', label: 'Power Outlet' },
    { key: 'usb', label: 'USB Port' },
    { key: 'wifi', label: 'WiFi' },
    { key: 'entertainment', label: 'Entertainment' },
    { key: 'recline', label: 'Recline' },
    { key: 'extraLegroom', label: 'Extra Legroom' },
    { key: 'storage', label: 'Storage' },
  ] as const

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Seat Comparison</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearComparison}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 text-sm font-medium text-text-secondary">
                  Feature
                </th>
                {comparisonSeats.map((seat) => (
                  <th key={seat.id} className="p-2 min-w-[150px]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{seat.seatNumber}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromComparison(seat.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => selectSeat('passenger-1', 'Passenger', seat.id)}
                      >
                        Select
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Class */}
              <tr className="border-b border-border">
                <td className="p-2 text-sm text-text-secondary">Class</td>
                {comparisonSeats.map((seat) => (
                  <td key={seat.id} className="p-2 text-center">
                    <Badge variant="secondary" className="capitalize">
                      {seat.class.replace('-', ' ')}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Type */}
              <tr className="border-b border-border">
                <td className="p-2 text-sm text-text-secondary">Type</td>
                {comparisonSeats.map((seat) => (
                  <td key={seat.id} className="p-2 text-center text-sm capitalize">
                    {seat.type}
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="border-b border-border">
                <td className="p-2 text-sm text-text-secondary">Price</td>
                {comparisonSeats.map((seat) => (
                  <td key={seat.id} className="p-2 text-center">
                    <span className="font-semibold text-text-primary">
                      ${seat.price || 0}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Legroom */}
              <tr className="border-b border-border">
                <td className="p-2 text-sm text-text-secondary">Legroom</td>
                {comparisonSeats.map((seat) => (
                  <td key={seat.id} className="p-2 text-center text-sm">
                    {seat.legroom}&quot;
                  </td>
                ))}
              </tr>

              {/* Width */}
              <tr className="border-b border-border">
                <td className="p-2 text-sm text-text-secondary">Width</td>
                {comparisonSeats.map((seat) => (
                  <td key={seat.id} className="p-2 text-center text-sm">
                    {seat.width}&quot;
                  </td>
                ))}
              </tr>

              {/* Pitch */}
              <tr className="border-b border-border">
                <td className="p-2 text-sm text-text-secondary">Pitch</td>
                {comparisonSeats.map((seat) => (
                  <td key={seat.id} className="p-2 text-center text-sm">
                    {seat.pitch}&quot;
                  </td>
                ))}
              </tr>

              {/* Exit Row */}
              <tr className="border-b border-border">
                <td className="p-2 text-sm text-text-secondary">Exit Row</td>
                {comparisonSeats.map((seat) => (
                  <td key={seat.id} className="p-2 text-center">
                    {seat.isExitRow ? (
                      <Check className="h-4 w-4 text-success-text mx-auto" />
                    ) : (
                      <Minus className="h-4 w-4 text-text-tertiary mx-auto" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Amenities */}
              {amenityKeys.map(({ key, label }) => (
                <tr key={key} className="border-b border-border">
                  <td className="p-2 text-sm text-text-secondary">{label}</td>
                  {comparisonSeats.map((seat) => (
                    <td key={seat.id} className="p-2 text-center">
                      {seat.amenities[key] ? (
                        <Check className="h-4 w-4 text-success-text mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-error-text mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
