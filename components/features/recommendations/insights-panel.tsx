'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Lightbulb,
  TrendingUp,
  Heart,
  Target,
  Sparkles,
} from 'lucide-react'
import type { RecommendationInsight } from '@/types/recommendations'

interface InsightsPanelProps {
  insights: RecommendationInsight[]
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const getCategoryIcon = (category: RecommendationInsight['category']) => {
    switch (category) {
      case 'preference':
        return Heart
      case 'pattern':
        return TrendingUp
      case 'savings':
        return Target
      case 'tip':
        return Sparkles
      default:
        return Lightbulb
    }
  }

  const getPriorityColor = (priority: RecommendationInsight['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  const sortedInsights = [...insights].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-text-secondary" />
          Travel Insights
        </CardTitle>
        <p className="text-sm text-text-secondary">
          Personalized insights based on your travel patterns
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedInsights.map((insight) => {
            const Icon = getCategoryIcon(insight.category)
            const priorityColor = getPriorityColor(insight.priority)

            return (
              <div
                key={insight.id}
                className="p-4 rounded-lg border border-border-primary bg-bg-secondary hover:bg-bg-tertiary transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${priorityColor}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-text-primary text-sm">
                        {insight.title}
                      </h4>
                      <Badge
                        variant="secondary"
                        className="text-xs capitalize"
                      >
                        {insight.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
