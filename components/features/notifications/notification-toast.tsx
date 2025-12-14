'use client'

import { useEffect, useState } from 'react'
import { X, AlertTriangle, Bell, Info, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Notification } from '@/lib/types/notification'

interface NotificationToastProps {
  notification: Notification
  onDismiss: () => void
  duration?: number // Auto-dismiss duration in ms (0 = no auto-dismiss)
}

const typeIcons = {
  disruption: AlertTriangle,
  reminder: Bell,
  update: Info,
  action_required: AlertCircle,
}

const severityStyles = {
  low: 'border-info bg-info/10',
  medium: 'border-warning bg-warning/10',
  high: 'border-warning bg-warning/10',
  critical: 'border-error bg-error/10',
}

const iconStyles = {
  low: 'text-info',
  medium: 'text-warning',
  high: 'text-warning',
  critical: 'text-error',
}

export function NotificationToast({
  notification,
  onDismiss,
  duration = 5000,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const Icon = typeIcons[notification.type]

  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => setIsVisible(true), 10)

    // Auto-dismiss for non-critical notifications
    let dismissTimer: NodeJS.Timeout | null = null
    if (duration > 0 && notification.severity !== 'critical') {
      dismissTimer = setTimeout(() => {
        handleDismiss()
      }, duration)
    }

    // TODO: Play notification sound based on severity
    // playNotificationSound(notification.severity)

    return () => {
      clearTimeout(showTimer)
      if (dismissTimer) clearTimeout(dismissTimer)
    }
  }, [duration, notification.severity])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => {
      onDismiss()
    }, 300) // Match animation duration
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 w-full max-w-md transform transition-all duration-300',
        isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <div
        className={cn(
          'flex gap-3 rounded-lg border-l-4 p-4 shadow-lg backdrop-blur-sm bg-bg-primary',
          severityStyles[notification.severity]
        )}
      >
        {/* Icon */}
        <div className={cn('flex-shrink-0 mt-0.5', iconStyles[notification.severity])}>
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-primary mb-1">
            {notification.title}
          </h4>
          <p className="text-sm text-text-secondary">
            {notification.message}
          </p>
          {notification.actionLabel && (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 mt-2 text-xs"
              onClick={() => {
                // TODO: Navigate to action URL
                handleDismiss()
              }}
            >
              {notification.actionLabel}
            </Button>
          )}
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 h-6 w-6"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

/**
 * Toast container for managing multiple toasts
 */
interface NotificationToastContainerProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
  maxToasts?: number
}

export function NotificationToastContainer({
  notifications,
  onDismiss,
  maxToasts = 3,
}: NotificationToastContainerProps) {
  // Only show the most recent toasts
  const toastsToShow = notifications.slice(0, maxToasts)

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toastsToShow.map((notification, index) => (
        <div
          key={notification.id}
          style={{
            transform: `translateY(${index * -8}px)`,
            zIndex: 50 - index,
          }}
        >
          <NotificationToast
            notification={notification}
            onDismiss={() => onDismiss(notification.id)}
          />
        </div>
      ))}
    </div>
  )
}
