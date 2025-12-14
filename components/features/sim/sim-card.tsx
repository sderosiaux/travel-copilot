'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { SimOption } from '@/types/sim'
import { Smartphone, Signal, Globe, Star, ChevronRight } from 'lucide-react'

interface SimCardProps {
  option: SimOption
  onSelect: (option: SimOption) => void
}

export function SimCard({ option, onSelect }: SimCardProps) {
  const bestPlan = option.dataPlans.reduce((prev, current) =>
    prev.price < current.price ? prev : current
  )

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:border-primary-500 cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary-500 transition-colors">
                {option.name}
              </h3>
              <Badge variant={option.type === 'esim' ? 'success' : 'default'}>
                {option.type === 'esim' ? 'eSIM' : 'Physical'}
              </Badge>
            </div>
            <div className="text-sm text-text-secondary">{option.provider}</div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-warning-500 fill-warning-500" />
            <span className="text-sm font-semibold text-text-primary">
              {option.rating}
            </span>
            <span className="text-xs text-text-tertiary">
              ({option.reviewCount})
            </span>
          </div>
        </div>
        <p className="text-sm text-text-secondary">{option.description}</p>
      </CardHeader>

      <CardContent>
        <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-primary-600">
              {bestPlan.currency} {bestPlan.price}
            </span>
            <span className="text-sm text-text-secondary">from</span>
          </div>
          <div className="text-sm text-text-secondary">
            {bestPlan.data} • {bestPlan.duration}
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Signal className="h-4 w-4 text-primary-600" />
            <span className="text-text-secondary">Coverage:</span>
            <Badge variant="default" className="text-xs">
              {option.coverage.level}
            </Badge>
            <span className="text-text-tertiary">
              {option.coverage.networkTypes.join(', ')}
            </span>
          </div>

          {option.countries.length > 1 && (
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-primary-600" />
              <span className="text-text-secondary">
                Works in {option.countries.length} countries
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Smartphone className="h-4 w-4 text-primary-600" />
            <span className="text-text-secondary">
              Activation: {option.activationTime}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs font-semibold text-text-secondary mb-2">
            Best for:
          </div>
          <div className="flex flex-wrap gap-1">
            {option.bestFor.map((tag) => (
              <Badge key={tag} variant="default" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          className="w-full group"
          onClick={() => onSelect(option)}
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )
}
