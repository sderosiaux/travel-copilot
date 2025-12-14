'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Compass,
  Plane,
  Star,
  Sparkles,
  TrendingUp,
  Heart,
  ThumbsUp,
  Globe,
  X,
} from 'lucide-react'
import type { Recommendation } from '@/types/recommendations'

interface RecommendationCardProps {
  recommendation: Recommendation
  onDismiss: (id: string) => void
}

export function RecommendationCard({ recommendation, onDismiss }: RecommendationCardProps) {
  const getTypeIcon = () => {
    switch (recommendation.type) {
      case 'destination':
        return MapPin
      case 'experience':
        return Compass
      case 'airline':
        return Plane
      case 'hotel':
        return Star
      case 'season':
        return Globe
      default:
        return Sparkles
    }
  }

  const getReasonBadge = () => {
    switch (recommendation.reason) {
      case 'based_on_preferences':
        return { text: 'For You', icon: Heart, color: 'bg-pink-100 text-pink-700' }
      case 'based_on_history':
        return { text: 'Based on History', icon: TrendingUp, color: 'bg-blue-100 text-blue-700' }
      case 'trending':
        return { text: 'Trending', icon: TrendingUp, color: 'bg-orange-100 text-orange-700' }
      case 'seasonal':
        return { text: 'Seasonal', icon: Globe, color: 'bg-green-100 text-green-700' }
      case 'similar_travelers':
        return { text: 'Popular', icon: ThumbsUp, color: 'bg-purple-100 text-purple-700' }
    }
  }

  const Icon = getTypeIcon()
  const reasonBadge = getReasonBadge()
  const ReasonIcon = reasonBadge.icon

  return (
    <Card className="group hover:shadow-lg transition-all overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Score badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-white/90 text-text-primary backdrop-blur-sm">
              <Sparkles className="h-3 w-3 mr-1" />
              {recommendation.score}% match
            </Badge>
          </div>

          {/* Dismiss button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 left-3 z-10 h-8 w-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={() => onDismiss(recommendation.id)}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Image placeholder */}
          <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Icon className="h-16 w-16 text-white opacity-50" />
          </div>
        </div>

        <div className="p-5 space-y-3">
          {/* Title and type */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={reasonBadge.color}>
                <ReasonIcon className="h-3 w-3 mr-1" />
                {reasonBadge.text}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {recommendation.type.replace('_', ' ')}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              {recommendation.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary line-clamp-3">
            {recommendation.description}
          </p>

          {/* Metadata */}
          {recommendation.metadata.destination && (
            <div className="flex flex-wrap gap-2 text-xs text-text-tertiary pt-2 border-t border-border-primary">
              {recommendation.metadata.destination.estimatedCost && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">From</span>
                  <span>£{recommendation.metadata.destination.estimatedCost}</span>
                </div>
              )}
              {recommendation.metadata.destination.flightTime && (
                <div className="flex items-center gap-1">
                  <Plane className="h-3 w-3" />
                  <span>{Math.floor(recommendation.metadata.destination.flightTime / 60)}h</span>
                </div>
              )}
              {recommendation.metadata.destination.bestTimeToVisit && (
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  <span>
                    Best: {recommendation.metadata.destination.bestTimeToVisit.slice(0, 2).join(', ')}
                  </span>
                </div>
              )}
            </div>
          )}

          {recommendation.metadata.experience && (
            <div className="flex flex-wrap gap-2 text-xs text-text-tertiary pt-2 border-t border-border-primary">
              <Badge variant="secondary" className="capitalize">
                {recommendation.metadata.experience.difficulty}
              </Badge>
              {recommendation.metadata.experience.duration && (
                <span>{recommendation.metadata.experience.duration} mins</span>
              )}
              {recommendation.metadata.experience.priceRange && (
                <span>£{recommendation.metadata.experience.priceRange}</span>
              )}
            </div>
          )}

          {/* Tags */}
          {recommendation.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {recommendation.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
