'use client'

import { Badge, Button, Card, CardContent, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import type { ReviewableType } from '@/types/reviews'
import { Filter, X, Star, Image as ImageIcon, Check } from 'lucide-react'

interface ReviewFiltersProps {
  minRating?: number
  verified?: boolean
  withPhotos?: boolean
  reviewableType?: ReviewableType
  sortBy: string
  onMinRatingChange: (rating?: number) => void
  onVerifiedChange: (verified?: boolean) => void
  onWithPhotosChange: (withPhotos?: boolean) => void
  onReviewableTypeChange: (type?: ReviewableType) => void
  onSortByChange: (sortBy: string) => void
  onClear: () => void
}

const reviewableTypes: { value: ReviewableType; label: string }[] = [
  { value: 'flight', label: 'Flights' },
  { value: 'hotel', label: 'Hotels' },
  { value: 'activity', label: 'Activities' },
  { value: 'restaurant', label: 'Restaurants' },
  { value: 'lounge', label: 'Lounges' },
]

export function ReviewFilters({
  minRating,
  verified,
  withPhotos,
  reviewableType,
  sortBy,
  onMinRatingChange,
  onVerifiedChange,
  onWithPhotosChange,
  onReviewableTypeChange,
  onSortByChange,
  onClear,
}: ReviewFiltersProps) {
  const hasFilters = minRating !== undefined || verified !== undefined || withPhotos !== undefined || reviewableType !== undefined

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-icon-secondary" />
              <Label className="text-sm font-medium">Filters</Label>
            </div>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={onClear}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label className="text-xs text-text-tertiary">Sort By</Label>
            <Select value={sortBy} onValueChange={onSortByChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most_recent">Most Recent</SelectItem>
                <SelectItem value="highest_rated">Highest Rated</SelectItem>
                <SelectItem value="lowest_rated">Lowest Rated</SelectItem>
                <SelectItem value="most_helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Review Type */}
          <div className="space-y-2">
            <Label className="text-xs text-text-tertiary">Category</Label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={reviewableType === undefined ? 'primary' : 'secondary'}
                className="cursor-pointer hover:bg-bg-hover transition-colors"
                onClick={() => onReviewableTypeChange(undefined)}
              >
                All
              </Badge>
              {reviewableTypes.map((type) => (
                <Badge
                  key={type.value}
                  variant={reviewableType === type.value ? 'primary' : 'secondary'}
                  className="cursor-pointer hover:bg-bg-hover transition-colors"
                  onClick={() => onReviewableTypeChange(type.value)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2">
            <Label className="text-xs text-text-tertiary">Minimum Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => onMinRatingChange(minRating === rating ? undefined : rating)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-colors ${
                    minRating === rating
                      ? 'border-accent-primary bg-accent-primary/10'
                      : 'border-border-primary hover:bg-bg-hover'
                  }`}
                >
                  <span className="text-sm font-medium">{rating}</span>
                  <Star
                    className={`h-3 w-3 ${
                      minRating === rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-icon-tertiary'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="space-y-2">
            <Label className="text-xs text-text-tertiary">Quick Filters</Label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={verified ? 'primary' : 'secondary'}
                className="cursor-pointer hover:bg-bg-hover transition-colors"
                onClick={() => onVerifiedChange(verified ? undefined : true)}
              >
                <Check className="mr-1 h-3 w-3" />
                Verified Only
              </Badge>
              <Badge
                variant={withPhotos ? 'primary' : 'secondary'}
                className="cursor-pointer hover:bg-bg-hover transition-colors"
                onClick={() => onWithPhotosChange(withPhotos ? undefined : true)}
              >
                <ImageIcon className="mr-1 h-3 w-3" />
                With Photos
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
