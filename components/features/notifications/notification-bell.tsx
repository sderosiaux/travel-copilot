'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNotificationStore } from '@/lib/store/notification-store'
import { useUIStore } from '@/lib/store/ui-store'
import { cn } from '@/lib/utils'

interface NotificationBellProps {
  className?: string
}

export function NotificationBell({ className }: NotificationBellProps) {
  const { unreadCount } = useNotificationStore()
  const { showNotifications, toggleNotifications } = useUIStore()

  const handleClick = () => {
    toggleNotifications()
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label="Notifications"
      className={cn('relative', showNotifications && 'bg-bg-secondary', className)}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <>
          {/* Badge with count */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-error text-white text-xs font-semibold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
          {/* Pulse animation for new notifications */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 animate-ping rounded-full bg-error opacity-75" />
        </>
      )}
    </Button>
  )
}
