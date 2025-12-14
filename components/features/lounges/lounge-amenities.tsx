import { Badge } from '@/components/ui/badge'
import {
  Wifi,
  Droplet,
  UtensilsCrossed,
  Wine,
  Briefcase,
  Bed,
  Baby
} from 'lucide-react'
import type { Lounge } from '@/types'

interface LoungeAmenitiesProps {
  amenities: Lounge['amenities']
  compact?: boolean
}

export function LoungeAmenities({ amenities, compact = false }: LoungeAmenitiesProps) {
  const amenityList = [
    { key: 'wifi', icon: Wifi, label: 'WiFi', show: amenities.wifi },
    { key: 'showers', icon: Droplet, label: 'Showers', show: amenities.showers },
    { key: 'food', icon: UtensilsCrossed, label: getFoodLabel(amenities.food), show: true },
    { key: 'bar', icon: Wine, label: 'Bar', show: amenities.bar },
    { key: 'business_center', icon: Briefcase, label: 'Business', show: amenities.business_center },
    { key: 'sleeping_areas', icon: Bed, label: 'Sleep Pods', show: amenities.sleeping_areas },
    { key: 'kids_area', icon: Baby, label: 'Kids Area', show: amenities.kids_area },
  ].filter((a) => a.show)

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {amenityList.map((amenity) => {
          const Icon = amenity.icon
          return (
            <div
              key={amenity.key}
              className="flex items-center gap-1 text-xs text-text-tertiary"
              title={amenity.label}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {amenityList.map((amenity) => {
        const Icon = amenity.icon
        return (
          <div
            key={amenity.key}
            className="flex items-center gap-2 text-sm text-text-secondary"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10">
              <Icon className="h-4 w-4 text-primary-500" />
            </div>
            <span>{amenity.label}</span>
          </div>
        )
      })}
    </div>
  )
}

function getFoodLabel(foodType: 'snacks' | 'buffet' | 'a_la_carte'): string {
  switch (foodType) {
    case 'snacks':
      return 'Snacks'
    case 'buffet':
      return 'Buffet'
    case 'a_la_carte':
      return 'À La Carte'
  }
}
