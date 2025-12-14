'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Trip } from '@/types'
import { Calendar, Clock, Plane, FileText, CloudSun, MapPin } from 'lucide-react'

interface TripOverviewProps {
  trip: Trip
}

export function TripOverview({ trip }: TripOverviewProps) {
  const startDate = new Date(trip.startDate)
  const endDate = new Date(trip.endDate)
  const now = new Date()
  const daysUntil = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-500/10">
              <Calendar className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Days Until Trip</p>
              <p className="text-2xl font-bold text-text-primary">
                {daysUntil > 0 ? daysUntil : trip.status === 'active' ? 'Now' : '-'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Clock className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Duration</p>
              <p className="text-2xl font-bold text-text-primary">
                {duration} {duration === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-info/10">
              <Plane className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Flights</p>
              <p className="text-2xl font-bold text-text-primary">
                {trip.flights.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <FileText className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Documents</p>
              <p className="text-2xl font-bold text-text-primary">
                {trip.documents.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Weather Widget */}
      {trip.briefing?.weather && (
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-info/10">
              <CloudSun className="h-6 w-6 text-info" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-2">Weather Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    <span className="font-medium">{trip.briefing.weather.destination}</span>
                  </p>
                  <p className="text-sm text-text-tertiary">
                    {trip.briefing.weather.forecast}
                  </p>
                  <p className="text-sm text-text-tertiary mt-1">
                    {trip.briefing.weather.conditions}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-text-tertiary">High</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {trip.briefing.weather.temperature.high}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">Low</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {trip.briefing.weather.temperature.low}°C
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Trip Briefing */}
      {trip.briefing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requirements */}
          <Card className="p-6">
            <h3 className="font-semibold text-text-primary mb-4">Requirements</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Visa Required</span>
                <Badge variant={trip.briefing.requirements.visa ? 'warning' : 'success'}>
                  {trip.briefing.requirements.visa ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Vaccination Required</span>
                <Badge variant={trip.briefing.requirements.vaccination ? 'warning' : 'success'}>
                  {trip.briefing.requirements.vaccination ? 'Yes' : 'No'}
                </Badge>
              </div>
              {trip.briefing.requirements.documents.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-text-tertiary mb-2">Required Documents:</p>
                  <ul className="space-y-1">
                    {trip.briefing.requirements.documents.map((doc, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-6">
            <h3 className="font-semibold text-text-primary mb-4">Recommendations</h3>
            <div className="space-y-4">
              {trip.briefing.recommendations.bestTimeToLeave && (
                <div>
                  <p className="text-xs text-text-tertiary mb-1">Best Time to Leave</p>
                  <p className="text-sm text-text-secondary">
                    {trip.briefing.recommendations.bestTimeToLeave}
                  </p>
                </div>
              )}
              {trip.briefing.recommendations.packingTips.length > 0 && (
                <div>
                  <p className="text-xs text-text-tertiary mb-2">Packing Tips:</p>
                  <ul className="space-y-1">
                    {trip.briefing.recommendations.packingTips.slice(0, 3).map((tip, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="mt-1.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Trip Notes */}
      {trip.notes && (
        <Card className="p-6">
          <h3 className="font-semibold text-text-primary mb-3">Notes</h3>
          <p className="text-sm text-text-secondary whitespace-pre-wrap">
            {trip.notes}
          </p>
        </Card>
      )}
    </div>
  )
}
