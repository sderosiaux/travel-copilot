import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoungeAmenities } from './lounge-amenities'
import { MapPin, Star, CreditCard } from 'lucide-react'
import type { Lounge } from '@/types'

interface LoungeCardProps {
  lounge: Lounge
  onViewDetails: (loungeId: string) => void
}

export function LoungeCard({ lounge, onViewDetails }: LoungeCardProps) {
  return (
    <Card variant="interactive">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="text-lg font-semibold text-text-primary">{lounge.name}</h3>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <MapPin className="h-4 w-4 text-text-tertiary" />
              <span>Terminal {lounge.terminal}</span>
              <span className="text-text-tertiary">•</span>
              <span>{lounge.location}</span>
            </div>
            <p className="text-sm text-text-tertiary">Operated by {lounge.operator}</p>
          </div>
          {lounge.rating && (
            <div className="flex items-center gap-1 bg-primary-500/10 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-primary-500 fill-primary-500" />
              <span className="text-sm font-semibold text-primary-500">
                {lounge.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Access Types */}
        <div className="flex flex-wrap gap-2">
          {lounge.access.priorityPass && (
            <Badge variant="success">Priority Pass</Badge>
          )}
          {lounge.access.loungeKey && (
            <Badge variant="success">LoungeKey</Badge>
          )}
          {lounge.access.dayPass?.available && (
            <Badge variant="warning" className="flex items-center gap-1">
              <CreditCard className="h-3 w-3" />
              Day Pass ${lounge.access.dayPass.price}
            </Badge>
          )}
          {lounge.access.alliances.map((alliance) => (
            <Badge key={alliance} variant="primary">
              {alliance}
            </Badge>
          ))}
        </div>

        {/* Amenities */}
        <div className="pt-2">
          <LoungeAmenities amenities={lounge.amenities} compact />
        </div>

        {/* Hours */}
        <div className="text-sm text-text-secondary">
          <span className="text-text-tertiary">Hours: </span>
          {lounge.hours.open === '00:00' && lounge.hours.close === '23:59' ? (
            <span className="font-medium">24 Hours</span>
          ) : (
            <span className="font-medium">
              {formatTime(lounge.hours.open)} - {formatTime(lounge.hours.close)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => onViewDetails(lounge.id)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return `${displayHour}:${minutes}${ampm}`
}
