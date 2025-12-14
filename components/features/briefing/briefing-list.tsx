import { BriefingCard } from './briefing-card'
import { Skeleton } from '@/components/ui'
import { FileText } from 'lucide-react'
import type { Trip } from '@/types'

interface BriefingListProps {
  trips: Trip[]
  isLoading?: boolean
}

export function BriefingList({ trips, isLoading }: BriefingListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (trips.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No Briefings Available
        </h3>
        <p className="text-text-secondary">
          Briefings will appear here for your upcoming and active trips.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map(trip => (
        <BriefingCard key={trip.id} trip={trip} />
      ))}
    </div>
  )
}
