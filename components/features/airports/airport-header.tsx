'use client'

import { Badge } from '@/components/ui/badge'
import { MapPin, Globe, Clock } from 'lucide-react'
import type { Airport } from '@/types'

interface AirportHeaderProps {
  airport: Airport
}

export function AirportHeader({ airport }: AirportHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl p-6 md:p-8 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="default" className="bg-white/20 text-white border-white/30">
              {airport.code}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold">{airport.name}</h1>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-white/90">
              <MapPin size={18} />
              <span className="text-base">
                {airport.city}, {airport.country}
              </span>
            </div>

            <div className="flex items-center gap-2 text-white/90">
              <Clock size={18} />
              <span className="text-base">{airport.timezone}</span>
            </div>

            <div className="flex items-center gap-2 text-white/90">
              <Globe size={18} />
              <span className="text-base">
                {airport.coordinates.latitude.toFixed(4)}, {airport.coordinates.longitude.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <div className="text-sm text-white/80">Terminals</div>
          <div className="text-3xl font-bold">{airport.terminals.length}</div>
        </div>
      </div>
    </div>
  )
}
