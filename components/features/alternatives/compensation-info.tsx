'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { AlternativeOption } from '@/types/alternative'
import {
  Euro,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Info,
} from 'lucide-react'

interface CompensationInfoProps {
  option: AlternativeOption
  onClaim?: (option: AlternativeOption) => void
}

export function CompensationInfo({ option, onClaim }: CompensationInfoProps) {
  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      dateStyle: 'long',
    })
  }

  return (
    <div className="space-y-6">
      {/* Main Info Card */}
      <Card variant="success" padding="lg" className="border-2">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-success/20 rounded-full">
            <Euro size={24} className="text-success" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              {option.title}
            </h3>
            <p className="text-text-secondary mb-4">{option.description}</p>

            {option.details?.eligibleAmount && (
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-success">
                  {formatCurrency(option.details.eligibleAmount, option.currency)}
                </span>
                <Badge variant="success">Estimated Amount</Badge>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Badge variant="info" className="gap-1">
                <Info size={12} />
                {option.details?.compensationType?.toUpperCase() || 'COMPENSATION'}
              </Badge>
              {option.details?.claimDeadline && (
                <Badge variant="warning" className="gap-1">
                  <Clock size={12} />
                  Claim by {formatDate(option.details.claimDeadline)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Compensation Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">
                  Review Your Eligibility
                </h4>
                <p className="text-sm text-text-secondary">
                  Your flight disruption qualifies for compensation under EU261 regulations.
                  This is separate from any refund or rebooking options.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">
                  Automatic Filing
                </h4>
                <p className="text-sm text-text-secondary">
                  Click the button below and we'll automatically file your compensation claim
                  with the airline on your behalf.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">
                  Wait for Processing
                </h4>
                <p className="text-sm text-text-secondary">
                  The airline typically processes claims within 6-8 weeks. We'll track the
                  status and notify you of any updates.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success font-semibold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">
                  Receive Payment
                </h4>
                <p className="text-sm text-text-secondary">
                  Once approved, the compensation will be paid directly to your designated
                  account.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      {option.details?.requiredDocuments && option.details.requiredDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} />
              Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary mb-4">
              These documents will be automatically collected from your trip records:
            </p>
            <ul className="space-y-2">
              {option.details.requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-success" />
                  <span className="text-text-primary">{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Important Notes */}
      <Card variant="info" padding="lg">
        <div className="flex items-start gap-4">
          <AlertCircle size={20} className="text-info flex-shrink-0 mt-0.5" />
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold text-text-primary">Important Notes</h4>
            <ul className="space-y-1 text-text-secondary">
              <li>• Compensation is independent of refunds or rebooking</li>
              <li>• You can claim compensation even if you accept an alternative flight</li>
              <li>• No upfront costs - our service is free</li>
              <li>• Claims can be made up to 6 years after the flight</li>
              <li>• Extraordinary circumstances may affect eligibility</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Action Button */}
      <div className="flex justify-center pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={() => onClaim?.(option)}
          className="gap-2 min-w-64"
        >
          <Euro size={20} />
          File Compensation Claim
        </Button>
      </div>
    </div>
  )
}
