'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { AlternativeOption } from '@/types/alternative'
import { Check, X, ChevronRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AlternativeCardProps {
  option: AlternativeOption
  onSelect?: (option: AlternativeOption) => void
  onViewDetails?: (option: AlternativeOption) => void
  onCompare?: (option: AlternativeOption) => void
  selected?: boolean
}

export function AlternativeCard({
  option,
  onSelect,
  onViewDetails,
  onCompare,
  selected = false,
}: AlternativeCardProps) {
  const formatPrice = (price: number, currency: string = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
    }).format(price)
  }

  const formatPriceDifference = (diff: number, currency: string = 'GBP') => {
    if (diff === 0) return 'No extra cost'
    if (diff > 0) return `+${formatPrice(diff, currency)}`
    return `${formatPrice(diff, currency)} saving`
  }

  return (
    <Card
      className={cn(
        'relative transition-all hover:shadow-md',
        selected && 'ring-2 ring-primary-500',
        option.recommended && 'border-success'
      )}
    >
      {option.recommended && (
        <div className="absolute -top-3 left-4">
          <Badge variant="success" className="gap-1 shadow-sm">
            <Star size={12} className="fill-white" />
            Recommended
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-text-primary">
                {option.title}
              </h3>
              <Badge variant="default" className="text-xs">
                {option.type}
              </Badge>
            </div>
            <p className="text-sm text-text-secondary">{option.description}</p>
            <p className="text-xs text-text-tertiary mt-1">
              Provider: {option.provider}
            </p>
          </div>

          {option.price !== undefined && (
            <div className="text-right">
              <div className="text-2xl font-bold text-text-primary">
                {option.price === 0 ? 'Free' : formatPrice(option.price, option.currency)}
              </div>
              {option.priceDifference !== undefined && option.priceDifference !== 0 && (
                <div
                  className={cn(
                    'text-xs font-medium',
                    option.priceDifference > 0 ? 'text-error' : 'text-success'
                  )}
                >
                  {formatPriceDifference(option.priceDifference, option.currency)}
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pros and Cons */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium text-success flex items-center gap-1">
              <Check size={16} />
              Advantages
            </div>
            <ul className="space-y-1">
              {option.pros.map((pro, index) => (
                <li key={index} className="text-sm text-text-secondary flex items-start gap-2">
                  <Check size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-warning flex items-center gap-1">
              <X size={16} />
              Considerations
            </div>
            <ul className="space-y-1">
              {option.cons.map((con, index) => (
                <li key={index} className="text-sm text-text-secondary flex items-start gap-2">
                  <X size={14} className="text-warning mt-0.5 flex-shrink-0" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Availability */}
        {option.availableUntil && (
          <div className="pt-3 border-t border-border">
            <p className="text-xs text-text-tertiary">
              Available until:{' '}
              {new Date(option.availableUntil).toLocaleString('en-GB', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-2">
          {onSelect && (
            <Button
              variant="primary"
              size="md"
              onClick={() => onSelect(option)}
              className="flex-1"
            >
              Select This Option
            </Button>
          )}
          {onViewDetails && (
            <Button
              variant="secondary"
              size="md"
              onClick={() => onViewDetails(option)}
            >
              View Details
              <ChevronRight size={16} />
            </Button>
          )}
          {onCompare && option.type === 'rebooking' && (
            <Button
              variant="ghost"
              size="md"
              onClick={() => onCompare(option)}
            >
              Compare
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
