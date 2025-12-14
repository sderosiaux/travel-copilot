'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus, Globe } from 'lucide-react'
import { WorldClockCard } from '@/components/features/timezone/world-clock-card'
import { TimeConverter } from '@/components/features/timezone/time-converter'
import { MeetingScheduler } from '@/components/features/timezone/meeting-scheduler'
import { JetLagHelper } from '@/components/features/timezone/jet-lag-helper'
import { useTimezoneStore } from '@/lib/store/timezone-store'
import { mockTimezones } from '@/data/timezones'

export default function TimezonePage() {
  const { worldClock, meetings, setWorldClock, setMeetings, removeTimezone } = useTimezoneStore()
  const [activeTab, setActiveTab] = useState('world-clock')

  useEffect(() => {
    // Load mock data on mount
    setWorldClock(mockTimezones.worldClock)
    setMeetings(mockTimezones.meetings)
  }, [setWorldClock, setMeetings])

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary-500" />
            Time Zone Helper
          </h1>
          <p className="text-text-secondary mt-2">
            Manage time zones, convert times, and schedule meetings across the world
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="world-clock">World Clock</TabsTrigger>
          <TabsTrigger value="converter">Time Converter</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="jet-lag">Jet Lag</TabsTrigger>
        </TabsList>

        {/* World Clock Tab */}
        <TabsContent value="world-clock" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Your World Clocks</h2>
              <p className="text-sm text-text-secondary mt-1">
                Track time across your favorite destinations
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Timezone
            </Button>
          </div>

          {worldClock ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {worldClock.timezones.map((timezone) => (
                <WorldClockCard
                  key={timezone.id}
                  timezone={timezone}
                  onRemove={removeTimezone}
                  showRemove={worldClock.timezones.length > 1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-text-secondary">
              <Globe className="h-16 w-16 mx-auto mb-4 text-text-tertiary" />
              <p>No world clocks configured</p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Clock
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Time Converter Tab */}
        <TabsContent value="converter" className="space-y-4 mt-6">
          <TimeConverter timezones={mockTimezones.common} />
        </TabsContent>

        {/* Meetings Tab */}
        <TabsContent value="meetings" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Meeting Scheduler</h2>
              <p className="text-sm text-text-secondary mt-1">
                Schedule and view meetings across time zones
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Meeting
            </Button>
          </div>
          <MeetingScheduler meetings={meetings} />
        </TabsContent>

        {/* Jet Lag Tab */}
        <TabsContent value="jet-lag" className="space-y-4 mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-text-primary">Jet Lag Recommendations</h2>
            <p className="text-sm text-text-secondary mt-1">
              Get personalized advice to minimize jet lag
            </p>
          </div>

          <div className="space-y-6">
            <JetLagHelper recommendation={mockTimezones.jetLag.tokyo} />
            <JetLagHelper recommendation={mockTimezones.jetLag.nyc} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
