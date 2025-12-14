'use client'

import { Plane, TrendingUp, Star, Gift, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import type { RewardOption } from '@/types/rewards'
import { useRewardsStore } from '@/lib/store/rewards-store'

export function RewardOptions() {
  const { rewardOptions, getSelectedProgram, redeemReward, isLoading } = useRewardsStore()
  const selectedProgram = getSelectedProgram()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="h-4 w-4" />
      case 'upgrade':
        return <TrendingUp className="h-4 w-4" />
      case 'lounge':
        return <Star className="h-4 w-4" />
      case 'hotel':
        return <Award className="h-4 w-4" />
      default:
        return <Gift className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'flight':
        return 'bg-blue-500'
      case 'upgrade':
        return 'bg-purple-500'
      case 'lounge':
        return 'bg-yellow-500'
      case 'hotel':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const canAfford = (reward: RewardOption): boolean => {
    return !!(selectedProgram && selectedProgram.pointsBalance >= reward.pointsCost)
  }

  const handleRedeem = async (reward: RewardOption) => {
    if (!selectedProgram) return
    await redeemReward(selectedProgram.id, reward.id)
  }

  const filterByType = (type?: string) => {
    if (!type) return rewardOptions
    return rewardOptions.filter((r) => r.type === type)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redemption Options</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="flight">Flights</TabsTrigger>
            <TabsTrigger value="upgrade">Upgrades</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {rewardOptions.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                canAfford={canAfford(reward)}
                onRedeem={() => handleRedeem(reward)}
                isLoading={isLoading}
                getTypeIcon={getTypeIcon}
                getTypeColor={getTypeColor}
              />
            ))}
          </TabsContent>

          <TabsContent value="flight" className="space-y-4">
            {filterByType('flight').map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                canAfford={canAfford(reward)}
                onRedeem={() => handleRedeem(reward)}
                isLoading={isLoading}
                getTypeIcon={getTypeIcon}
                getTypeColor={getTypeColor}
              />
            ))}
          </TabsContent>

          <TabsContent value="upgrade" className="space-y-4">
            {filterByType('upgrade').map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                canAfford={canAfford(reward)}
                onRedeem={() => handleRedeem(reward)}
                isLoading={isLoading}
                getTypeIcon={getTypeIcon}
                getTypeColor={getTypeColor}
              />
            ))}
          </TabsContent>

          <TabsContent value="other" className="space-y-4">
            {rewardOptions
              .filter((r) => r.type !== 'flight' && r.type !== 'upgrade')
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  canAfford={canAfford(reward)}
                  onRedeem={() => handleRedeem(reward)}
                  isLoading={isLoading}
                  getTypeIcon={getTypeIcon}
                  getTypeColor={getTypeColor}
                />
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface RewardCardProps {
  reward: RewardOption
  canAfford: boolean
  onRedeem: () => void
  isLoading: boolean
  getTypeIcon: (type: string) => React.ReactNode
  getTypeColor: (type: string) => string
}

function RewardCard({
  reward,
  canAfford,
  onRedeem,
  isLoading,
  getTypeIcon,
  getTypeColor,
}: RewardCardProps) {
  return (
    <div className="rounded-lg border border-border bg-bg-secondary p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getTypeColor(reward.type)}>
              <div className="flex items-center gap-1">
                {getTypeIcon(reward.type)}
                <span className="capitalize">{reward.type}</span>
              </div>
            </Badge>
            {reward.savingsPercentage && (
              <Badge variant="secondary">
                Save {reward.savingsPercentage}%
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-text-primary mb-1">{reward.title}</h3>
          <p className="text-sm text-text-secondary mb-2">{reward.description}</p>

          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Points: </span>
              <span className="font-semibold text-text-primary">
                {reward.pointsCost.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-text-secondary">Value: </span>
              <span className="font-semibold text-text-primary">{reward.value}</span>
            </div>
          </div>

          {reward.validUntil && (
            <p className="text-xs text-text-tertiary mt-2">
              Valid until {new Date(reward.validUntil).toLocaleDateString()}
            </p>
          )}

          {reward.restrictions && (
            <div className="mt-2">
              <p className="text-xs text-text-tertiary">
                {reward.restrictions.join(' • ')}
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={onRedeem}
          disabled={!canAfford || isLoading}
          className="min-w-[100px]"
        >
          {canAfford ? 'Redeem' : 'Not Enough'}
        </Button>
      </div>
    </div>
  )
}
