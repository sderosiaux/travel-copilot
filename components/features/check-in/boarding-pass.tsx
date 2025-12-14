import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Plane, Calendar, Clock, MapPin } from 'lucide-react'
import type { BoardingPass } from '@/types'

interface BoardingPassProps {
  boardingPass: BoardingPass
}

export function BoardingPassDisplay({ boardingPass }: BoardingPassProps) {
  const departureDate = new Date(boardingPass.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 text-white border-none">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm opacity-90">Passenger</p>
            <p className="text-xl font-bold">{boardingPass.passengerName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Booking Ref</p>
            <p className="text-lg font-bold tracking-wider">{boardingPass.bookingReference}</p>
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Flight Info */}
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-3xl font-bold">{boardingPass.from}</p>
            <p className="text-sm opacity-90 mt-1">Origin</p>
          </div>
          <div className="flex-1 flex items-center justify-center px-4">
            <Plane className="h-6 w-6 opacity-90" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{boardingPass.to}</p>
            <p className="text-sm opacity-90 mt-1">Destination</p>
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm opacity-90 flex items-center gap-1">
              <Plane className="h-3 w-3" />
              Flight
            </p>
            <p className="text-lg font-semibold">{boardingPass.flightNumber}</p>
          </div>
          <div>
            <p className="text-sm opacity-90 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Date
            </p>
            <p className="text-lg font-semibold">{departureDate}</p>
          </div>
          <div>
            <p className="text-sm opacity-90 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Boarding
            </p>
            <p className="text-lg font-semibold">{boardingPass.boardingTime}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Seat</p>
            <p className="text-2xl font-bold">{boardingPass.seat}</p>
          </div>
          {boardingPass.gate && (
            <div>
              <p className="text-sm opacity-90 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Gate
              </p>
              <p className="text-2xl font-bold">{boardingPass.gate}</p>
            </div>
          )}
          {boardingPass.terminal && (
            <div>
              <p className="text-sm opacity-90">Terminal</p>
              <p className="text-lg font-semibold">{boardingPass.terminal}</p>
            </div>
          )}
        </div>

        {/* Barcode */}
        <div className="mt-4 bg-white p-4 rounded">
          <div className="h-20 bg-black/10 rounded flex items-center justify-center">
            <div className="flex gap-0.5">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-black"
                  style={{ height: `${Math.random() * 60 + 20}px` }}
                />
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-black/60 mt-2 font-mono tracking-wider">
            {boardingPass.barcode}
          </p>
        </div>
      </div>
    </Card>
  )
}
