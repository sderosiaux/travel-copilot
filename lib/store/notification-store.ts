import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Notification } from '@/lib/types/notification'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number

  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read' | 'dismissed'>) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  dismissNotification: (notificationId: string) => void
  clearAll: () => void
  clearDismissed: () => void

  // Computed
  getUnreadNotifications: () => Notification[]
  getNotificationsByType: (type: Notification['type']) => Notification[]
  getNotificationsBySeverity: (severity: Notification['severity']) => Notification[]
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          read: false,
          dismissed: false,
        }

        set((state) => {
          const updatedNotifications = [newNotification, ...state.notifications]
          const unreadCount = updatedNotifications.filter(n => !n.read && !n.dismissed).length

          return {
            notifications: updatedNotifications,
            unreadCount,
          }
        })

        // TODO: Play notification sound
        // TODO: Show toast notification
      },

      markAsRead: (notificationId) =>
        set((state) => {
          const updatedNotifications = state.notifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification
          )
          const unreadCount = updatedNotifications.filter(n => !n.read && !n.dismissed).length

          return {
            notifications: updatedNotifications,
            unreadCount,
          }
        }),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            read: true,
          })),
          unreadCount: 0,
        })),

      dismissNotification: (notificationId) =>
        set((state) => {
          const updatedNotifications = state.notifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, dismissed: true, read: true }
              : notification
          )
          const unreadCount = updatedNotifications.filter(n => !n.read && !n.dismissed).length

          return {
            notifications: updatedNotifications,
            unreadCount,
          }
        }),

      clearAll: () =>
        set({
          notifications: [],
          unreadCount: 0,
        }),

      clearDismissed: () =>
        set((state) => {
          const updatedNotifications = state.notifications.filter(n => !n.dismissed)
          const unreadCount = updatedNotifications.filter(n => !n.read && !n.dismissed).length

          return {
            notifications: updatedNotifications,
            unreadCount,
          }
        }),

      // Computed
      getUnreadNotifications: () => {
        const { notifications } = get()
        return notifications.filter((n) => !n.read && !n.dismissed)
      },

      getNotificationsByType: (type) => {
        const { notifications } = get()
        return notifications.filter((n) => n.type === type && !n.dismissed)
      },

      getNotificationsBySeverity: (severity) => {
        const { notifications } = get()
        return notifications.filter((n) => n.severity === severity && !n.dismissed)
      },
    }),
    {
      name: 'travel-copilot-notifications',
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
      }),
    }
  )
)
