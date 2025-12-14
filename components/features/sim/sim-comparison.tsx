'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SimOption } from '@/types/sim'
import { Check, X } from 'lucide-react'

interface SimComparisonProps {
  options: SimOption[]
}

export function SimComparison({ options }: SimComparisonProps) {
  if (options.length === 0) {
    return null
  }

  const getBestPlan = (option: SimOption) => {
    return option.dataPlans.reduce((prev, current) =>
      prev.price < current.price ? prev : current
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-text-primary">Compare Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-primary">
                <th className="text-left py-3 px-4 text-text-secondary font-semibold">
                  Provider
                </th>
                {options.map((option) => (
                  <th key={option.id} className="py-3 px-4 text-center">
                    <div className="font-semibold text-text-primary">
                      {option.provider}
                    </div>
                    <div className="text-xs text-text-tertiary mt-1">
                      {option.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-primary">
                <td className="py-3 px-4 text-text-secondary">Type</td>
                {options.map((option) => (
                  <td key={option.id} className="py-3 px-4 text-center">
                    <Badge
                      variant={option.type === 'esim' ? 'success' : 'default'}
                      className="text-xs"
                    >
                      {option.type === 'esim' ? 'eSIM' : 'Physical'}
                    </Badge>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border-primary">
                <td className="py-3 px-4 text-text-secondary">Starting Price</td>
                {options.map((option) => {
                  const plan = getBestPlan(option)
                  return (
                    <td
                      key={option.id}
                      className="py-3 px-4 text-center font-semibold text-primary-600"
                    >
                      {plan.currency} {plan.price}
                    </td>
                  )
                })}
              </tr>

              <tr className="border-b border-border-primary">
                <td className="py-3 px-4 text-text-secondary">Coverage</td>
                {options.map((option) => (
                  <td key={option.id} className="py-3 px-4 text-center">
                    <Badge variant="default" className="text-xs">
                      {option.coverage.level}
                    </Badge>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border-primary">
                <td className="py-3 px-4 text-text-secondary">Network</td>
                {options.map((option) => (
                  <td
                    key={option.id}
                    className="py-3 px-4 text-center text-text-tertiary text-xs"
                  >
                    {option.coverage.networkTypes.join(', ')}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border-primary">
                <td className="py-3 px-4 text-text-secondary">Activation</td>
                {options.map((option) => (
                  <td
                    key={option.id}
                    className="py-3 px-4 text-center text-text-tertiary text-xs"
                  >
                    {option.activationTime}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border-primary">
                <td className="py-3 px-4 text-text-secondary">Rating</td>
                {options.map((option) => (
                  <td key={option.id} className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-semibold text-text-primary">
                        {option.rating}
                      </span>
                      <span className="text-xs text-text-tertiary">
                        ({option.reviewCount})
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-4 text-text-secondary">24/7 Support</td>
                {options.map((option) => (
                  <td key={option.id} className="py-3 px-4 text-center">
                    {option.supportContact.hours?.includes('24/7') ? (
                      <Check className="h-5 w-5 text-success-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-error-600 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
