'use client'

import { AlertTriangle, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Disruption } from '@/types/disruption'

interface DisruptionAlertProps {
  disruption: Disruption
  onDismiss?: () => void
  onViewDetails?: () => void
  className?: string
}

const severityStyles = {
  low: 'border-info bg-info/10',
  medium: 'border-warning bg-warning/10',
  high: 'border-warning bg-warning/10',
  critical: 'border-error bg-error/10',
}

const severityBadges = {
  low: 'info',
  medium: 'warning',
  high: 'warning',
  critical: 'error',
} as const

const typeLabels: Record<Disruption['type'], string> = {
  cancellation: 'Flight Cancelled',
  delay: 'Flight Delayed',
  gate_change: 'Gate Change',
  terminal_change: 'Terminal Change',
  missed_connection: 'Connection Risk',
  aircraft_change: 'Aircraft Change',
  other: 'Travel Alert',
}

export function DisruptionAlert({
  disruption,
  onDismiss,
  onViewDetails,
  className,
}: DisruptionAlertProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg border-l-4 p-4 shadow-sm',
        severityStyles[disruption.severity],
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-shrink-0">
            <AlertTriangle
              className={cn(
                'h-5 w-5',
                disruption.severity === 'critical' && 'text-error',
                disruption.severity === 'high' && 'text-warning',
                disruption.severity === 'medium' && 'text-warning',
                disruption.severity === 'low' && 'text-info'
              )}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-text-primary">
                {typeLabels[disruption.type]}
              </h3>
              <Badge variant={severityBadges[disruption.severity]}>
                {disruption.severity}
              </Badge>
            </div>
            <p className="text-sm text-text-secondary">
              {disruption.details.impact}
            </p>
          </div>
        </div>

        {/* Dismiss button */}
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="flex-shrink-0 h-6 w-6"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Details */}
      {disruption.details.reason && (
        <p className="text-sm text-text-secondary mb-3 ml-8">
          <span className="font-medium">Reason:</span> {disruption.details.reason}
        </p>
      )}

      {/* Change information */}
      {disruption.details.originalValue && disruption.details.newValue && (
        <div className="flex items-center gap-2 text-sm mb-3 ml-8">
          <span className="text-text-tertiary">{disruption.details.originalValue}</span>
          <ArrowRight className="h-4 w-4 text-text-tertiary" />
          <span className="font-medium text-text-primary">{disruption.details.newValue}</span>
        </div>
      )}

      {/* Recommended actions */}
      {disruption.actions.recommended.length > 0 && (
        <div className="ml-8 mb-3">
          <p className="text-xs font-medium text-text-primary mb-1">Recommended actions:</p>
          <ul className="text-xs text-text-secondary space-y-1">
            {disruption.actions.recommended.slice(0, 2).map((action, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 ml-8">
        {onViewDetails && (
          <Button
            variant="primary"
            size="sm"
            onClick={onViewDetails}
            className="gap-2"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        {/* Rebooking options */}
        {disruption.actions.available.length > 0 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onViewDetails}
          >
            {disruption.actions.available.length} Rebooking Option
            {disruption.actions.available.length !== 1 ? 's' : ''}
          </Button>
        )}
      </div>

      {/* Compensation indicator */}
      {disruption.compensation?.eligibility.eligible && (
        <div className="mt-3 ml-8 pt-3 border-t border-border">
          <p className="text-xs text-success font-medium">
            You may be eligible for compensation up to{' '}
            {disruption.compensation.eligibility.estimatedAmount?.currency}{' '}
            {disruption.compensation.eligibility.estimatedAmount?.amount}
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * Compact version for inline display
 */
interface DisruptionAlertCompactProps {
  disruption: Disruption
  onClick?: () => void
  className?: string
}

export function DisruptionAlertCompact({
  disruption,
  onClick,
  className,
}: DisruptionAlertCompactProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left rounded-lg border-l-4 p-3 transition-all hover:shadow-sm',
        severityStyles[disruption.severity],
        onClick && 'cursor-pointer hover:bg-bg-secondary',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className="h-4 w-4 flex-shrink-0 text-error" />
        <span className="font-semibold text-sm text-text-primary">
          {typeLabels[disruption.type]}
        </span>
        <Badge variant={severityBadges[disruption.severity]} className="ml-auto">
          {disruption.severity}
        </Badge>
      </div>
      <p className="text-xs text-text-secondary ml-6">
        {disruption.details.impact}
      </p>
    </button>
  )
}
