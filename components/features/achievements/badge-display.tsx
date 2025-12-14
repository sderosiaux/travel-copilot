'use client'

import { Badge as BadgeType } from '@/types/achievements'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import {
  Sparkles,
  Users,
  CheckCircle2,
  Star,
  Trophy,
  Target,
  Globe,
  Crown,
} from 'lucide-react'

interface BadgeDisplayProps {
  badges: BadgeType[]
}

const iconMap = {
  Sparkles,
  Users,
  CheckCircle2,
  Star,
  Trophy,
  Target,
  Globe,
  Crown,
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  if (badges.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Trophy className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
          <p className="text-text-secondary">
            No badges earned yet. Keep traveling to unlock badges!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Your Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const Icon = iconMap[badge.icon as keyof typeof iconMap] || Star
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center p-4 rounded-lg border border-border hover:bg-bg-secondary transition-colors"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: badge.color }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-sm text-text-primary mb-1">
                  {badge.name}
                </h4>
                <p className="text-xs text-text-secondary line-clamp-2">
                  {badge.description}
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
