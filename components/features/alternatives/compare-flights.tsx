'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { AlternativeOption } from '@/types/alternative'
import type { Flight } from '@/types/flight'
import {
  Clock,
  MapPin,
  Plane,
  TrendingDown,
  TrendingUp,
  X,
  Calendar,
  DollarSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CompareFlightsProps {
  options: AlternativeOption[]
  originalFlight: Flight
  onClose?: () => void
}

export function CompareFlights({ options, originalFlight, onClose }: CompareFlightsProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric',
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatPrice = (price: number, currency: string = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
    }).format(price)
  }

  return (
    <Card className="bg-bg-secondary border-2 border-primary-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Flight Comparison</CardTitle>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold text-text-primary bg-bg-tertiary">
                  Feature
                </th>
                <th className="text-center p-4 font-semibold text-text-secondary bg-bg-tertiary/50">
                  Original Flight
                </th>
                {options.map((option) => (
                  <th
                    key={option.id}
                    className={cn(
                      'text-center p-4 font-semibold bg-bg-tertiary',
                      option.recommended && 'bg-success/10 text-success'
                    )}
                  >
                    {option.title}
                    {option.recommended && (
                      <Badge variant="success" className="ml-2 text-xs">
                        Best
                      </Badge>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Flight Number */}
              <tr className="border-b border-border">
                <td className="p-4 font-medium text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Plane size={16} />
                    Flight
                  </div>
                </td>
                <td className="p-4 text-center text-text-secondary">
                  {originalFlight.flightNumber}
                </td>
                {options.map((option) => (
                  <td key={option.id} className="p-4 text-center text-text-primary font-medium">
                    {option.flight?.flightNumber || 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Airline */}
              <tr className="border-b border-border bg-bg-tertiary/30">
                <td className="p-4 font-medium text-text-secondary">Airline</td>
                <td className="p-4 text-center text-text-secondary">
                  {originalFlight.airline}
                </td>
                {options.map((option) => (
                  <td key={option.id} className="p-4 text-center text-text-primary">
                    {option.provider}
                  </td>
                ))}
              </tr>

              {/* Departure Date */}
              <tr className="border-b border-border">
                <td className="p-4 font-medium text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    Departure Date
                  </div>
                </td>
                <td className="p-4 text-center text-text-secondary">
                  {formatDate(originalFlight.departure.scheduled)}
                </td>
                {options.map((option) => (
                  <td key={option.id} className="p-4 text-center text-text-primary">
                    {option.details?.departureTime
                      ? formatDate(option.details.departureTime)
                      : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Departure Time */}
              <tr className="border-b border-border bg-bg-tertiary/30">
                <td className="p-4 font-medium text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    Departure
                  </div>
                </td>
                <td className="p-4 text-center text-text-secondary">
                  {formatTime(originalFlight.departure.scheduled)}
                </td>
                {options.map((option) => (
                  <td key={option.id} className="p-4 text-center text-text-primary">
                    {option.details?.departureTime
                      ? formatTime(option.details.departureTime)
                      : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Arrival Time */}
              <tr className="border-b border-border">
                <td className="p-4 font-medium text-text-secondary">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    Arrival
                  </div>
                </td>
                <td className="p-4 text-center text-text-secondary">
                  {formatTime(originalFlight.arrival.scheduled)}
                </td>
                {options.map((option) => (
                  <td key={option.id} className="p-4 text-center text-text-primary">
                    {option.details?.arrivalTime
                      ? formatTime(option.details.arrivalTime)
                      : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Duration */}
              <tr className="border-b border-border bg-bg-tertiary/30">
                <td className="p-4 font-medium text-text-secondary">Duration</td>
                <td className="p-4 text-center text-text-secondary">
                  {formatDuration(originalFlight.duration)}
                </td>
                {options.map((option) => (
                  <td key={option.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-text-primary">
                        {option.details?.duration
                          ? formatDuration(option.details.duration)
                          : 'N/A'}
                      </span>
                      {option.details?.duration &&
                        option.details.duration > originalFlight.duration && (
                          <TrendingUp size={14} className="text-warning" />
                        )}
                      {option.details?.duration &&
                        option.details.duration < originalFlight.duration && (
                          <TrendingDown size={14} className="text-success" />
                        )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Stops */}
              <tr className="border-b border-border">
                <td className="p-4 font-medium text-text-secondary">Stops</td>
                <td className="p-4 text-center text-text-secondary">
                  {originalFlight.layovers?.length || 0}
                </td>
                {options.map((option) => (
                  <td key={option.id} className="p-4 text-center text-text-primary">
                    {option.details?.stops ?? 0}
                  </td>
                ))}
              </tr>

              {/* Cabin Class */}
              <tr className="border-b border-border bg-bg-tertiary/30">
                <td className="p-4 font-medium text-text-secondary">Cabin Class</td>
                <td className="p-4 text-center text-text-secondary">
                  {originalFlight.fareClass || 'Economy'}
                </td>
                {options.map((option) => (
                  <td key={option.id} className="p-4 text-center">
                    <Badge variant="primary" className="text-xs">
                      {option.details?.cabinClass || 'Economy'}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="border-b border-border">
                <td className="p-4 font-medium text-text-secondary">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    Price
                  </div>
                </td>
                <td className="p-4 text-center text-text-secondary">-</td>
                {options.map((option) => (
                  <td key={option.id} className="p-4 text-center">
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-text-primary">
                        {option.price !== undefined
                          ? formatPrice(option.price, option.currency)
                          : 'N/A'}
                      </div>
                      {option.priceDifference !== undefined &&
                        option.priceDifference !== 0 && (
                          <div
                            className={cn(
                              'text-xs font-medium',
                              option.priceDifference > 0 ? 'text-error' : 'text-success'
                            )}
                          >
                            {option.priceDifference > 0 ? '+' : ''}
                            {formatPrice(option.priceDifference, option.currency)}
                          </div>
                        )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Seats Available */}
              <tr className="border-b border-border bg-bg-tertiary/30">
                <td className="p-4 font-medium text-text-secondary">Seats Available</td>
                <td className="p-4 text-center text-text-secondary">-</td>
                {options.map((option) => (
                  <td key={option.id} className="p-4 text-center text-text-primary">
                    {option.details?.seatsAvailable || 'Unknown'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-bg-tertiary rounded-lg">
          <h4 className="font-semibold text-text-primary mb-3">Quick Summary</h4>
          <div className="grid gap-3 md:grid-cols-3">
            {options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  'p-3 rounded border',
                  option.recommended
                    ? 'border-success bg-success/5'
                    : 'border-border bg-bg-primary'
                )}
              >
                <div className="font-medium text-text-primary mb-2">{option.title}</div>
                <ul className="text-xs text-text-secondary space-y-1">
                  {option.pros.slice(0, 2).map((pro, idx) => (
                    <li key={idx}>• {pro}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
