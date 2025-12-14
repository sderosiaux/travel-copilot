import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Wifi, Coffee, ShoppingBag, Train, Car, Info } from 'lucide-react'
import type { Airport } from '@/types'

interface AirportInfoProps {
  airport: Airport
  type: 'departure' | 'arrival'
  terminal?: string
}

export function AirportInfo({ airport, type, terminal }: AirportInfoProps) {
  const relevantTerminal = terminal
    ? airport.terminals.find((t) => t.id === terminal || t.name.includes(terminal))
    : null

  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="default">{airport.code}</Badge>
            <CardTitle className="text-lg">{airport.name}</CardTitle>
          </div>
          <div className="flex items-center gap-1 text-sm text-text-secondary">
            <MapPin size={14} />
            <span>
              {airport.city}, {airport.country}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {relevantTerminal && (
          <div className="rounded-lg border border-border bg-bg-secondary p-4 space-y-3">
            <div className="font-medium text-text-primary">{relevantTerminal.name}</div>
            <div className="space-y-2">
              <div className="text-sm text-text-secondary">
                <span className="font-medium">Gates:</span> {relevantTerminal.gates.join(', ')}
              </div>
              <div className="flex flex-wrap gap-1">
                {relevantTerminal.facilities.map((facility) => (
                  <Badge key={facility} variant="default" className="text-xs">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="font-medium text-text-primary">Facilities</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {airport.facilities.wifi && (
              <div className="flex items-center gap-2 text-sm">
                <Wifi size={16} className="text-text-tertiary" />
                <span>Free Wi-Fi</span>
              </div>
            )}
            {airport.facilities.lounges.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Coffee size={16} className="text-text-tertiary" />
                <span>{airport.facilities.lounges.length} Lounges</span>
              </div>
            )}
            {airport.facilities.fastTrack && (
              <div className="flex items-center gap-2 text-sm">
                <ShoppingBag size={16} className="text-text-tertiary" />
                <span>Fast Track Security</span>
              </div>
            )}
            {airport.facilities.prayer_rooms && (
              <div className="flex items-center gap-2 text-sm">
                <Info size={16} className="text-text-tertiary" />
                <span>Prayer Rooms</span>
              </div>
            )}
            {airport.facilities.nursing_rooms && (
              <div className="flex items-center gap-2 text-sm">
                <Info size={16} className="text-text-tertiary" />
                <span>Nursing Rooms</span>
              </div>
            )}
            {airport.facilities.medical && (
              <div className="flex items-center gap-2 text-sm">
                <Info size={16} className="text-text-tertiary" />
                <span>Medical Services</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="font-medium text-text-primary">Transport Options</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {airport.transport.taxi && (
              <div className="flex items-center gap-2 text-sm">
                <Car size={16} className="text-text-tertiary" />
                <span>Taxi</span>
              </div>
            )}
            {airport.transport.uber && (
              <div className="flex items-center gap-2 text-sm">
                <Car size={16} className="text-text-tertiary" />
                <span>Ride-sharing</span>
              </div>
            )}
            {airport.transport.public_transport.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <Train size={16} className="flex-shrink-0 text-text-tertiary mt-0.5" />
                <div className="space-y-1">
                  {airport.transport.public_transport.map((option) => (
                    <div key={option}>{option}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {airport.facilities.lounges.length > 0 && (
          <div className="space-y-4">
            <div className="font-medium text-text-primary">Available Lounges</div>
            <div className="space-y-3">
              {airport.facilities.lounges.slice(0, 3).map((lounge) => (
                <div
                  key={lounge.id}
                  className="rounded-lg border border-border bg-bg-secondary p-3 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-sm">{lounge.name}</div>
                    {lounge.rating && (
                      <Badge variant="primary" className="text-xs">
                        {lounge.rating}★
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {lounge.terminal} • {lounge.location}
                  </div>
                  <div className="text-xs text-text-secondary">
                    Hours: {lounge.hours.open} - {lounge.hours.close}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border border-border bg-bg-secondary p-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <MapPin size={14} />
            <span>Terminal map and detailed directions available at the airport</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
