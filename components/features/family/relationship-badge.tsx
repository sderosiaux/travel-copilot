import { Badge } from '@/components/ui'
import type { FamilyMember } from '@/types'

interface RelationshipBadgeProps {
  relationship: FamilyMember['relationship']
  className?: string
}

export function RelationshipBadge({ relationship, className }: RelationshipBadgeProps) {
  const relationshipConfig: Record<
    FamilyMember['relationship'],
    { label: string; variant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' }
  > = {
    self: { label: 'Self', variant: 'primary' },
    spouse: { label: 'Spouse', variant: 'info' },
    partner: { label: 'Partner', variant: 'info' },
    child: { label: 'Child', variant: 'success' },
    parent: { label: 'Parent', variant: 'default' },
    sibling: { label: 'Sibling', variant: 'default' },
    other: { label: 'Other', variant: 'default' },
  }

  const config = relationshipConfig[relationship]

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  )
}
