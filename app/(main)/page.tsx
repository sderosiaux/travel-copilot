'use client'

import { useDashboard } from '@/lib/hooks/use-dashboard'
import {
  WelcomeHeader,
  UpcomingTrips,
  QuickActions,
  CopilotSuggestions,
} from '@/components/features/dashboard'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui/card'

// Using Carlos Martinez as the default user for Phase 1
const DEFAULT_USER_ID = 'user-carlos-001'

export default function DashboardPage() {
  const { user, upcomingTrips, suggestions, isLoading, error } = useDashboard(DEFAULT_USER_ID)

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card variant="alert" padding="lg">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-error flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Error Loading Dashboard
              </h2>
              <p className="text-text-secondary">
                {error.message || 'Something went wrong. Please try again later.'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-5 w-48" />
        </div>
      ) : user ? (
        <WelcomeHeader firstName={user.firstName} upcomingTripsCount={upcomingTrips.length} />
      ) : null}

      {/* Upcoming Trips Section */}
      <UpcomingTrips trips={upcomingTrips} isLoading={isLoading} />

      {/* Copilot Suggestions Section */}
      {!isLoading && suggestions.length > 0 && (
        <CopilotSuggestions suggestions={suggestions} />
      )}

      {/* Quick Actions Section */}
      <QuickActions />
    </div>
  )
}
