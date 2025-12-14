'use client'

import { useState } from 'react'
import { BriefingList } from '@/components/features/briefing'
import { Card, Tabs, TabsList, TabsTrigger, TabsContent, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui'
import { FileText, Filter } from 'lucide-react'
import { mockTrips } from '@/data/trips'

const DEFAULT_USER_ID = 'user-carlos-001'

export default function BriefingPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'active' | 'archived'>('all')

  // Get all trips for the user
  const allTrips = Object.values(mockTrips).filter(trip => trip.userId === DEFAULT_USER_ID)

  // Filter trips
  const filteredTrips = allTrips.filter(trip => {
    if (filter === 'all') return trip.status !== 'cancelled'
    if (filter === 'upcoming') return trip.status === 'upcoming'
    if (filter === 'active') return trip.status === 'active'
    if (filter === 'archived') return trip.status === 'completed' || trip.status === 'cancelled'
    return true
  })

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary-500/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary-500" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">Briefing Center</h1>
          </div>
          <p className="text-text-secondary">
            Comprehensive pre-trip briefings for all your upcoming journeys
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <TabsList>
                <TabsTrigger value="all">
                  All Briefings
                </TabsTrigger>
                <TabsTrigger value="upcoming">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active
                </TabsTrigger>
                <TabsTrigger value="archived">
                  Archived
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Filter className="w-4 h-4" />
                <span>{filteredTrips.length} briefing{filteredTrips.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </Tabs>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="bg-primary-500/5 border-primary-500/20">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">
                What's in a briefing?
              </h3>
              <p className="text-sm text-text-secondary">
                Each briefing includes flight details, document checklists, destination information,
                weather forecasts, emergency contacts, and personalized reminders to help you prepare
                for your trip.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Briefing List */}
      <BriefingList trips={filteredTrips} />
    </div>
  )
}
