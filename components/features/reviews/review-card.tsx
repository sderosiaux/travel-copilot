'use client'

import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Card, CardContent } from '@/components/ui'
import type { Review } from '@/types/reviews'
import { Star, ThumbsUp, ThumbsDown, Image as ImageIcon, Check } from 'lucide-react'
import { useState } from 'react'

interface ReviewCardProps {
  review: Review
  onVote?: (helpful: boolean) => void
  userVote?: boolean | null // true = helpful, false = not helpful, null = no vote
  showReviewableInfo?: boolean
}

export function ReviewCard({ review, onVote, userVote, showReviewableInfo = true }: ReviewCardProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const initials = review.userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.userAvatar} alt={review.userName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-text-primary">{review.userName}</h4>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-xs text-text-tertiary mt-0.5">
                {new Date(review.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-border-secondary'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Reviewable Info */}
          {showReviewableInfo && (
            <div className="text-sm">
              <span className="text-text-tertiary">Review for: </span>
              <span className="font-medium text-text-primary">{review.reviewableName}</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                {review.reviewableType}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h5 className="font-semibold text-text-primary">{review.title}</h5>

          {/* Content */}
          <p className="text-sm text-text-secondary leading-relaxed">{review.content}</p>

          {/* Photos */}
          {review.photos.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-text-tertiary">
                <ImageIcon className="h-3 w-3" />
                <span>{review.photos.length} photo{review.photos.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {review.photos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo.url)}
                    className="aspect-square rounded-lg bg-bg-secondary border border-border-primary hover:border-accent-primary transition-colors overflow-hidden"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-icon-tertiary" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Voting */}
          {onVote && (
            <div className="flex items-center gap-4 pt-2 border-t border-border-primary">
              <span className="text-xs text-text-tertiary">Was this helpful?</span>
              <div className="flex items-center gap-2">
                <Button
                  variant={userVote === true ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => onVote(true)}
                  className="gap-1"
                >
                  <ThumbsUp className="h-3 w-3" />
                  <span className="text-xs">{review.helpfulVotes}</span>
                </Button>
                <Button
                  variant={userVote === false ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => onVote(false)}
                  className="gap-1"
                >
                  <ThumbsDown className="h-3 w-3" />
                  <span className="text-xs">{review.notHelpfulVotes}</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
