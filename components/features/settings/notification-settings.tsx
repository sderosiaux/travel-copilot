'use client'

import { useState } from 'react'
import { Bell, Mail, Smartphone, Clock, Volume2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { NotificationPreferences } from '@/lib/types/notification'

const DEFAULT_PREFERENCES: NotificationPreferences = {
  push: true,
  email: true,
  sms: false,
  categories: {
    disruptions: true,
    reminders: true,
    updates: true,
    marketing: false,
  },
  quietHours: {
    enabled: false,
    start: '22:00',
    end: '08:00',
  },
  frequency: 'instant',
}

export function NotificationSettings() {
  // Initialize notification preferences with defaults (stored locally for now)
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES)
  const [saved, setSaved] = useState(false)

  const handleToggle = (key: keyof Pick<NotificationPreferences, 'push' | 'email' | 'sms'>, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleCategoryToggle = (
    category: keyof NotificationPreferences['categories'],
    value: boolean
  ) => {
    setPreferences(prev => ({
      ...prev,
      categories: { ...prev.categories, [category]: value },
    }))
  }

  const handleQuietHoursToggle = (enabled: boolean) => {
    setPreferences(prev => ({
      ...prev,
      quietHours: { ...prev.quietHours, enabled },
    }))
  }

  const handleQuietHoursChange = (field: 'start' | 'end', value: string) => {
    setPreferences(prev => ({
      ...prev,
      quietHours: { ...prev.quietHours, [field]: value },
    }))
  }

  const handleFrequencyChange = (frequency: NotificationPreferences['frequency']) => {
    setPreferences(prev => ({ ...prev, frequency }))
  }

  const handleSave = () => {
    // In a real app, this would persist to a store or API
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-text-secondary" />
              <div>
                <Label htmlFor="push-notifications" className="text-base font-medium">
                  Push Notifications
                </Label>
                <p className="text-sm text-text-secondary">
                  Receive notifications on this device
                </p>
              </div>
            </div>
            <Switch
              id="push-notifications"
              checked={preferences.push}
              onCheckedChange={(checked) => handleToggle('push', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-text-secondary" />
              <div>
                <Label htmlFor="email-notifications" className="text-base font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-text-secondary">
                  Receive updates via email
                </p>
              </div>
            </div>
            <Switch
              id="email-notifications"
              checked={preferences.email}
              onCheckedChange={(checked) => handleToggle('email', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-text-secondary" />
              <div>
                <Label htmlFor="sms-notifications" className="text-base font-medium">
                  SMS Notifications
                </Label>
                <p className="text-sm text-text-secondary">
                  Receive critical updates via SMS
                </p>
              </div>
            </div>
            <Switch
              id="sms-notifications"
              checked={preferences.sms}
              onCheckedChange={(checked) => handleToggle('sms', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Categories</CardTitle>
          <CardDescription>
            Control which types of notifications you receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="disruptions" className="text-base font-medium">
                Flight Disruptions
              </Label>
              <p className="text-sm text-text-secondary">
                Delays, cancellations, and gate changes
              </p>
            </div>
            <Switch
              id="disruptions"
              checked={preferences.categories.disruptions}
              onCheckedChange={(checked) => handleCategoryToggle('disruptions', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reminders" className="text-base font-medium">
                Travel Reminders
              </Label>
              <p className="text-sm text-text-secondary">
                Check-in reminders and departure alerts
              </p>
            </div>
            <Switch
              id="reminders"
              checked={preferences.categories.reminders}
              onCheckedChange={(checked) => handleCategoryToggle('reminders', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="updates" className="text-base font-medium">
                Trip Updates
              </Label>
              <p className="text-sm text-text-secondary">
                General updates about your trips
              </p>
            </div>
            <Switch
              id="updates"
              checked={preferences.categories.updates}
              onCheckedChange={(checked) => handleCategoryToggle('updates', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing" className="text-base font-medium">
                Marketing & Promotions
              </Label>
              <p className="text-sm text-text-secondary">
                Travel deals and promotional offers
              </p>
            </div>
            <Switch
              id="marketing"
              checked={preferences.categories.marketing}
              onCheckedChange={(checked) => handleCategoryToggle('marketing', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Quiet Hours</CardTitle>
          <CardDescription>
            Mute non-critical notifications during specific hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-text-secondary" />
              <Label htmlFor="quiet-hours" className="text-base font-medium">
                Enable Quiet Hours
              </Label>
            </div>
            <Switch
              id="quiet-hours"
              checked={preferences.quietHours.enabled}
              onCheckedChange={handleQuietHoursToggle}
            />
          </div>

          {preferences.quietHours.enabled && (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quiet-start">Start Time</Label>
                  <Input
                    id="quiet-start"
                    type="time"
                    value={preferences.quietHours.start}
                    onChange={(e) => handleQuietHoursChange('start', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiet-end">End Time</Label>
                  <Input
                    id="quiet-end"
                    type="time"
                    value={preferences.quietHours.end}
                    onChange={(e) => handleQuietHoursChange('end', e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-text-secondary">
                Critical disruptions will still notify you during quiet hours
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Notification Frequency */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Frequency</CardTitle>
          <CardDescription>
            Control how often you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select value={preferences.frequency} onValueChange={handleFrequencyChange}>
              <SelectTrigger id="frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instant (as they happen)</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Summary</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-text-secondary">
              Critical disruptions are always sent instantly
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sound Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Sound & Vibration</CardTitle>
          <CardDescription>
            Control notification sounds and vibration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-text-secondary" />
              <div>
                <Label htmlFor="sound" className="text-base font-medium">
                  Notification Sound
                </Label>
                <p className="text-sm text-text-secondary">
                  Play sound for new notifications
                </p>
              </div>
            </div>
            <Switch id="sound" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-sm text-success animate-in fade-in duration-200">
            Preferences saved
          </span>
        )}
        <Button variant="primary" onClick={handleSave}>
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
