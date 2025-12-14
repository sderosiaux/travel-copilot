'use client'

import { Badge } from '@/components/ui/badge'
import { differenceInMonths, differenceInDays, isPast, parseISO } from 'date-fns'

interface ExpiryBadgeProps {
  expiryDate?: string
  status?: 'valid' | 'expiring_soon' | 'expired' | 'pending'
  showDaysRemaining?: boolean
}

export function ExpiryBadge({ expiryDate, status, showDaysRemaining = false }: ExpiryBadgeProps) {
  if (!expiryDate) {
    if (status === 'pending') {
      return (
        <Badge variant="default" className="bg-gray-100 text-gray-600 border-gray-200">
          Pending
        </Badge>
      )
    }
    return null
  }

  const expiry = parseISO(expiryDate)
  const now = new Date()
  const isExpired = isPast(expiry)
  const monthsRemaining = differenceInMonths(expiry, now)
  const daysRemaining = differenceInDays(expiry, now)

  if (isExpired) {
    return (
      <Badge variant="error" className="bg-error text-white border-error">
        Expired
      </Badge>
    )
  }

  if (monthsRemaining < 6) {
    return (
      <Badge variant="error" className="bg-error text-white border-error">
        {showDaysRemaining && daysRemaining > 0 ? `${daysRemaining}d remaining` : 'Expires soon'}
      </Badge>
    )
  }

  if (monthsRemaining < 12) {
    return (
      <Badge variant="warning" className="bg-warning text-warning-dark border-warning">
        {showDaysRemaining ? `${monthsRemaining}mo remaining` : 'Expiring'}
      </Badge>
    )
  }

  return (
    <Badge variant="success" className="bg-success-light text-success-dark border-success">
      Valid
    </Badge>
  )
}
