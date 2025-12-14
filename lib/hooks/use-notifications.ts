'use client'

import { useEffect, useCallback } from 'react'
import { useNotificationStore } from '@/lib/store/notification-store'
import { useFlightStore } from '@/lib/store/flight-store'
import { detectDisruptions } from '@/lib/services/disruption-detector'
import type { Notification } from '@/lib/types/notification'

/**
 * Hook to manage notifications and disruption detection
 */
export function useNotifications() {
  const { addNotification, notifications, unreadCount, markAsRead, dismissNotification } =
    useNotificationStore()
  const { flights } = useFlightStore()

  /**
   * Check for disruptions in flights and create notifications
   */
  const checkForDisruptions = useCallback(() => {
    const result = detectDisruptions(flights)

    if (result.hasDisruptions) {
      result.disruptions.forEach((disruption) => {
        // Check if we already have a notification for this disruption
        const existingNotification = notifications.find(
          (n) =>
            n.flightId === disruption.flightId &&
            n.type === 'disruption' &&
            n.title === disruption.title
        )

        // Only add if we don't already have this notification
        if (!existingNotification) {
          addNotification({
            type: 'disruption',
            severity: disruption.severity,
            title: disruption.title,
            message: disruption.message,
            flightId: disruption.flightId,
            actionUrl: `/flights/${disruption.flightId}`,
            actionLabel: 'View Details',
          })
        }
      })
    }
  }, [flights, notifications, addNotification])

  /**
   * Add a custom notification
   */
  const addCustomNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'createdAt' | 'read' | 'dismissed'>) => {
      addNotification(notification)
    },
    [addNotification]
  )

  /**
   * Mark notification as read
   */
  const markRead = useCallback(
    (notificationId: string) => {
      markAsRead(notificationId)
    },
    [markAsRead]
  )

  /**
   * Dismiss notification
   */
  const dismiss = useCallback(
    (notificationId: string) => {
      dismissNotification(notificationId)
    },
    [dismissNotification]
  )

  /**
   * Get unread notifications
   */
  const unreadNotifications = notifications.filter((n) => !n.read && !n.dismissed)

  /**
   * Get critical notifications
   */
  const criticalNotifications = notifications.filter(
    (n) => n.severity === 'critical' && !n.dismissed
  )

  return {
    notifications,
    unreadCount,
    unreadNotifications,
    criticalNotifications,
    checkForDisruptions,
    addNotification: addCustomNotification,
    markAsRead: markRead,
    dismissNotification: dismiss,
  }
}

/**
 * Hook to automatically check for disruptions at intervals
 */
export function useDisruptionMonitoring(intervalMs: number = 60000) {
  const { checkForDisruptions } = useNotifications()

  useEffect(() => {
    // Check immediately on mount
    checkForDisruptions()

    // Then check at intervals
    const interval = setInterval(() => {
      checkForDisruptions()
    }, intervalMs)

    return () => clearInterval(interval)
  }, [checkForDisruptions, intervalMs])
}
