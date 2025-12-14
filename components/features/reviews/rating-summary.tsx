'use client'

import { Card, CardContent, CardHeader, CardTitle, Progress } from '@/components/ui'
import type { ReviewStats } from '@/types/reviews'
import { Star, Image as ImageIcon, Check } from 'lucide-react'

interface RatingSummaryProps {
  stats: ReviewStats
  title?: string
}

export function RatingSummary({ stats, title = 'Rating Summary' }: RatingSummaryProps) {
  const maxCount = Math.max(...Object.values(stats.ratingDistribution))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Average Rating */}
        <div className="text-center space-y-2">
          <div className="text-5xl font-bold text-text-primary">
            {stats.averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(stats.averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-border-secondary'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-text-tertiary">
            Based on {stats.totalReviews.toLocaleString()} review{stats.totalReviews !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]
            const percentage = (count / stats.totalReviews) * 100

            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium text-text-primary">{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <Progress
                    value={(count / maxCount) * 100}
                    className="h-2"
                  />
                </div>
                <span className="text-sm text-text-tertiary w-12 text-right">
                  {count.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-around pt-4 border-t border-border-primary">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-text-primary mb-1">
              <Check className="h-4 w-4" />
              <span className="font-semibold">{stats.verifiedReviews.toLocaleString()}</span>
            </div>
            <p className="text-xs text-text-tertiary">Verified</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-text-primary mb-1">
              <ImageIcon className="h-4 w-4" />
              <span className="font-semibold">{stats.withPhotos.toLocaleString()}</span>
            </div>
            <p className="text-xs text-text-tertiary">With Photos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
