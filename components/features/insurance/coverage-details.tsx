'use client'

import { ShieldCheck, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'
import type { CoverageDetails } from '@/types/insurance'

interface CoverageDetailsProps {
  coverage: CoverageDetails
}

export function CoverageDetailsComponent({ coverage }: CoverageDetailsProps) {
  const coverageItems = [
    { key: 'medicalExpenses', label: 'Medical Expenses', details: coverage.medicalExpenses },
    { key: 'emergencyEvacuation', label: 'Emergency Evacuation', details: coverage.emergencyEvacuation },
    { key: 'tripCancellation', label: 'Trip Cancellation', details: coverage.tripCancellation },
    { key: 'tripInterruption', label: 'Trip Interruption', details: coverage.tripInterruption },
    { key: 'baggageLoss', label: 'Baggage Loss', details: coverage.baggageLoss },
    { key: 'baggageDelay', label: 'Baggage Delay', details: coverage.baggageDelay },
    { key: 'flightDelay', label: 'Flight Delay', details: coverage.flightDelay },
    { key: 'personalLiability', label: 'Personal Liability', details: coverage.personalLiability },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary-500" />
            Coverage Limits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coverageItems.map((item) => (
              <div
                key={item.key}
                className="flex items-start justify-between p-4 rounded-lg bg-bg-secondary border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-text-primary">{item.label}</h4>
                    {item.details.covered ? (
                      <Badge className="bg-success/10 text-success border-success/20">
                        Covered
                      </Badge>
                    ) : (
                      <Badge className="bg-error/10 text-error border-error/20">
                        Not Covered
                      </Badge>
                    )}
                  </div>
                  {item.details.covered && (
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-text-secondary">
                        Max: {item.details.currency} {item.details.maxAmount.toLocaleString()}
                      </p>
                      {item.details.deductible && (
                        <p className="text-sm text-text-secondary">
                          Deductible: {item.details.currency} {item.details.deductible}
                        </p>
                      )}
                      {item.details.notes && (
                        <p className="text-sm text-text-tertiary italic">{item.details.notes}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {coverage.additionalBenefits && coverage.additionalBenefits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {coverage.additionalBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                  <ShieldCheck className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {coverage.exclusions && coverage.exclusions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Exclusions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {coverage.exclusions.map((exclusion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>{exclusion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
