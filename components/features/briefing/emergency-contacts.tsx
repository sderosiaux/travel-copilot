import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { Phone, Ambulance, ShieldAlert, Building2 } from 'lucide-react'
import type { DestinationInfo } from '@/data/destinations'

interface EmergencyContactsProps {
  destination: DestinationInfo
}

export function EmergencyContactsCard({ destination }: EmergencyContactsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Police */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-error/10 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-error" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary">Police</p>
              <a
                href={`tel:${destination.emergency.police}`}
                className="text-lg font-bold text-text-primary hover:text-primary-500 transition-colors"
              >
                {destination.emergency.police}
              </a>
            </div>
          </div>

          {/* Ambulance */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-error/10 rounded-lg">
              <Ambulance className="w-5 h-5 text-error" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary">Ambulance</p>
              <a
                href={`tel:${destination.emergency.ambulance}`}
                className="text-lg font-bold text-text-primary hover:text-primary-500 transition-colors"
              >
                {destination.emergency.ambulance}
              </a>
            </div>
          </div>

          {/* Fire */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-error/10 rounded-lg">
              <Phone className="w-5 h-5 text-error" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary">Fire Service</p>
              <a
                href={`tel:${destination.emergency.fire}`}
                className="text-lg font-bold text-text-primary hover:text-primary-500 transition-colors"
              >
                {destination.emergency.fire}
              </a>
            </div>
          </div>

          {/* Embassy */}
          {destination.emergency.embassy && (
            <>
              <div className="my-4 border-t border-border" />
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-500/10 rounded-lg">
                  <Building2 className="w-5 h-5 text-primary-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-secondary">
                    {destination.emergency.embassy.name}
                  </p>
                  <a
                    href={`tel:${destination.emergency.embassy.phone}`}
                    className="text-base font-bold text-text-primary hover:text-primary-500 transition-colors block mb-1"
                  >
                    {destination.emergency.embassy.phone}
                  </a>
                  <p className="text-sm text-text-tertiary">
                    {destination.emergency.embassy.address}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Important Notice */}
          <div className="mt-6 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-xs text-text-secondary">
              Save these numbers in your phone before traveling. In case of emergency, always call
              local emergency services first.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
