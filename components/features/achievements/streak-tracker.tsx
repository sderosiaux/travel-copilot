'use client'

import { Streak } from '@/types/achievements'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Flame, Target, Sparkles } from 'lucide-react'

interface StreakTrackerProps {
  streaks: Streak[]
}

const streakIcons = {
  booking: Sparkles,
  travel: Flame,
  planning: Target,
}

const streakLabels = {
  booking: 'Booking Streak',
  travel: 'Travel Streak',
  planning: 'Planning Streak',
}

export function StreakTracker({ streaks }: StreakTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5" />
          Your Streaks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          {streaks.map((streak) => {
            const Icon = streakIcons[streak.type]
            const label = streakLabels[streak.type]

            return (
              <div
                key={streak.type}
                className="p-4 rounded-lg border border-border hover:bg-bg-secondary transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-orange-500" />
                  <h4 className="font-semibold text-text-primary">{label}</h4>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-3xl font-bold text-text-primary">
                      {streak.currentStreak}
                    </div>
                    <div className="text-xs text-text-secondary">
                      Current streak
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="text-sm text-text-secondary">
                      Best: <span className="font-semibold">{streak.longestStreak}</span>
                    </div>
                    <div className="text-xs text-text-tertiary">
                      Since {new Date(streak.startDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
