'use client'

import { useState, useEffect } from 'react'
import { useStatsStore } from '@/lib/store/stats-store'
import { mockTravelStats } from '@/data/stats'
import {
  StatsOverview,
  CountriesMap,
  YearlyChart,
  TripTimeline,
  TopDestinations,
} from '@/components/features/stats'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'

export default function StatsPage() {
  const {
    stats,
    setStats,
    selectedPeriod,
    setSelectedPeriod,
    getTotalDistance,
    getTotalFlightTime,
    getTotalTrips,
    getCountriesCount,
    getFilteredYearlyStats,
  } = useStatsStore()

  useEffect(() => {
    // Load mock stats data
    setStats(mockTravelStats)
  }, [setStats])

  if (!stats) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Travel Stats</h1>
          <p className="text-text-secondary">Your travel journey at a glance</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="h-16 w-16 text-text-tertiary mb-4" />
            <p className="text-text-secondary">Loading your travel statistics...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const periods = [
    { label: 'All Time', value: 'all' as const },
    ...stats.yearlyStats
      .sort((a, b) => b.year - a.year)
      .map((stat) => ({
        label: stat.year.toString(),
        value: 'year' as const,
        year: stat.year,
      })),
  ]

  const handlePeriodChange = (value: string) => {
    const period = periods.find((p) => {
      if (p.value === 'all' && value === 'all') return true
      if (p.value === 'year' && p.year?.toString() === value) return true
      return false
    })
    if (period) {
      setSelectedPeriod(period)
    }
  }

  const filteredYearlyStats = getFilteredYearlyStats()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Travel Stats</h1>
          <p className="text-text-secondary">
            Your travel journey at a glance - {getTotalTrips()} trips and counting
          </p>
        </div>
      </div>

      {/* Period selector */}
      <div className="max-w-xs">
        <label className="text-sm font-medium text-text-secondary mb-2 block">
          Time Period
        </label>
        <Select
          value={
            selectedPeriod.value === 'all'
              ? 'all'
              : selectedPeriod.year?.toString() || 'all'
          }
          onValueChange={handlePeriodChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            {periods.map((period, index) => (
              <SelectItem
                key={index}
                value={
                  period.value === 'all' ? 'all' : period.year?.toString() || 'all'
                }
              >
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <StatsOverview
        totalDistance={getTotalDistance()}
        totalFlightTime={getTotalFlightTime()}
        totalTrips={getTotalTrips()}
        countriesCount={getCountriesCount()}
      />

      {/* Charts and Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <YearlyChart yearlyStats={filteredYearlyStats} />
        <TopDestinations destinations={stats.topDestinations} />
      </div>

      {/* Countries Map */}
      <CountriesMap countries={stats.countriesVisited} />

      {/* Trip Timeline */}
      <TripTimeline timeline={stats.tripTimeline} />

      <div className="text-xs text-text-tertiary text-center">
        Last updated:{' '}
        {new Date(stats.lastUpdated).toLocaleString('en-GB', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </div>
    </div>
  )
}
