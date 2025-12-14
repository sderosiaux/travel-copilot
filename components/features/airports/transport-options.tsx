'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Car, Train, Bus, Plane, Hotel } from 'lucide-react'
import type { Airport } from '@/types'

interface TransportOptionsProps {
  transport: Airport['transport']
}

export function TransportOptions({ transport }: TransportOptionsProps) {
  const options = [
    {
      key: 'taxi',
      label: 'Taxi',
      icon: Car,
      available: transport.taxi,
      description: 'Taxis available outside all terminals',
    },
    {
      key: 'uber',
      label: 'Ride Share (Uber/Lyft)',
      icon: Car,
      available: transport.uber,
      description: 'Designated pickup zones for ride-sharing services',
    },
    {
      key: 'rental_car',
      label: 'Rental Cars',
      icon: Car,
      available: transport.rental_car,
      description: 'Multiple rental car companies on-site',
    },
    {
      key: 'hotel_shuttle',
      label: 'Hotel Shuttles',
      icon: Hotel,
      available: transport.hotel_shuttle,
      description: 'Free shuttles from many nearby hotels',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Ground Transportation</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {options.map((option) => {
            const Icon = option.icon
            return (
              <Card
                key={option.key}
                variant={option.available ? 'success' : 'default'}
                padding="md"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${option.available ? 'bg-success/10' : 'bg-bg-secondary'}`}>
                    <Icon size={20} className={option.available ? 'text-success' : 'text-text-tertiary'} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-text-primary">{option.label}</div>
                      <Badge variant={option.available ? 'success' : 'default'} className="text-xs">
                        {option.available ? 'Available' : 'N/A'}
                      </Badge>
                    </div>
                    {option.available && (
                      <div className="text-sm text-text-secondary">{option.description}</div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {transport.public_transport.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Public Transport</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {transport.public_transport.map((option, index) => {
              const Icon = option.toLowerCase().includes('train') || option.toLowerCase().includes('rail')
                ? Train
                : option.toLowerCase().includes('bus')
                ? Bus
                : Train
              return (
                <Card key={index} variant="info" padding="md">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-info/10">
                      <Icon size={20} className="text-info" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-text-primary">{option}</div>
                      <div className="text-sm text-text-secondary mt-1">
                        Direct connection to city center
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
