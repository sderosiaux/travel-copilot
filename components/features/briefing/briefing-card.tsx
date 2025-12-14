import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { Badge, Button } from '@/components/ui'
import { MapPin, Calendar, Users, FileText, ChevronRight } from 'lucide-react'
import type { Trip } from '@/types'
import { formatDate } from '@/lib/briefing/generate-briefing'
import Link from 'next/link'

interface BriefingCardProps {
  trip: Trip
}

export function BriefingCard({ trip }: BriefingCardProps) {
  const statusVariant = {
    upcoming: 'primary' as const,
    active: 'success' as const,
    completed: 'default' as const,
    cancelled: 'error' as const,
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{trip.title}</CardTitle>
              <Badge variant={statusVariant[trip.status]}>
                {trip.status}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Trip Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-text-tertiary" />
              <span className="text-text-secondary">
                {trip.origin} → {trip.destination}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-text-tertiary" />
              <span className="text-text-secondary">
                {formatDate(trip.startDate)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-text-tertiary" />
              <span className="text-text-secondary">
                {trip.travelers.length} traveler{trip.travelers.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-text-tertiary" />
              <span className="text-text-secondary">
                {trip.flights.length} flight{trip.flights.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Briefing Summary */}
          {trip.briefing && (
            <div className="pt-3 border-t border-border">
              <p className="text-sm text-text-secondary line-clamp-2">
                {trip.briefing.overview}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <Link href={`/briefing/${trip.id}`}>
              <Button variant="primary" className="w-full group">
                <span>View Full Briefing</span>
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
