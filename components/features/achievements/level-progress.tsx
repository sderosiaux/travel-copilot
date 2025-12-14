'use client'

import { UserAchievements } from '@/types/achievements'
import { Card, CardContent, Progress, Badge } from '@/components/ui'
import { Trophy, Star, Target } from 'lucide-react'

interface LevelProgressProps {
  userAchievements: UserAchievements
}

export function LevelProgress({ userAchievements }: LevelProgressProps) {
  const progressToNextLevel =
    (userAchievements.totalPoints / userAchievements.nextLevelPoints) * 100

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-bold text-text-primary">
                Level {userAchievements.level}
              </h2>
            </div>
            <p className="text-sm text-text-secondary">
              {userAchievements.totalPoints.toLocaleString()} total points
            </p>
          </div>

          <Badge variant="secondary" className="text-lg px-3 py-1">
            <Star className="w-4 h-4 mr-1" />
            {userAchievements.stats.totalUnlocked} / {userAchievements.achievements.length}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Progress to Level {userAchievements.level + 1}</span>
            <span className="font-medium text-text-primary">
              {Math.round(progressToNextLevel)}%
            </span>
          </div>
          <Progress value={progressToNextLevel} className="h-3" />
          <p className="text-xs text-text-tertiary">
            {userAchievements.nextLevelPoints - userAchievements.totalPoints} points to next level
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {userAchievements.stats.commonUnlocked}
            </div>
            <div className="text-xs text-text-secondary">Common</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {userAchievements.stats.rareUnlocked}
            </div>
            <div className="text-xs text-text-secondary">Rare</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {userAchievements.stats.epicUnlocked}
            </div>
            <div className="text-xs text-text-secondary">Epic</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-500">
              {userAchievements.stats.legendaryUnlocked}
            </div>
            <div className="text-xs text-text-secondary">Legendary</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
