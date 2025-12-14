'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Lightbulb } from 'lucide-react'
import type { PackingSuggestion } from '@/types/packing'

interface PackingSuggestionsProps {
  suggestions: PackingSuggestion[]
  onAddItem: (categoryIndex: number, itemIndex: number) => void
}

const priorityColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
}

export function PackingSuggestions({ suggestions, onAddItem }: PackingSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <Card className="border-primary-200 dark:border-primary-800">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary-500" />
          <CardTitle>Smart Suggestions</CardTitle>
        </div>
        <CardDescription>
          Based on your destination and weather conditions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, categoryIndex) => (
            <div
              key={categoryIndex}
              className="p-4 border border-border-primary rounded-lg space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-text-primary capitalize">
                      {suggestion.category}
                    </h4>
                    <Badge className={priorityColors[suggestion.priority]}>
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary">{suggestion.reason}</p>
                </div>
              </div>

              <div className="space-y-2">
                {suggestion.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-2 bg-bg-secondary rounded hover:bg-bg-tertiary transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-primary font-medium">
                        {item.name}
                      </span>
                      {item.quantity > 1 && (
                        <Badge variant="default" className="text-xs">
                          x{item.quantity}
                        </Badge>
                      )}
                      {item.isEssential && (
                        <Badge variant="default" className="text-xs">
                          Essential
                        </Badge>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onAddItem(categoryIndex, itemIndex)}
                      className="h-7"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
