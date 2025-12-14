'use client'

import { Sparkles, Calendar, AlertTriangle, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Trip } from '@/types'

export interface CopilotSuggestion {
  id: string
  type: 'info' | 'warning' | 'action'
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
}

export interface CopilotSuggestionsProps {
  suggestions: CopilotSuggestion[]
}

export function CopilotSuggestions({ suggestions }: CopilotSuggestionsProps) {
  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles size={24} className="text-primary-500" />
        <h2 className="text-2xl font-semibold text-text-primary">Copilot Suggestions</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {suggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </div>
  )
}

interface SuggestionCardProps {
  suggestion: CopilotSuggestion
}

function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const getVariant = () => {
    switch (suggestion.type) {
      case 'warning':
        return 'warning'
      case 'action':
        return 'info'
      default:
        return 'default'
    }
  }

  const getIcon = () => {
    if (suggestion.icon) {
      return suggestion.icon
    }
    switch (suggestion.type) {
      case 'warning':
        return <AlertTriangle size={20} />
      case 'action':
        return <Sparkles size={20} />
      default:
        return <Sparkles size={20} />
    }
  }

  return (
    <Card
      variant={suggestion.action ? 'interactive' : 'default'}
      padding="md"
      className={cn(suggestion.action && 'cursor-pointer')}
      onClick={suggestion.action?.onClick}
    >
      <CardHeader>
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0',
              suggestion.type === 'warning'
                ? 'bg-warning-light/20 text-warning'
                : suggestion.type === 'action'
                  ? 'bg-primary-50 text-primary-500'
                  : 'bg-bg-secondary text-text-secondary'
            )}
          >
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <CardTitle className="text-base">{suggestion.title}</CardTitle>
              <Badge variant={getVariant()} className="flex-shrink-0">
                {suggestion.type}
              </Badge>
            </div>
            <p className="text-sm text-text-secondary">{suggestion.description}</p>
          </div>
        </div>
      </CardHeader>
      {suggestion.action && (
        <CardContent>
          <div className="pt-2 border-t border-border">
            <button
              onClick={(e) => {
                e.stopPropagation()
                suggestion.action?.onClick()
              }}
              className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
            >
              {suggestion.action.label} →
            </button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

// Helper function to generate suggestions based on trips
export function generateSuggestions(trips: Trip[]): CopilotSuggestion[] {
  const suggestions: CopilotSuggestion[] = []

  trips.forEach((trip) => {
    const daysUntil = Math.ceil(
      (new Date(trip.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )

    // Trip soon suggestion
    if (daysUntil <= 7 && daysUntil > 0) {
      suggestions.push({
        id: `trip-soon-${trip.id}`,
        type: 'info',
        title: `${trip.destination} trip in ${daysUntil} days`,
        description: 'Review your trip briefing and check-in details',
        icon: <Calendar size={20} />,
        action: {
          label: 'View briefing',
          onClick: () => {
            window.location.href = `/trips/${trip.id}#briefing`
          },
        },
      })
    }

    // Disruption warning
    if (trip.briefing?.risks.level === 'high' || trip.briefing?.risks.level === 'medium') {
      suggestions.push({
        id: `disruption-${trip.id}`,
        type: 'warning',
        title: `${trip.destination} trip disruption`,
        description: trip.briefing.risks.factors[0] || 'Check your trip for updates',
        icon: <AlertTriangle size={20} />,
        action: {
          label: 'View details',
          onClick: () => {
            window.location.href = `/trips/${trip.id}`
          },
        },
      })
    }

    // Document check
    if (daysUntil <= 14 && daysUntil > 0) {
      suggestions.push({
        id: `docs-${trip.id}`,
        type: 'action',
        title: 'Verify travel documents',
        description: `Ensure all documents are ready for ${trip.destination}`,
        icon: <FileText size={20} />,
        action: {
          label: 'Check documents',
          onClick: () => {
            window.location.href = `/documents`
          },
        },
      })
    }
  })

  // Limit to 4 suggestions max
  return suggestions.slice(0, 4)
}
