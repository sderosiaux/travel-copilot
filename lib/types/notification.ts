export interface Notification {
  id: string
  type: 'disruption' | 'reminder' | 'update' | 'action_required'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  message: string
  tripId?: string
  flightId?: string
  actionUrl?: string
  actionLabel?: string
  read: boolean
  dismissed: boolean
  createdAt: string
}

export interface NotificationPreferences {
  push: boolean
  email: boolean
  sms: boolean
  categories: {
    disruptions: boolean
    reminders: boolean
    updates: boolean
    marketing: boolean
  }
  quietHours: {
    enabled: boolean
    start: string // HH:mm format
    end: string   // HH:mm format
  }
  frequency: 'instant' | 'hourly' | 'daily'
}
