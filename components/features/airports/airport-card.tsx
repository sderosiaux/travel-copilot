'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Plane, Wifi, Coffee, ShoppingBag } from 'lucide-react'
import type { Airport } from '@/types'

interface AirportCardProps {
  airport: Airport
  showDetails?: boolean
}

export function AirportCard({ airport, showDetails = true }: AirportCardProps) {
  return (
    <Link href={`/airports/${airport.code}`} className="block">
      <Card variant="interactive" padding="md">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Plane size={20} className="text-primary-500 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-text-primary truncate">
                  {airport.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <MapPin size={16} />
                <span className="text-sm">
                  {airport.city}, {airport.country}
                </span>
              </div>
            </div>
            <Badge variant="default" className="flex-shrink-0">
              {airport.code}
            </Badge>
          </div>

          {showDetails && (
            <>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span>{airport.terminals.length} Terminal{airport.terminals.length !== 1 ? 's' : ''}</span>
                <span>•</span>
                <span>{airport.timezone}</span>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-border">
                {airport.facilities.wifi && (
                  <div className="flex items-center gap-1 text-text-tertiary" title="WiFi Available">
                    <Wifi size={16} />
                  </div>
                )}
                {airport.facilities.lounges.length > 0 && (
                  <div className="flex items-center gap-1 text-text-tertiary" title={`${airport.facilities.lounges.length} Lounges`}>
                    <Coffee size={16} />
                    <span className="text-xs">{airport.facilities.lounges.length}</span>
                  </div>
                )}
                {airport.transport.public_transport.length > 0 && (
                  <div className="flex items-center gap-1 text-text-tertiary" title="Public Transport Available">
                    <ShoppingBag size={16} />
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Button variant="primary" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </Link>
  )
}
