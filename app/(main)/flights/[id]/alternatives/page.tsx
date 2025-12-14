'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { AlternativesPanel } from '@/components/features/alternatives'
import { generateAlternatives } from '@/lib/services/alternatives-generator'
import { mockFlights } from '@/data/flights'
import { mockDisruptions } from '@/data/disruptions'
import type { Flight } from '@/types/flight'
import type { Disruption } from '@/types/disruption'
import type { AlternativeOption } from '@/types/alternative'
import {
  ArrowLeft,
  AlertTriangle,
  Plane,
  MapPin,
  Calendar,
} from 'lucide-react'

export default function FlightAlternativesPage() {
  const params = useParams()
  const router = useRouter()
  const flightId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [flight, setFlight] = useState<Flight | null>(null)
  const [disruption, setDisruption] = useState<Disruption | null>(null)
  const [alternatives, setAlternatives] = useState<AlternativeOption[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Find flight
        const flightData = Object.values(mockFlights).find((f) => f.id === flightId)
        if (!flightData) {
          setError('Flight not found')
          return
        }
        setFlight(flightData)

        // Find disruption for this flight
        const disruptionData = Object.values(mockDisruptions).find(
          (d) => d.flightId === flightId
        )
        if (!disruptionData) {
          setError('No disruption found for this flight')
          return
        }
        setDisruption(disruptionData)

        // Generate alternatives
        const alternativeOptions = generateAlternatives(disruptionData, flightData)
        setAlternatives(alternativeOptions)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load alternatives')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [flightId])

  const handleSelectOption = (option: AlternativeOption) => {
    console.log('Selected option:', option)
    // In a real app, this would trigger the booking/selection flow
    alert(`You selected: ${option.title}. This would proceed with the ${option.type} process.`)
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (error || !flight || !disruption) {
    return (
      <div className="container mx-auto p-6">
        <Card variant="alert" padding="lg">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-error flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Unable to Load Alternatives
              </h2>
              <p className="text-text-secondary mb-4">
                {error || 'Unable to load alternative options for this flight.'}
              </p>
              <Button
                variant="secondary"
                onClick={() => router.push(`/flights/${flightId}`)}
              >
                <ArrowLeft size={16} />
                Back to Flight Details
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/flights/${flightId}`)}
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-text-primary">
            Alternative Options
          </h1>
          <p className="text-text-secondary mt-1">
            Review and select the best option for your disrupted flight
          </p>
        </div>
      </div>

      {/* Flight Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <Plane size={20} className="text-text-tertiary" />
                <div>
                  <div className="text-sm text-text-tertiary">Flight</div>
                  <div className="text-lg font-semibold text-text-primary">
                    {flight.airline} {flight.flightNumber}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-text-tertiary" />
                <div>
                  <div className="text-sm text-text-tertiary">Route</div>
                  <div className="text-lg font-semibold text-text-primary">
                    {flight.origin} → {flight.destination}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-text-tertiary" />
                <div>
                  <div className="text-sm text-text-tertiary">Original Departure</div>
                  <div className="text-lg font-semibold text-text-primary">
                    {formatDateTime(flight.departure.scheduled)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 space-y-3">
              <Badge
                variant={
                  disruption.severity === 'critical'
                    ? 'error'
                    : disruption.severity === 'high'
                    ? 'warning'
                    : 'info'
                }
                className="text-sm"
              >
                {disruption.type.replace('_', ' ').toUpperCase()}
              </Badge>
              <div className="text-sm text-text-secondary">
                {disruption.details.impact}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternatives Panel */}
      <AlternativesPanel
        alternatives={alternatives}
        originalFlight={flight}
        onSelectOption={handleSelectOption}
      />

      {/* Help Card */}
      <Card variant="info" padding="lg">
        <div className="space-y-2">
          <h3 className="font-semibold text-text-primary">Need Help Deciding?</h3>
          <p className="text-sm text-text-secondary">
            Our AI Copilot has analyzed these options based on your preferences, travel
            history, and current situation. The recommended option is marked with a star.
            You can also chat with the Copilot for personalized advice.
          </p>
          <Button variant="primary" size="sm" className="mt-2">
            Ask Copilot for Advice
          </Button>
        </div>
      </Card>
    </div>
  )
}
