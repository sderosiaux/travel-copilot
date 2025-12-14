'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, CheckCheck, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui-store'
import { useNotificationStore } from '@/lib/store/notification-store'
import { NotificationItem } from './notification-item'
import { EmptyState } from '@/components/shared/empty-state'
import type { Notification } from '@/lib/types/notification'

export function NotificationPanel() {
  const router = useRouter()
  const { showNotifications, toggleNotifications } = useUIStore()
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    clearAll,
    getUnreadNotifications,
  } = useNotificationStore()

  const unreadNotifications = getUnreadNotifications()
  const visibleNotifications = notifications.filter((n) => !n.dismissed)

  useEffect(() => {
    // Close panel on route change
    const handleRouteChange = () => {
      if (showNotifications) {
        toggleNotifications()
      }
    }

    // Listen for route changes (simplified for demo)
    return () => {
      handleRouteChange()
    }
  }, [showNotifications, toggleNotifications])

  const handleActionClick = (notification: Notification) => {
    if (notification.actionUrl) {
      router.push(notification.actionUrl)
      toggleNotifications()
    }
  }

  if (!showNotifications) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={toggleNotifications}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed top-16 right-0 z-50 h-[calc(100vh-4rem)] w-full max-w-md border-l border-border bg-bg-primary shadow-2xl transition-transform duration-300',
          showNotifications ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
          <div className="flex items-center gap-2">
            {visibleNotifications.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadNotifications.length === 0}
                  className="h-8 gap-2"
                >
                  <CheckCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Mark all read</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="h-8 gap-2 text-error hover:text-error"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Clear all</span>
                </Button>
                <Separator orientation="vertical" className="h-6" />
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleNotifications}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {visibleNotifications.length === 0 ? (
            <div className="flex items-center justify-center h-full p-8">
              <EmptyState
                title="No notifications"
                description="You're all caught up! We'll notify you when something important happens."
                icon="bell"
              />
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <div className="sticky top-0 z-10 bg-bg-primary border-b border-border">
                <TabsList className="w-full justify-start rounded-none h-12 bg-transparent p-0">
                  <TabsTrigger
                    value="all"
                    className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary-500"
                  >
                    All
                    {visibleNotifications.length > 0 && (
                      <span className="ml-2 text-xs text-text-tertiary">
                        {visibleNotifications.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary-500"
                  >
                    Unread
                    {unreadNotifications.length > 0 && (
                      <span className="ml-2 rounded-full bg-error px-1.5 py-0.5 text-xs text-white">
                        {unreadNotifications.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="disruptions"
                    className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary-500"
                  >
                    Disruptions
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="m-0 p-4 space-y-3">
                {visibleNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onDismiss={dismissNotification}
                    onRead={markAsRead}
                    onActionClick={handleActionClick}
                  />
                ))}
              </TabsContent>

              <TabsContent value="unread" className="m-0 p-4 space-y-3">
                {unreadNotifications.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <EmptyState
                      title="No unread notifications"
                      description="All notifications have been read."
                      icon="check"
                    />
                  </div>
                ) : (
                  unreadNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onDismiss={dismissNotification}
                      onRead={markAsRead}
                      onActionClick={handleActionClick}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="disruptions" className="m-0 p-4 space-y-3">
                {visibleNotifications.filter((n) => n.type === 'disruption').length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <EmptyState
                      title="No disruptions"
                      description="All your flights are on schedule."
                      icon="plane"
                    />
                  </div>
                ) : (
                  visibleNotifications
                    .filter((n) => n.type === 'disruption')
                    .map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onDismiss={dismissNotification}
                        onRead={markAsRead}
                        onActionClick={handleActionClick}
                      />
                    ))
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </>
  )
}
