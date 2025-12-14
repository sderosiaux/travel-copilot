'use client'

import { Info, Check, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Button } from '@/components/ui'
import type { Seat } from '@/types/seatmap'
import { useSeatMapStore } from '@/lib/store/seatmap-store'

interface SeatDetailsProps {
  passengerId?: string
  passengerName?: string
}

export function SeatDetails({
  passengerId = 'passenger-1',
  passengerName = 'Passenger',
}: SeatDetailsProps) {
  const { getSelectedSeatForPassenger, deselectSeat, addToComparison } =
    useSeatMapStore()
  const selectedSeat = getSelectedSeatForPassenger(passengerId)

  if (!selectedSeat) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Seat Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-text-secondary">
            <p>Select a seat to view details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const amenityList = [
    { key: 'power', label: 'Power Outlet', available: selectedSeat.amenities.power },
    { key: 'usb', label: 'USB Port', available: selectedSeat.amenities.usb },
    { key: 'wifi', label: 'WiFi', available: selectedSeat.amenities.wifi },
    {
      key: 'entertainment',
      label: 'Entertainment',
      available: selectedSeat.amenities.entertainment,
    },
    { key: 'recline', label: 'Recline', available: selectedSeat.amenities.recline },
    {
      key: 'extraLegroom',
      label: 'Extra Legroom',
      available: selectedSeat.amenities.extraLegroom,
    },
    { key: 'storage', label: 'Storage', available: selectedSeat.amenities.storage },
    {
      key: 'bassinet',
      label: 'Bassinet',
      available: selectedSeat.amenities.bassinet,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Seat Details</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => deselectSeat(passengerId)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Seat Info */}
        <div className="text-center p-6 bg-bg-secondary rounded-lg">
          <div className="text-4xl font-bold text-text-primary mb-2">
            {selectedSeat.seatNumber}
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="secondary" className="capitalize">
              {selectedSeat.class.replace('-', ' ')}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {selectedSeat.type}
            </Badge>
          </div>
          {selectedSeat.price && (
            <div className="text-2xl font-semibold text-accent-primary">
              ${selectedSeat.price}
            </div>
          )}
        </div>

        {/* Dimensions */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Dimensions</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-bg-secondary rounded-lg">
              <p className="text-xs text-text-secondary mb-1">Legroom</p>
              <p className="text-lg font-semibold text-text-primary">
                {selectedSeat.legroom}&quot;
              </p>
            </div>
            <div className="text-center p-3 bg-bg-secondary rounded-lg">
              <p className="text-xs text-text-secondary mb-1">Width</p>
              <p className="text-lg font-semibold text-text-primary">
                {selectedSeat.width}&quot;
              </p>
            </div>
            <div className="text-center p-3 bg-bg-secondary rounded-lg">
              <p className="text-xs text-text-secondary mb-1">Pitch</p>
              <p className="text-lg font-semibold text-text-primary">
                {selectedSeat.pitch}&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Amenities</h3>
          <div className="space-y-2">
            {amenityList.map((amenity) => (
              <div
                key={amenity.key}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-bg-secondary transition-colors"
              >
                <span className="text-sm text-text-secondary">{amenity.label}</span>
                {amenity.available ? (
                  <Check className="h-4 w-4 text-success-text" />
                ) : (
                  <X className="h-4 w-4 text-error-text" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Exit Row Warning */}
        {selectedSeat.isExitRow && (
          <div className="p-3 bg-warning-bg border border-warning-border rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-warning-text mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning-text mb-1">
                  Exit Row Requirements
                </p>
                {selectedSeat.restrictions?.map((restriction, index) => (
                  <p key={index} className="text-xs text-warning-text/80">
                    • {restriction}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={() => addToComparison(selectedSeat)}
          >
            Add to Comparison
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => deselectSeat(passengerId)}
          >
            Clear Selection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
