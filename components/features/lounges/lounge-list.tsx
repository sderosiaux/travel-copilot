import { LoungeCard } from './lounge-card'
import { EmptyState } from '@/components/shared/empty-state'
import { Coffee } from 'lucide-react'
import type { Lounge } from '@/types'

interface LoungeListProps {
  lounges: Lounge[]
  onViewDetails: (loungeId: string) => void
}

export function LoungeList({ lounges, onViewDetails }: LoungeListProps) {
  if (lounges.length === 0) {
    return (
      <EmptyState
        icon={<Coffee size={32} />}
        title="No lounges found"
        description="No lounges match your search criteria. Try adjusting your filters or search for a different airport."
      />
    )
  }

  // Sort by rating (highest first)
  const sortedLounges = [...lounges].sort((a, b) => {
    const ratingA = a.rating || 0
    const ratingB = b.rating || 0
    return ratingB - ratingA
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedLounges.map((lounge) => (
        <LoungeCard key={lounge.id} lounge={lounge} onViewDetails={onViewDetails} />
      ))}
    </div>
  )
}
