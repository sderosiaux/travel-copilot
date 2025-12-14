import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'

interface GateBadgeProps {
  gate?: string
  terminal?: string
  className?: string
}

export function GateBadge({ gate, terminal, className }: GateBadgeProps) {
  if (!gate && !terminal) return null

  return (
    <div className={className}>
      <div className="flex items-center gap-1 text-sm text-text-secondary">
        <MapPin size={14} />
        {terminal && <span className="font-medium">T{terminal}</span>}
        {gate && terminal && <span>•</span>}
        {gate && <span>Gate {gate}</span>}
      </div>
    </div>
  )
}
