'use client'

import { useEffect, useState } from 'react'
import { Button, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { ReviewCard, RatingSummary, ReviewForm, ReviewFilters, type ReviewFormData } from '@/components/features/reviews'
import { useReviewsStore } from '@/lib/store/reviews-store'
import { mockReviews } from '@/data/reviews'
import type { ReviewableType } from '@/types/reviews'
import { Star, MessageSquare, Plus } from 'lucide-react'

const CURRENT_USER_ID = 'user-carlos-001' // Mock current user

export default function ReviewsPage() {
  const [mounted, setMounted] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [selectedReviewableId, setSelectedReviewableId] = useState<string>('')

  const {
    reviews,
    votes,
    reviewables,
    filters,
    sortBy,
    setReviews,
    setVotes,
    setReviewables,
    addReview,
    addVote,
    setFilters,
    clearFilters,
    setSortBy,
    getFilteredReviews,
    getSortedReviews,
    getUserVote,
    getReviewable,
  } = useReviewsStore()

  // Initialize data
  useEffect(() => {
    setMounted(true)
    setReviews(mockReviews.reviews)
    setVotes(mockReviews.reviewVotes)
    setReviewables(mockReviews.reviewableItems)
  }, [setReviews, setVotes, setReviewables])

  const handleVote = (reviewId: string, helpful: boolean) => {
    const existingVote = getUserVote(reviewId, CURRENT_USER_ID)

    if (existingVote) {
      // If clicking same vote, remove it
      if (existingVote.helpful === helpful) {
        // For simplicity, we'll just toggle by creating opposite vote
        return
      }
    }

    const newVote = {
      id: `vote-${Date.now()}`,
      reviewId,
      userId: CURRENT_USER_ID,
      helpful,
      createdAt: new Date().toISOString(),
    }

    addVote(newVote)
  }

  const handleSubmitReview = (data: ReviewFormData) => {
    if (!selectedReviewableId) return

    const reviewable = getReviewable(selectedReviewableId)
    if (!reviewable) return

    const newReview = {
      id: `review-${Date.now()}`,
      userId: CURRENT_USER_ID,
      userName: 'Carlos Rodriguez',
      userAvatar: '/avatars/carlos.jpg',
      reviewableType: reviewable.type,
      reviewableId: reviewable.id,
      reviewableName: reviewable.name,
      rating: data.rating,
      title: data.title,
      content: data.content,
      photos: data.photos.map((file, index) => ({
        id: `photo-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        caption: file.name,
        uploadedAt: new Date().toISOString(),
      })),
      helpfulVotes: 0,
      notHelpfulVotes: 0,
      verified: true,
      status: 'published' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addReview(newReview)
    setShowReviewForm(false)
    setSelectedReviewableId('')
  }

  const filteredReviews = getFilteredReviews()
  const sortedReviews = getSortedReviews(filteredReviews)

  // Calculate overall stats
  const overallStats = {
    totalReviews: reviews.length,
    averageRating: reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0,
    ratingDistribution: {
      1: reviews.filter((r) => r.rating === 1).length,
      2: reviews.filter((r) => r.rating === 2).length,
      3: reviews.filter((r) => r.rating === 3).length,
      4: reviews.filter((r) => r.rating === 4).length,
      5: reviews.filter((r) => r.rating === 5).length,
    },
    verifiedReviews: reviews.filter((r) => r.verified).length,
    withPhotos: reviews.filter((r) => r.photos.length > 0).length,
  }

  if (!mounted) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-text-tertiary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
              <Star className="h-8 w-8 text-accent-primary" />
              Reviews & Ratings
            </h1>
            <p className="text-text-secondary mt-2">
              Read and write reviews for flights, hotels, activities, and more
            </p>
          </div>
          <Button
            onClick={() => {
              setSelectedReviewableId(reviewables[0]?.id || '')
              setShowReviewForm(true)
            }}
            disabled={reviewables.length === 0}
          >
            <Plus className="h-4 w-4 mr-2" />
            Write Review
          </Button>
        </div>

        {/* Review Form */}
        {showReviewForm && selectedReviewableId && (
          <ReviewForm
            reviewableName={getReviewable(selectedReviewableId)?.name || ''}
            onSubmit={handleSubmitReview}
            onCancel={() => {
              setShowReviewForm(false)
              setSelectedReviewableId('')
            }}
          />
        )}

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="my-reviews">My Reviews ({reviews.filter(r => r.userId === CURRENT_USER_ID).length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Sidebar */}
              <div className="space-y-6">
                <RatingSummary stats={overallStats} title="Overall Rating" />
                <ReviewFilters
                  minRating={filters.minRating}
                  verified={filters.verified}
                  withPhotos={filters.withPhotos}
                  reviewableType={filters.reviewableType}
                  sortBy={sortBy}
                  onMinRatingChange={(rating) => setFilters({ ...filters, minRating: rating })}
                  onVerifiedChange={(verified) => setFilters({ ...filters, verified })}
                  onWithPhotosChange={(withPhotos) => setFilters({ ...filters, withPhotos })}
                  onReviewableTypeChange={(type) => setFilters({ ...filters, reviewableType: type })}
                  onSortByChange={(sort) => setSortBy(sort as any)}
                  onClear={clearFilters}
                />
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {sortedReviews.length} Review{sortedReviews.length !== 1 ? 's' : ''}
                  </h3>
                </div>

                {sortedReviews.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <MessageSquare className="h-12 w-12 text-icon-tertiary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        No reviews found
                      </h3>
                      <p className="text-text-secondary mb-4">
                        Try adjusting your filters or be the first to write a review
                      </p>
                      <Button variant="ghost" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {sortedReviews.map((review) => {
                      const userVote = getUserVote(review.id, CURRENT_USER_ID)
                      return (
                        <ReviewCard
                          key={review.id}
                          review={review}
                          onVote={(helpful) => handleVote(review.id, helpful)}
                          userVote={userVote?.helpful ?? null}
                          showReviewableInfo={true}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-reviews" className="space-y-6">
            {reviews.filter(r => r.userId === CURRENT_USER_ID).length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-icon-tertiary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    You haven't written any reviews yet
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Share your experiences to help other travelers
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedReviewableId(reviewables[0]?.id || '')
                      setShowReviewForm(true)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Write Your First Review
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {reviews
                  .filter(r => r.userId === CURRENT_USER_ID)
                  .map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      showReviewableInfo={true}
                    />
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Reviewable Items */}
        {!showReviewForm && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Available to Review
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reviewables.map((reviewable) => (
                  <Card key={reviewable.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6 space-y-3">
                      <div>
                        <h4 className="font-semibold text-text-primary">{reviewable.name}</h4>
                        <p className="text-xs text-text-tertiary mt-1">{reviewable.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">{reviewable.stats.averageRating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-text-tertiary">
                          ({reviewable.stats.totalReviews} reviews)
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-full"
                        onClick={() => {
                          setSelectedReviewableId(reviewable.id)
                          setShowReviewForm(true)
                        }}
                      >
                        Write Review
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
