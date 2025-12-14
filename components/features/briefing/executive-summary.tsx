import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Calendar, MapPin, Users, Plane } from 'lucide-react'
import type { ExecutiveSummary } from '@/lib/briefing/generate-briefing'
import { formatDate } from '@/lib/briefing/generate-briefing'

interface ExecutiveSummaryProps {
  summary: ExecutiveSummary
}

export function ExecutiveSummaryCard({ summary }: ExecutiveSummaryProps) {
  const statusVariant = {
    upcoming: 'primary' as const,
    active: 'success' as const,
    completed: 'default' as const,
    cancelled: 'error' as const,
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Executive Summary</CardTitle>
          <Badge variant={statusVariant[summary.status]}>
            {summary.status.charAt(0).toUpperCase() + summary.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Trip Title */}
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              {summary.tripTitle}
            </h3>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Destination */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary-500/10 rounded-lg">
                <MapPin className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Route</p>
                <p className="text-base font-semibold text-text-primary">
                  {summary.origin} → {summary.destination}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary-500/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Dates</p>
                <p className="text-base font-semibold text-text-primary">
                  {formatDate(summary.dates.start)}
                </p>
                <p className="text-sm text-text-secondary">
                  {summary.dates.duration} {summary.dates.duration === 1 ? 'day' : 'days'}
                </p>
              </div>
            </div>

            {/* Travelers */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary-500/10 rounded-lg">
                <Users className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Travelers</p>
                <p className="text-base font-semibold text-text-primary">
                  {summary.travelers.total} {summary.travelers.total === 1 ? 'Person' : 'People'}
                </p>
                <p className="text-sm text-text-secondary">
                  {summary.travelers.adults} adult{summary.travelers.adults !== 1 ? 's' : ''}
                  {summary.travelers.children > 0 && `, ${summary.travelers.children} child${summary.travelers.children !== 1 ? 'ren' : ''}`}
                  {summary.travelers.dependents > 0 && `, ${summary.travelers.dependents} dependent${summary.travelers.dependents !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>

            {/* Flights */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary-500/10 rounded-lg">
                <Plane className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Flights</p>
                <p className="text-base font-semibold text-text-primary">
                  Outbound & Return
                </p>
                <p className="text-sm text-text-secondary">
                  Direct flights
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
