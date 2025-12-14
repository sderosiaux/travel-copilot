'use client'

import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/lib/api/users'
import { getUpcomingTrips } from '@/lib/api/trips'
import { generateSuggestions, type CopilotSuggestion } from '@/components/features/dashboard'
import type { User, Trip } from '@/types'

interface UseDashboardResult {
  user: User | undefined
  upcomingTrips: Trip[]
  suggestions: CopilotSuggestion[]
  isLoading: boolean
  error: Error | null
}

export function useDashboard(userId: string): UseDashboardResult {
  // Fetch user data
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  })

  // Fetch upcoming trips
  const {
    data: upcomingTrips = [],
    isLoading: isLoadingTrips,
    error: tripsError,
  } = useQuery({
    queryKey: ['trips', 'upcoming', userId],
    queryFn: () => getUpcomingTrips(userId),
    enabled: !!userId,
  })

  // Generate suggestions based on trips
  const suggestions = upcomingTrips.length > 0 ? generateSuggestions(upcomingTrips) : []

  return {
    user,
    upcomingTrips,
    suggestions,
    isLoading: isLoadingUser || isLoadingTrips,
    error: (userError || tripsError) as Error | null,
  }
}
