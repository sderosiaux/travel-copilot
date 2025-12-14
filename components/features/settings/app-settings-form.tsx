'use client'

import { useState, useEffect } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import {
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Card,
} from '@/components/ui'
import { useUserStore } from '@/lib/store/user-store'
import { useTheme } from '@/lib/hooks/use-theme'
import type { UserSettings } from '@/types'

const MODE_OPTIONS = [
  {
    value: 'essential',
    label: 'Essential',
    description: 'Simplified with larger elements',
    icon: '🎯',
  },
  {
    value: 'standard',
    label: 'Standard',
    description: 'Balanced experience',
    icon: '⚖️',
  },
  {
    value: 'expert',
    label: 'Expert',
    description: 'Dense layout with more info',
    icon: '🚀',
  },
]

export function AppSettingsForm() {
  const user = useUserStore((state) => state.user)
  const updateSettings = useUserStore((state) => state.updateSettings)
  const { theme, setTheme } = useTheme()

  const [settings, setSettings] = useState<Partial<UserSettings>>(
    user?.settings || {}
  )
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user?.settings) {
      setSettings(user.settings)
    }
  }, [user])

  const handleChange = (field: keyof UserSettings, value: any) => {
    const newSettings = { ...settings, [field]: value }
    setSettings(newSettings)
    updateSettings({ [field]: value })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base mb-3 block">Experience Mode</Label>
          <p className="text-sm text-text-secondary mb-4">
            Choose how much information and features to display
          </p>
          <div className="grid grid-cols-3 gap-3">
            {MODE_OPTIONS.map((mode) => (
              <Card
                key={mode.value}
                className={`p-4 cursor-pointer transition-all hover:border-primary-500 ${
                  settings.experienceMode === mode.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : ''
                }`}
                onClick={() => handleChange('experienceMode', mode.value)}
              >
                <div className="text-2xl mb-2">{mode.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{mode.label}</h4>
                <p className="text-xs text-text-secondary">{mode.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base mb-3 block">Theme</Label>
          <RadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value as any)}
            className="grid grid-cols-3 gap-2"
          >
            {[
              { value: 'light', label: 'Light', icon: Sun },
              { value: 'dark', label: 'Dark', icon: Moon },
              { value: 'system', label: 'System', icon: Monitor },
            ].map((option) => (
              <Label
                key={option.value}
                htmlFor={`theme-${option.value}`}
                className="flex items-center gap-3 px-4 py-3 border border-border rounded-lg cursor-pointer hover:bg-bg-secondary transition-colors"
              >
                <RadioGroupItem
                  id={`theme-${option.value}`}
                  value={option.value}
                />
                <option.icon className="h-4 w-4" />
                <span className="text-sm">{option.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={settings.language}
              onValueChange={(value) => handleChange('language', value)}
            >
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="fr-FR">Français</SelectItem>
                <SelectItem value="de-DE">Deutsch</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={settings.currency}
              onValueChange={(value) => handleChange('currency', value)}
            >
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="distanceUnit">Distance Unit</Label>
            <Select
              value={settings.distanceUnit}
              onValueChange={(value) => handleChange('distanceUnit', value as any)}
            >
              <SelectTrigger id="distanceUnit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km">Kilometers</SelectItem>
                <SelectItem value="miles">Miles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeFormat">Time Format</Label>
            <Select
              value={settings.timeFormat}
              onValueChange={(value) => handleChange('timeFormat', value as any)}
            >
              <SelectTrigger id="timeFormat">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12-hour</SelectItem>
                <SelectItem value="24h">24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <Label className="text-base">Features & Integrations</Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="calendar" className="font-medium">
                  Calendar Integration
                </Label>
                <p className="text-sm text-text-secondary">
                  Sync trips with your calendar
                </p>
              </div>
              <Switch
                id="calendar"
                checked={settings.calendarIntegration}
                onCheckedChange={(checked) =>
                  handleChange('calendarIntegration', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pattern" className="font-medium">
                  Pattern Recognition
                </Label>
                <p className="text-sm text-text-secondary">
                  Learn from your booking history
                </p>
              </div>
              <Switch
                id="pattern"
                checked={settings.patternRecognition}
                onCheckedChange={(checked) =>
                  handleChange('patternRecognition', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="deals" className="font-medium">
                  Deal Alerts
                </Label>
                <p className="text-sm text-text-secondary">
                  Get notified about flight deals
                </p>
              </div>
              <Switch
                id="deals"
                checked={settings.dealAlerts}
                onCheckedChange={(checked) => handleChange('dealAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="location" className="font-medium">
                  Location Sharing
                </Label>
                <p className="text-sm text-text-secondary">
                  Share location for better recommendations
                </p>
              </div>
              <Switch
                id="location"
                checked={settings.locationSharing}
                onCheckedChange={(checked) =>
                  handleChange('locationSharing', checked)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {saved && (
        <div className="text-sm text-success animate-in fade-in duration-200">
          Settings saved automatically
        </div>
      )}
    </div>
  )
}
