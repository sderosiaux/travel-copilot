'use client'

import { Achievement } from '@/types/achievements'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'
import { Sparkles, CheckCircle2 } from 'lucide-react'

interface RecentUnlocksProps {
  achievements: Achievement[]
}

export function RecentUnlocks({ achievements }: RecentUnlocksProps) {
  if (achievements.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Sparkles className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
          <p className="text-text-secondary">
            No recent achievements. Keep exploring to unlock more!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Recent Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-bg-secondary transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-text-primary">
                    {achievement.name}
                  </h4>
                  <Badge variant="secondary" className="text-xs capitalize shrink-0">
                    {achievement.rarity}
                  </Badge>
                </div>
                <p className="text-sm text-text-secondary mb-1">
                  {achievement.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-tertiary">
                    {achievement.unlockedAt &&
                      new Date(achievement.unlockedAt).toLocaleDateString()}
                  </span>
                  <span className="text-sm font-semibold text-text-primary">
                    +{achievement.points} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
