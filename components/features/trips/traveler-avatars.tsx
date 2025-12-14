'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { TripTraveler } from '@/types'

interface TravelerAvatarsProps {
  travelers: TripTraveler[]
  maxVisible?: number
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
}

export function TravelerAvatars({
  travelers,
  maxVisible = 3,
  size = 'md'
}: TravelerAvatarsProps) {
  const visibleTravelers = travelers.slice(0, maxVisible)
  const remainingCount = Math.max(0, travelers.length - maxVisible)

  return (
    <TooltipProvider>
      <div className="flex -space-x-2">
        {visibleTravelers.map((traveler, index) => (
          <Tooltip key={traveler.userId}>
            <TooltipTrigger asChild>
              <Avatar className={`${sizeClasses[size]} ring-2 ring-bg-primary`}>
                <AvatarFallback>T{index + 1}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>Traveler {index + 1}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        {remainingCount > 0 && (
          <div
            className={`${sizeClasses[size]} rounded-full bg-bg-secondary border-2 border-bg-primary flex items-center justify-center font-medium text-text-secondary`}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
