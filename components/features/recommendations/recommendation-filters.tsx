'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Compass, Plane, Star, Globe, X } from 'lucide-react'
import type { RecommendationType } from '@/types/recommendations'

interface RecommendationFiltersProps {
  selectedType: RecommendationType | 'all'
  onTypeChange: (type: RecommendationType | 'all') => void
}

export function RecommendationFilters({
  selectedType,
  onTypeChange,
}: RecommendationFiltersProps) {
  const types: Array<{ value: RecommendationType | 'all'; label: string; icon: any }> = [
    { value: 'all', label: 'All', icon: Star },
    { value: 'destination', label: 'Destinations', icon: MapPin },
    { value: 'experience', label: 'Experiences', icon: Compass },
    { value: 'airline', label: 'Airlines', icon: Plane },
    { value: 'season', label: 'Seasonal', icon: Globe },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {types.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={selectedType === value ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onTypeChange(value)}
          className="gap-2"
        >
          <Icon className="h-4 w-4" />
          {label}
          {selectedType === value && value !== 'all' && (
            <X className="h-3 w-3 ml-1" />
          )}
        </Button>
      ))}
    </div>
  )
}
