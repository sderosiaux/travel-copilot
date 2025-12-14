'use client'

import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AirportHeader,
  TerminalList,
  FacilitiesGrid,
  TransportOptions,
  GateFinder,
  AirportMap,
  WalkingTime,
} from '@/components/features/airports'
import { mockAirports } from '@/data/airports'
import { AlertTriangle, Info, Clock, CloudSun } from 'lucide-react'
import type { Airport } from '@/types'

interface AirportDetailClientProps {
  airportCode: string
}

export default function AirportDetailClient({ airportCode }: AirportDetailClientProps) {
  const code = airportCode.toUpperCase()
  const [isLoading, setIsLoading] = useState(true)
  const [airport, setAirport] = useState<Airport | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAirport = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const airportData = mockAirports[code as keyof typeof mockAirports]
        if (!airportData) {
          setError('Airport not found')
          return
        }

        setAirport(airportData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load airport')
      } finally {
        setIsLoading(false)
      }
    }

    loadAirport()
  }, [code])

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (error || !airport) {
    return (
      <div className="container mx-auto p-6">
        <Card variant="alert" padding="lg">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-error flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Error Loading Airport
              </h2>
              <p className="text-text-secondary">
                {error || 'Airport not found. Please try again later.'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Mock security/immigration wait times (would be real-time in production)
  const securityWaitTime: 'low' | 'medium' | 'high' = 'medium'
  const immigrationWaitTime: 'low' | 'medium' | 'high' = 'low'

  return (
    <div className="container mx-auto p-6 space-y-6">
      <AirportHeader airport={airport} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="terminals">Terminals</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Key Statistics */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Info size={20} className="text-primary-500" />
                  <CardTitle>Key Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-text-tertiary">IATA Code</div>
                    <Badge variant="primary" className="text-base">
                      {airport.code}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-text-tertiary">Terminals</div>
                    <div className="text-2xl font-bold text-text-primary">
                      {airport.terminals.length}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-text-tertiary">Lounges</div>
                    <div className="text-2xl font-bold text-text-primary">
                      {airport.facilities.lounges.length}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-text-tertiary">Timezone</div>
                    <div className="text-sm font-medium text-text-primary">
                      {airport.timezone}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-text-tertiary mb-2">Coordinates</div>
                  <div className="text-sm font-mono text-text-primary">
                    {airport.coordinates.latitude.toFixed(4)}, {airport.coordinates.longitude.toFixed(4)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Placeholder */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CloudSun size={20} className="text-primary-500" />
                  <CardTitle>Current Conditions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CloudSun size={48} className="mx-auto text-text-tertiary mb-4" />
                  <p className="text-text-secondary">
                    Weather information coming soon
                  </p>
                  <p className="text-sm text-text-tertiary mt-2">
                    Real-time weather data and forecasts will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Wait Times */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-primary-500" />
                <CardTitle>Current Wait Times</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <WalkingTime
                  from="Check-in"
                  to="Security"
                  minutes={5}
                  estimatedWaitTime={securityWaitTime}
                  type="security"
                />
                <WalkingTime
                  from="Security"
                  to="Immigration"
                  minutes={3}
                  estimatedWaitTime={immigrationWaitTime}
                  type="immigration"
                />
              </div>
              <div className="text-xs text-text-tertiary bg-bg-secondary rounded p-2">
                Wait times are estimated based on current traffic and historical data. Actual times may vary.
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card variant="interactive" padding="md">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary-500">
                  {airport.terminals.length}
                </div>
                <div className="text-sm font-medium text-text-primary">Terminals</div>
                <div className="text-xs text-text-secondary">View terminal details</div>
              </div>
            </Card>
            <Card variant="interactive" padding="md">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary-500">
                  {airport.facilities.lounges.length}
                </div>
                <div className="text-sm font-medium text-text-primary">Lounges</div>
                <div className="text-xs text-text-secondary">Explore lounge access</div>
              </div>
            </Card>
            <Card variant="interactive" padding="md">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary-500">
                  {airport.transport.public_transport.length}
                </div>
                <div className="text-sm font-medium text-text-primary">Transport Options</div>
                <div className="text-xs text-text-secondary">Getting to/from airport</div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Terminals Tab */}
        <TabsContent value="terminals">
          <TerminalList terminals={airport.terminals} />
        </TabsContent>

        {/* Facilities Tab */}
        <TabsContent value="facilities">
          <FacilitiesGrid facilities={airport.facilities} />
        </TabsContent>

        {/* Transport Tab */}
        <TabsContent value="transport">
          <TransportOptions transport={airport.transport} />
        </TabsContent>

        {/* Navigation Tab */}
        <TabsContent value="navigation" className="space-y-6">
          <GateFinder terminals={airport.terminals} />

          {/* Walking times between key locations */}
          <Card>
            <CardHeader>
              <CardTitle>Walking Times</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {airport.terminals.map((terminal) =>
                terminal.walkingTime?.map((wt, index) => (
                  <WalkingTime
                    key={`${terminal.id}-${index}`}
                    from={wt.from}
                    to={wt.to}
                    minutes={wt.minutes}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Map Tab */}
        <TabsContent value="map">
          <AirportMap airport={airport} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
