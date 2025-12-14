'use client'

import { useState, useEffect } from 'react'
import { useRecommendationsStore } from '@/lib/store/recommendations-store'
import { mockRecommendations, mockInsights } from '@/data/recommendations'
import {
  RecommendationCard,
  InsightsPanel,
  RecommendationFilters,
} from '@/components/features/recommendations'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'
import type { RecommendationType } from '@/types/recommendations'

export default function RecommendationsPage() {
  const {
    recommendations,
    insights,
    setRecommendations,
    setInsights,
    dismissRecommendation,
    selectedType,
    setSelectedType,
    getActiveRecommendations,
    getDismissedRecommendations,
    getFilteredRecommendations,
    getHighPriorityInsights,
  } = useRecommendationsStore()

  useEffect(() => {
    // Load mock recommendations data
    setRecommendations(mockRecommendations)
    setInsights(mockInsights)
  }, [setRecommendations, setInsights])

  const activeRecommendations = getFilteredRecommendations().filter((r) => r.isActive && !r.isDismissed)
  const dismissedRecommendations = getDismissedRecommendations()
  const highPriorityInsights = getHighPriorityInsights()

  const handleTypeChange = (type: RecommendationType | 'all') => {
    setSelectedType(type)
  }

  if (recommendations.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Personalized Recommendations
          </h1>
          <p className="text-text-secondary">
            AI-powered travel suggestions based on your preferences and history
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Sparkles className="h-16 w-16 text-text-tertiary mb-4" />
            <p className="text-text-secondary">Loading recommendations...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Personalized Recommendations
          </h1>
          <p className="text-text-secondary">
            AI-powered travel suggestions tailored just for you
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <Sparkles className="h-3 w-3 mr-1" />
          {activeRecommendations.length} new
        </Badge>
      </div>

      {/* High priority insights */}
      {highPriorityInsights.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-primary mb-1">
                Quick Insights
              </h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                {highPriorityInsights.map((insight) => (
                  <li key={insight.id}>{insight.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="for-you" className="w-full">
        <TabsList>
          <TabsTrigger value="for-you">
            For You
            <Badge variant="secondary" className="ml-2">
              {activeRecommendations.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="insights">
            Insights
            <Badge variant="secondary" className="ml-2">
              {insights.length}
            </Badge>
          </TabsTrigger>
          {dismissedRecommendations.length > 0 && (
            <TabsTrigger value="dismissed">
              Dismissed
              <Badge variant="secondary" className="ml-2">
                {dismissedRecommendations.length}
              </Badge>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="for-you" className="space-y-6 mt-6">
          {/* Filters */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-3 block">
              Filter by Type
            </label>
            <RecommendationFilters
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
            />
          </div>

          {/* Recommendations Grid */}
          {activeRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeRecommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  onDismiss={dismissRecommendation}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Sparkles className="h-12 w-12 text-text-tertiary mb-4" />
                <p className="text-text-secondary">
                  No recommendations match your filters
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <InsightsPanel insights={insights} />
        </TabsContent>

        {dismissedRecommendations.length > 0 && (
          <TabsContent value="dismissed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dismissedRecommendations.map((recommendation) => (
                <div key={recommendation.id} className="opacity-50">
                  <RecommendationCard
                    recommendation={recommendation}
                    onDismiss={() => {}}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>

      <div className="text-xs text-text-tertiary text-center">
        Recommendations are updated daily based on your travel patterns and preferences
      </div>
    </div>
  )
}
