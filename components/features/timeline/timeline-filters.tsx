'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Plane,
  Hotel,
  Calendar,
  Car,
  MapPin,
  Filter,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineFiltersProps {
  selectedTypes: string[]
  onToggleType: (type: string) => void
  onClearAll: () => void
}

const EVENT_TYPES = [
  { value: 'flight', label: 'Flights', icon: Plane, color: 'text-primary-500' },
  { value: 'hotel', label: 'Hotels', icon: Hotel, color: 'text-info' },
  { value: 'activity', label: 'Activities', icon: Calendar, color: 'text-success' },
  { value: 'transfer', label: 'Transfers', icon: Car, color: 'text-warning' },
  { value: 'milestone', label: 'Milestones', icon: MapPin, color: 'text-error' },
]

export function TimelineFilters({
  selectedTypes,
  onToggleType,
  onClearAll,
}: TimelineFiltersProps) {
  const allSelected = selectedTypes.length === 0

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-bg-secondary rounded-lg border border-border">
      <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
        <Filter size={16} />
        <span>Filter by type:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {EVENT_TYPES.map((type) => {
          const Icon = type.icon
          const isSelected = allSelected || selectedTypes.includes(type.value)

          return (
            <button
              key={type.value}
              onClick={() => onToggleType(type.value)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all',
                'hover:scale-105 active:scale-95',
                isSelected
                  ? 'bg-bg-primary border-primary-500 shadow-sm'
                  : 'bg-bg-tertiary border-transparent opacity-50 hover:opacity-100'
              )}
            >
              <Icon
                size={16}
                className={cn(isSelected ? type.color : 'text-text-tertiary')}
              />
              <span
                className={cn(
                  'text-sm font-medium',
                  isSelected ? 'text-text-primary' : 'text-text-tertiary'
                )}
              >
                {type.label}
              </span>
            </button>
          )
        })}
      </div>

      {selectedTypes.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="ml-auto gap-2"
        >
          <X size={14} />
          Clear Filters
        </Button>
      )}

      {selectedTypes.length > 0 && (
        <Badge variant="primary" className="ml-2">
          {selectedTypes.length} {selectedTypes.length === 1 ? 'filter' : 'filters'} active
        </Badge>
      )}
    </div>
  )
}
