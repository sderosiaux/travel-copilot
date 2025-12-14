'use client'

import { Button } from '@/components/ui'

interface CopilotSuggestionsProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
  disabled?: boolean
}

export function CopilotSuggestions({
  suggestions,
  onSuggestionClick,
  disabled = false,
}: CopilotSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="secondary"
          size="sm"
          onClick={() => onSuggestionClick(suggestion)}
          disabled={disabled}
          className="text-xs"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
}
