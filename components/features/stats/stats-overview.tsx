'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plane, Globe, Clock, MapPin } from 'lucide-react'

interface StatsOverviewProps {
  totalDistance: number
  totalFlightTime: number
  totalTrips: number
  countriesCount: number
}

export function StatsOverview({
  totalDistance,
  totalFlightTime,
  totalTrips,
  countriesCount,
}: StatsOverviewProps) {
  const formatDistance = (km: number) => {
    return `${km.toLocaleString()} km`
  }

  const formatFlightTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    return `${hours.toLocaleString()} hrs`
  }

  const stats = [
    {
      label: 'Distance Traveled',
      value: formatDistance(totalDistance),
      icon: Plane,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Time in Air',
      value: formatFlightTime(totalFlightTime),
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Countries Visited',
      value: countriesCount.toString(),
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Total Trips',
      value: totalTrips.toString(),
      icon: MapPin,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">
                {stat.label}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
