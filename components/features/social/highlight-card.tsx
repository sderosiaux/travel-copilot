'use client'

import { TripHighlight } from '@/types/social'
import { Card, CardContent, Badge } from '@/components/ui'
import { Globe, Lock, Users, Share2 } from 'lucide-react'

interface HighlightCardProps {
  highlight: TripHighlight
  onShare?: (highlight: TripHighlight) => void
}

export function HighlightCard({ highlight, onShare }: HighlightCardProps) {
  const privacyIcons = {
    public: Globe,
    friends: Users,
    private: Lock,
  }

  const PrivacyIcon = privacyIcons[highlight.privacy]

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {highlight.imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-bg-secondary">
          <img
            src={highlight.imageUrl}
            alt={highlight.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-text-primary mb-1">
              {highlight.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {highlight.destination}
            </p>
          </div>
          <button
            onClick={() => onShare?.(highlight)}
            className="p-2 rounded-lg hover:bg-bg-secondary transition-colors"
            aria-label="Share highlight"
          >
            <Share2 className="w-4 h-4 text-text-secondary" />
          </button>
        </div>

        {highlight.description && (
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {highlight.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {highlight.type}
            </Badge>
            {highlight.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-1 text-text-tertiary">
            <PrivacyIcon className="w-3.5 h-3.5" />
            <span className="text-xs capitalize">{highlight.privacy}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
