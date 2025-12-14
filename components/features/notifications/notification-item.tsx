'use client'

import { X, AlertTriangle, Bell, Info, AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Notification } from '@/lib/types/notification'

interface NotificationItemProps {
  notification: Notification
  onDismiss: (id: string) => void
  onRead: (id: string) => void
  onActionClick?: (notification: Notification) => void
}

const typeIcons = {
  disruption: AlertTriangle,
  reminder: Bell,
  update: Info,
  action_required: AlertCircle,
}

const severityColors = {
  low: 'text-info',
  medium: 'text-warning',
  high: 'text-warning',
  critical: 'text-error',
}

const severityBadges = {
  low: 'info',
  medium: 'warning',
  high: 'warning',
  critical: 'error',
} as const

export function NotificationItem({
  notification,
  onDismiss,
  onRead,
  onActionClick,
}: NotificationItemProps) {
  const Icon = typeIcons[notification.type]
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })

  const handleClick = () => {
    if (!notification.read) {
      onRead(notification.id)
    }
    if (notification.actionUrl && onActionClick) {
      onActionClick(notification)
    }
  }

  return (
    <div
      className={cn(
        'group relative flex gap-3 rounded-lg border border-border p-4 transition-all hover:bg-bg-secondary',
        !notification.read && 'bg-primary-50/5 border-primary-500/20',
        notification.actionUrl && 'cursor-pointer'
      )}
      onClick={notification.actionUrl ? handleClick : undefined}
    >
      {/* Icon */}
      <div className={cn('flex-shrink-0 mt-0.5', severityColors[notification.severity])}>
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-text-primary">
              {notification.title}
            </h4>
            {!notification.read && (
              <span className="inline-block h-2 w-2 rounded-full bg-primary-500" />
            )}
          </div>
          <Badge variant={severityBadges[notification.severity]} className="flex-shrink-0">
            {notification.severity}
          </Badge>
        </div>

        {/* Message */}
        <p className="text-sm text-text-secondary mb-2">
          {notification.message}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-text-tertiary">{timeAgo}</span>

          {notification.actionLabel && notification.actionUrl && (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                onActionClick?.(notification)
              }}
            >
              {notification.actionLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Dismiss button */}
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation()
          onDismiss(notification.id)
        }}
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
