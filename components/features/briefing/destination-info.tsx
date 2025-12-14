import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { Globe, DollarSign, Languages, Zap, Car, Clock } from 'lucide-react'
import type { DestinationInfo } from '@/data/destinations'

interface DestinationInfoProps {
  destination: DestinationInfo
}

export function DestinationInfoCard({ destination }: DestinationInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Destination Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary-500/10 rounded-lg">
              <Globe className="w-5 h-5 text-primary-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary">Location</p>
              <p className="text-base font-semibold text-text-primary">
                {destination.city}, {destination.country}
              </p>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-primary-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary">Timezone</p>
              <p className="text-base font-semibold text-text-primary">
                {destination.timezone} (UTC{destination.timezoneOffset})
              </p>
            </div>
          </div>

          {/* Currency */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary-500/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary">Currency</p>
              <p className="text-base font-semibold text-text-primary">
                {destination.currency.name} ({destination.currency.symbol})
              </p>
              <p className="text-sm text-text-tertiary">Code: {destination.currency.code}</p>
            </div>
          </div>

          {/* Language */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary-500/10 rounded-lg">
              <Languages className="w-5 h-5 text-primary-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary">Language</p>
              <p className="text-base font-semibold text-text-primary">
                {destination.language.primary}
              </p>
              {destination.language.others && destination.language.others.length > 0 && (
                <p className="text-sm text-text-tertiary">
                  Also spoken: {destination.language.others.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Local Info Section */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-semibold text-text-primary mb-4">Local Information</h4>
            <div className="space-y-3">
              {/* Voltage */}
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-text-tertiary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-secondary">Power</p>
                  <p className="text-sm text-text-primary">{destination.localInfo.voltage}</p>
                </div>
              </div>

              {/* Driving */}
              <div className="flex items-start gap-3">
                <Car className="w-4 h-4 text-text-tertiary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-secondary">Driving Side</p>
                  <p className="text-sm text-text-primary capitalize">
                    {destination.localInfo.drivingSide}
                  </p>
                </div>
              </div>

              {/* Tipping */}
              <div className="flex items-start gap-3">
                <DollarSign className="w-4 h-4 text-text-tertiary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-secondary">Tipping</p>
                  <p className="text-sm text-text-primary">{destination.localInfo.tipping}</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-text-tertiary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-secondary">Business Hours</p>
                  <p className="text-sm text-text-primary">{destination.localInfo.businessHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
