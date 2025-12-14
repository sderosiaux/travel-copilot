'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Map, MapPin, Navigation } from 'lucide-react'
import type { Airport } from '@/types'

interface AirportMapProps {
  airport: Airport
}

export function AirportMap({ airport }: AirportMapProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Map size={24} className="text-primary-500" />
          <CardTitle>Airport Map</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg overflow-hidden">
          {/* Placeholder map visualization */}
          <div className="aspect-video flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-primary-500/10">
                  <MapPin size={48} className="text-primary-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Interactive Map Coming Soon
                </h3>
                <p className="text-sm text-text-secondary max-w-md mx-auto">
                  Detailed terminal maps with gate locations, facilities, and navigation routes will be available here.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center pt-4">
                {airport.terminals.map((terminal) => (
                  <Badge key={terminal.id} variant="primary">
                    {terminal.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Map legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="text-xs font-semibold text-text-primary mb-2">Legend</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <Navigation size={12} className="text-primary-500" />
                <span className="text-text-secondary">Gates</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-success" />
                <span className="text-text-secondary">Facilities</span>
              </div>
              <div className="flex items-center gap-2">
                <Map size={12} className="text-info" />
                <span className="text-text-secondary">Services</span>
              </div>
            </div>
          </div>

          {/* Coordinates display */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <div className="text-xs text-text-secondary">
              {airport.coordinates.latitude.toFixed(4)}, {airport.coordinates.longitude.toFixed(4)}
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-text-secondary">
          <p>
            Use the gate finder above to calculate walking times between gates, or explore individual terminal maps in the Terminals section.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
