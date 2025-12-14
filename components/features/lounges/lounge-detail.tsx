import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { LoungeAmenities } from './lounge-amenities'
import { LoungeAccess } from './lounge-access'
import { LoungeHours } from './lounge-hours'
import { MapPin, Star, Building2, Navigation } from 'lucide-react'
import type { Lounge } from '@/types'

interface LoungeDetailProps {
  lounge: Lounge
}

export function LoungeDetail({ lounge }: LoungeDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text-primary">{lounge.name}</h2>
            <div className="flex items-center gap-2 text-text-secondary">
              <MapPin className="h-4 w-4 text-text-tertiary" />
              <span>Terminal {lounge.terminal}</span>
              <span className="text-text-tertiary">•</span>
              <span>{lounge.location}</span>
            </div>
          </div>
          {lounge.rating && (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1 bg-primary-500/10 px-3 py-2 rounded-lg">
                <Star className="h-5 w-5 text-primary-500 fill-primary-500" />
                <span className="text-lg font-bold text-primary-500">
                  {lounge.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-text-tertiary">Rating</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-text-tertiary">
          <Building2 className="h-4 w-4" />
          <span>Operated by {lounge.operator}</span>
        </div>

        {lounge.capacity && (
          <p className="text-sm text-text-secondary">
            Capacity: approximately {lounge.capacity} guests
          </p>
        )}
      </div>

      <Separator />

      {/* Operating Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Operating Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <LoungeHours hours={lounge.hours} />
        </CardContent>
      </Card>

      {/* Access Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Access Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <LoungeAccess access={lounge.access} />
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <LoungeAmenities amenities={lounge.amenities} />
        </CardContent>
      </Card>

      {/* Location & Directions */}
      <Card>
        <CardHeader>
          <CardTitle>Location & Directions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 flex-shrink-0">
              <Navigation className="h-5 w-5 text-primary-500" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-text-primary">Terminal {lounge.terminal}</p>
              <p className="text-sm text-text-secondary">{lounge.location}</p>
              <p className="text-xs text-text-tertiary mt-2">
                After passing through security, follow the signs to {lounge.location}. The lounge
                entrance will be clearly marked with the operator's branding.
              </p>
            </div>
          </div>

          <div className="bg-bg-secondary rounded-lg p-4 text-center">
            <div className="h-48 flex items-center justify-center text-text-tertiary">
              <div className="space-y-2">
                <MapPin className="h-12 w-12 mx-auto opacity-50" />
                <p className="text-sm">Map view placeholder</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-text-tertiary">
            <p className="text-sm">Reviews coming soon</p>
            <p className="text-xs mt-1">Check back later for guest reviews and ratings</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
