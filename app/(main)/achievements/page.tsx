'use client'

import { useState, useEffect } from 'react'
import { useAchievementsStore } from '@/lib/store/achievements-store'
import {
  AchievementCard,
  LevelProgress,
  BadgeDisplay,
  RecentUnlocks,
  StreakTracker,
} from '@/components/features/achievements'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { achievementsMockData } from '@/data/achievements'
import { AchievementCategory, AchievementRarity } from '@/types/achievements'
import { Trophy } from 'lucide-react'

export default function AchievementsPage() {
  const {
    userAchievements,
    badges,
    streaks,
    setUserAchievements,
    setBadges,
    setStreaks,
    getUnlockedAchievements,
    getLockedAchievements,
    getAchievementsByCategory,
  } = useAchievementsStore()

  const [filterCategory, setFilterCategory] = useState<AchievementCategory | 'all'>('all')
  const [filterRarity, setFilterRarity] = useState<AchievementRarity | 'all'>('all')

  useEffect(() => {
    // Load mock data on mount
    setUserAchievements(achievementsMockData.userAchievements)
    setBadges(achievementsMockData.badges)
    setStreaks(achievementsMockData.streaks)
  }, [setUserAchievements, setBadges, setStreaks])

  if (!userAchievements) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
          <p className="text-text-secondary">Loading achievements...</p>
        </div>
      </div>
    )
  }

  const unlockedAchievements = getUnlockedAchievements()
  const lockedAchievements = getLockedAchievements()

  const getFilteredAchievements = (achievements: typeof userAchievements.achievements) => {
    let filtered = achievements

    if (filterCategory !== 'all') {
      filtered = filtered.filter((a) => a.category === filterCategory)
    }

    if (filterRarity !== 'all') {
      filtered = filtered.filter((a) => a.rarity === filterRarity)
    }

    return filtered
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-text-primary" />
            <h1 className="text-3xl font-bold text-text-primary">Achievements</h1>
          </div>
        </div>
        <p className="text-text-secondary">
          Track your travel milestones and unlock rewards
        </p>
      </div>

      <div className="space-y-6">
        <LevelProgress userAchievements={userAchievements} />

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentUnlocks achievements={userAchievements.recentUnlocks} />
          <StreakTracker streaks={streaks} />
        </div>

        <BadgeDisplay badges={badges} />

        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">
                All ({userAchievements.achievements.length})
              </TabsTrigger>
              <TabsTrigger value="unlocked">
                Unlocked ({unlockedAchievements.length})
              </TabsTrigger>
              <TabsTrigger value="locked">
                Locked ({lockedAchievements.length})
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Select
                value={filterCategory}
                onValueChange={(v) => setFilterCategory(v as AchievementCategory | 'all')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="explorer">Explorer</SelectItem>
                  <SelectItem value="frequent-flyer">Frequent Flyer</SelectItem>
                  <SelectItem value="planner">Planner</SelectItem>
                  <SelectItem value="adventurer">Adventurer</SelectItem>
                  <SelectItem value="milestone">Milestone</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filterRarity}
                onValueChange={(v) => setFilterRarity(v as AchievementRarity | 'all')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rarity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rarities</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {getFilteredAchievements(userAchievements.achievements).length === 0 ? (
              <div className="text-center py-12 bg-bg-secondary rounded-lg">
                <Trophy className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                <p className="text-text-secondary">
                  No achievements match your filters
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {getFilteredAchievements(userAchievements.achievements).map(
                  (achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                    />
                  )
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unlocked" className="space-y-4">
            {getFilteredAchievements(unlockedAchievements).length === 0 ? (
              <div className="text-center py-12 bg-bg-secondary rounded-lg">
                <Trophy className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                <p className="text-text-secondary">
                  No unlocked achievements match your filters
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {getFilteredAchievements(unlockedAchievements).map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="locked" className="space-y-4">
            {getFilteredAchievements(lockedAchievements).length === 0 ? (
              <div className="text-center py-12 bg-bg-secondary rounded-lg">
                <Trophy className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                <p className="text-text-secondary">
                  No locked achievements match your filters
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {getFilteredAchievements(lockedAchievements).map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
