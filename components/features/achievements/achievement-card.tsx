'use client'

import { Achievement } from '@/types/achievements'
import { Card, CardContent, Badge, Progress } from '@/components/ui'
import {
  Sparkles,
  Globe,
  CheckCircle2,
  Zap,
  Target,
  Users,
  Crown,
  Star,
  Circle,
} from 'lucide-react'

interface AchievementCardProps {
  achievement: Achievement
  onClick?: () => void
}

const iconMap = {
  Sparkles,
  Globe,
  CheckCircle2,
  Zap,
  Target,
  Users,
  Crown,
  Star,
  Circle,
}

const rarityColors = {
  common: 'text-text-secondary border-border',
  rare: 'text-blue-500 border-blue-500',
  epic: 'text-purple-500 border-purple-500',
  legendary: 'text-amber-500 border-amber-500',
}

export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Circle
  const rarityColor = rarityColors[achievement.rarity]

  return (
    <Card
      className={`overflow-hidden transition-all ${
        achievement.isUnlocked
          ? 'hover:shadow-lg cursor-pointer'
          : 'opacity-60 grayscale'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${rarityColor} ${
              achievement.isUnlocked ? 'bg-bg-primary' : 'bg-bg-secondary'
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-text-primary">
                {achievement.name}
              </h3>
              <Badge
                variant={achievement.isUnlocked ? 'default' : 'secondary'}
                className="text-xs capitalize shrink-0"
              >
                {achievement.rarity}
              </Badge>
            </div>

            <p className="text-sm text-text-secondary mb-3">
              {achievement.description}
            </p>

            {!achievement.isUnlocked && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">
                    {achievement.requirement.current} / {achievement.requirement.target}{' '}
                    {achievement.requirement.unit}
                  </span>
                  <span className="font-medium text-text-primary">
                    {achievement.progress}%
                  </span>
                </div>
                <Progress value={achievement.progress} className="h-2" />
                {achievement.nextMilestone && (
                  <p className="text-xs text-text-tertiary">
                    {achievement.nextMilestone}
                  </p>
                )}
              </div>
            )}

            {achievement.isUnlocked && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-500 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Unlocked
                </span>
                <span className="font-semibold text-text-primary">
                  +{achievement.points} pts
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
