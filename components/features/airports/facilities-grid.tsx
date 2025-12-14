'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Wifi,
  Coffee,
  ShoppingBag,
  Shield,
  Stamp,
  Baby,
  Heart,
  Package,
  Sofa,
  Zap,
} from 'lucide-react'
import type { Airport } from '@/types'

interface FacilitiesGridProps {
  facilities: Airport['facilities']
}

const facilityIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  wifi: Wifi,
  lounges: Coffee,
  fastTrack: Zap,
  prayer_rooms: Sofa,
  nursing_rooms: Baby,
  pet_relief: Heart,
  medical: Heart,
  baggage_storage: Package,
}

export function FacilitiesGrid({ facilities }: FacilitiesGridProps) {
  const facilityList = [
    { key: 'wifi', label: 'Free WiFi', available: facilities.wifi },
    { key: 'lounges', label: 'Airport Lounges', available: facilities.lounges.length > 0, count: facilities.lounges.length },
    { key: 'fastTrack', label: 'Fast Track Security', available: facilities.fastTrack },
    { key: 'prayer_rooms', label: 'Prayer Rooms', available: facilities.prayer_rooms },
    { key: 'nursing_rooms', label: 'Nursing Rooms', available: facilities.nursing_rooms },
    { key: 'pet_relief', label: 'Pet Relief Areas', available: facilities.pet_relief },
    { key: 'medical', label: 'Medical Services', available: facilities.medical },
    { key: 'baggage_storage', label: 'Baggage Storage', available: facilities.baggage_storage },
  ]

  const availableFacilities = facilityList.filter((f) => f.available)
  const unavailableFacilities = facilityList.filter((f) => !f.available)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Available Facilities</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableFacilities.map((facility) => {
            const Icon = facilityIcons[facility.key] || ShoppingBag
            return (
              <Card key={facility.key} variant="success" padding="md">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Icon size={20} className="text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{facility.label}</div>
                    {facility.count !== undefined && facility.count > 0 && (
                      <div className="text-sm text-text-secondary mt-1">
                        {facility.count} available
                      </div>
                    )}
                  </div>
                  <Badge variant="success" className="text-xs">
                    Available
                  </Badge>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {unavailableFacilities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Not Available</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {unavailableFacilities.map((facility) => {
              const Icon = facilityIcons[facility.key] || ShoppingBag
              return (
                <Card key={facility.key} padding="md">
                  <div className="flex items-start gap-3 opacity-60">
                    <div className="p-2 rounded-lg bg-bg-secondary">
                      <Icon size={20} className="text-text-tertiary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-text-secondary">{facility.label}</div>
                    </div>
                    <Badge variant="default" className="text-xs">
                      N/A
                    </Badge>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
