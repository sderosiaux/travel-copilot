import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Plane, Clock, MapPin } from 'lucide-react'
import type { FlightSummaryItem } from '@/lib/briefing/generate-briefing'
import { formatDate, formatTime } from '@/lib/briefing/generate-briefing'

interface FlightSummaryProps {
  flights: FlightSummaryItem[]
}

export function FlightSummaryCard({ flights }: FlightSummaryProps) {
  if (flights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Flight Itinerary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">No flights scheduled</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight Itinerary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {flights.map((flight, index) => (
            <div
              key={flight.id}
              className="border-l-4 border-primary-500 pl-4 pb-6 last:pb-0"
            >
              {/* Flight Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-text-primary">
                    Flight {flight.airline} {flight.flightNumber}
                  </h3>
                </div>
                <Badge variant={flight.status === 'scheduled' ? 'default' : 'error'}>
                  {flight.status}
                </Badge>
              </div>

              {/* Flight Date */}
              <p className="text-sm text-text-secondary mb-4">
                {formatDate(flight.date)}
              </p>

              {/* Departure & Arrival */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {/* Departure */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-text-tertiary" />
                    <p className="text-sm font-medium text-text-secondary">Departure</p>
                  </div>
                  <p className="text-lg font-bold text-text-primary">
                    {flight.departure.airport}
                  </p>
                  <p className="text-base text-text-primary">
                    {formatTime(flight.departure.time)}
                  </p>
                  {flight.departure.terminal && (
                    <p className="text-sm text-text-secondary">
                      Terminal {flight.departure.terminal}
                      {flight.departure.gate && `, Gate ${flight.departure.gate}`}
                    </p>
                  )}
                </div>

                {/* Arrival */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-text-tertiary" />
                    <p className="text-sm font-medium text-text-secondary">Arrival</p>
                  </div>
                  <p className="text-lg font-bold text-text-primary">
                    {flight.arrival.airport}
                  </p>
                  <p className="text-base text-text-primary">
                    {formatTime(flight.arrival.time)}
                  </p>
                  {flight.arrival.terminal && (
                    <p className="text-sm text-text-secondary">
                      Terminal {flight.arrival.terminal}
                    </p>
                  )}
                </div>
              </div>

              {/* Flight Duration */}
              <div className="flex items-center gap-2 text-text-secondary">
                <Clock className="w-4 h-4" />
                <p className="text-sm">Flight duration: {flight.duration}</p>
              </div>

              {/* Divider between flights */}
              {index < flights.length - 1 && (
                <div className="mt-6 pt-6 border-t border-border" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
