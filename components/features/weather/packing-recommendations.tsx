'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { PackingRecommendation } from '@/types/weather'
import { Shirt, Shield, Backpack, Check } from 'lucide-react'

interface PackingRecommendationsProps {
  recommendations: PackingRecommendation[]
}

const categoryIcons = {
  clothing: Shirt,
  protection: Shield,
  accessories: Check,
  gear: Backpack,
}

const priorityVariants = {
  essential: { variant: 'error' as const, label: 'Essential' },
  recommended: { variant: 'warning' as const, label: 'Recommended' },
  optional: { variant: 'default' as const, label: 'Optional' },
}

export function PackingRecommendations({ recommendations }: PackingRecommendationsProps) {
  const groupedByCategory = recommendations.reduce(
    (acc, rec) => {
      if (!acc[rec.category]) {
        acc[rec.category] = []
      }
      acc[rec.category].push(rec)
      return acc
    },
    {} as Record<string, PackingRecommendation[]>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-text-primary">Packing Recommendations</CardTitle>
        <p className="text-sm text-text-secondary mt-1">
          Based on the weather forecast for your destination
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedByCategory).map(([category, items]) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons]

          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="h-5 w-5 text-primary-600" />
                <h4 className="font-semibold text-text-primary capitalize">
                  {category}
                </h4>
              </div>
              <div className="space-y-2">
                {items.map((item, index) => {
                  const priority = priorityVariants[item.priority]

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors"
                    >
                      <Check className="h-5 w-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-text-primary">{item.item}</span>
                          <Badge variant={priority.variant} className="text-xs">
                            {priority.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">{item.reason}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
