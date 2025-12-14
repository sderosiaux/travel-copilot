import { Badge } from '@/components/ui/badge'
import { CreditCard, Users, Plane, DollarSign } from 'lucide-react'
import type { Lounge } from '@/types'

interface LoungeAccessProps {
  access: Lounge['access']
}

export function LoungeAccess({ access }: LoungeAccessProps) {
  const hasAnyAccess =
    access.airlines.length > 0 ||
    access.alliances.length > 0 ||
    access.membershipPrograms.length > 0 ||
    access.priorityPass ||
    access.loungeKey ||
    access.dayPass?.available

  if (!hasAnyAccess) {
    return (
      <div className="text-sm text-text-tertiary">
        No access information available
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Airlines */}
      {access.airlines.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
            <Plane className="h-4 w-4" />
            <span>Airlines</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {access.airlines.map((airline) => (
              <Badge key={airline} variant="default">
                {airline}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Alliances */}
      {access.alliances.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
            <Users className="h-4 w-4" />
            <span>Alliances</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {access.alliances.map((alliance) => (
              <Badge key={alliance} variant="primary">
                {formatAlliance(alliance)}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Membership Cards */}
      {(access.priorityPass || access.loungeKey) && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
            <CreditCard className="h-4 w-4" />
            <span>Membership Cards</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {access.priorityPass && <Badge variant="success">Priority Pass</Badge>}
            {access.loungeKey && <Badge variant="success">LoungeKey</Badge>}
          </div>
        </div>
      )}

      {/* Membership Programs */}
      {access.membershipPrograms.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
            <Users className="h-4 w-4" />
            <span>Member Programs</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {access.membershipPrograms.slice(0, 3).map((program) => (
              <Badge key={program} variant="info">
                {program}
              </Badge>
            ))}
            {access.membershipPrograms.length > 3 && (
              <Badge variant="default">+{access.membershipPrograms.length - 3} more</Badge>
            )}
          </div>
        </div>
      )}

      {/* Day Pass */}
      {access.dayPass?.available && (
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
            <DollarSign className="h-4 w-4" />
            <span>Day Pass</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="warning">Available</Badge>
            {access.dayPass.price && (
              <span className="text-sm text-text-primary font-semibold">
                ${access.dayPass.price} per person
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function formatAlliance(alliance: string): string {
  switch (alliance) {
    case 'oneworld':
      return 'oneworld'
    case 'star_alliance':
      return 'Star Alliance'
    case 'skyteam':
      return 'SkyTeam'
    default:
      return alliance
  }
}
