'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { TrendingUp } from 'lucide-react'
import type { YearlyStats } from '@/types/stats'

interface YearlyChartProps {
  yearlyStats: YearlyStats[]
}

export function YearlyChart({ yearlyStats }: YearlyChartProps) {
  const sortedStats = [...yearlyStats].sort((a, b) => b.year - a.year)

  const maxTrips = Math.max(...sortedStats.map((s) => s.trips))
  const maxDistance = Math.max(...sortedStats.map((s) => s.distance))
  const maxFlightTime = Math.max(...sortedStats.map((s) => s.flightTime))

  const getBarHeight = (value: number, max: number) => {
    return `${(value / max) * 100}%`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-text-secondary" />
          Travel Trends by Year
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trips" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trips">Trips</TabsTrigger>
            <TabsTrigger value="distance">Distance</TabsTrigger>
            <TabsTrigger value="time">Flight Time</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="space-y-4 mt-4">
            <div className="h-64 flex items-end justify-between gap-2">
              {sortedStats.map((stat) => (
                <div key={stat.year} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center relative h-full">
                    <div
                      className="w-full bg-blue-500 rounded-t-md transition-all hover:bg-blue-600 relative group"
                      style={{ height: getBarHeight(stat.trips, maxTrips) }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-primary border border-border-primary rounded px-2 py-1 text-xs font-medium whitespace-nowrap shadow-lg">
                        {stat.trips} trips
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-text-secondary">{stat.year}</div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="distance" className="space-y-4 mt-4">
            <div className="h-64 flex items-end justify-between gap-2">
              {sortedStats.map((stat) => (
                <div key={stat.year} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center relative h-full">
                    <div
                      className="w-full bg-green-500 rounded-t-md transition-all hover:bg-green-600 relative group"
                      style={{ height: getBarHeight(stat.distance, maxDistance) }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-primary border border-border-primary rounded px-2 py-1 text-xs font-medium whitespace-nowrap shadow-lg">
                        {stat.distance.toLocaleString()} km
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-text-secondary">{stat.year}</div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="time" className="space-y-4 mt-4">
            <div className="h-64 flex items-end justify-between gap-2">
              {sortedStats.map((stat) => (
                <div key={stat.year} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center relative h-full">
                    <div
                      className="w-full bg-purple-500 rounded-t-md transition-all hover:bg-purple-600 relative group"
                      style={{ height: getBarHeight(stat.flightTime, maxFlightTime) }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-primary border border-border-primary rounded px-2 py-1 text-xs font-medium whitespace-nowrap shadow-lg">
                        {Math.floor(stat.flightTime / 60)} hours
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-text-secondary">{stat.year}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
