'use client'

import { format } from 'date-fns'

export interface WelcomeHeaderProps {
  firstName: string
  upcomingTripsCount: number
}

export function WelcomeHeader({ firstName, upcomingTripsCount }: WelcomeHeaderProps) {
  const currentDate = new Date()
  const formattedDate = format(currentDate, 'EEEE, d MMMM yyyy')

  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-text-primary">
        Welcome back, {firstName}
      </h1>
      <p className="text-text-secondary">{formattedDate}</p>
      {upcomingTripsCount > 0 && (
        <p className="mt-2 text-sm text-text-secondary">
          You have{' '}
          <span className="font-semibold text-primary-500">
            {upcomingTripsCount} upcoming {upcomingTripsCount === 1 ? 'trip' : 'trips'}
          </span>
        </p>
      )}
    </div>
  )
}
