'use client'

import { CloudOff, Wifi, Database } from 'lucide-react'
import { useOfflineStore } from '@/lib/store/offline-store'
import {
  Label,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  Slider,
} from '@/components/ui'
import { ServiceWorkerStatus, SyncStatus, CacheManagement, OfflineCapabilities } from '../offline'

export function OfflineSettings() {
  const settings = useOfflineStore((state) => state.settings)
  const updateSettings = useOfflineStore((state) => state.updateSettings)

  const handleChange = (field: keyof typeof settings, value: any) => {
    updateSettings({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Offline Mode Settings
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Configure how the app works when you're offline
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CloudOff className="h-5 w-5 text-text-secondary" />
              <div>
                <Label htmlFor="offline-enabled" className="font-medium">
                  Enable Offline Mode
                </Label>
                <p className="text-sm text-text-secondary">
                  Access your data without internet
                </p>
              </div>
            </div>
            <Switch
              id="offline-enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => handleChange('enabled', checked)}
            />
          </div>
        </Card>

        {settings.enabled && (
          <>
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">Sync Settings</h4>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-sync" className="font-medium">
                    Automatic Sync
                  </Label>
                  <p className="text-sm text-text-secondary">
                    Sync data automatically in the background
                  </p>
                </div>
                <Switch
                  id="auto-sync"
                  checked={settings.autoSync}
                  onCheckedChange={(checked) => handleChange('autoSync', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wifi className="h-5 w-5 text-text-secondary" />
                  <div>
                    <Label htmlFor="sync-wifi" className="font-medium">
                      Sync Only on Wi-Fi
                    </Label>
                    <p className="text-sm text-text-secondary">
                      Save mobile data by syncing only on Wi-Fi
                    </p>
                  </div>
                </div>
                <Switch
                  id="sync-wifi"
                  checked={settings.syncOnWifi}
                  onCheckedChange={(checked) => handleChange('syncOnWifi', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sync-interval">Sync Interval</Label>
                <Select
                  value={settings.syncInterval.toString()}
                  onValueChange={(value) =>
                    handleChange('syncInterval', parseInt(value))
                  }
                >
                  <SelectTrigger id="sync-interval">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">Every 15 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                    <SelectItem value="60">Every hour</SelectItem>
                    <SelectItem value="180">Every 3 hours</SelectItem>
                    <SelectItem value="360">Every 6 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-text-primary flex items-center gap-2">
                <Database className="h-5 w-5" />
                Storage Settings
              </h4>

              <div className="space-y-2">
                <Label htmlFor="cache-size">
                  Maximum Cache Size: {settings.maxCacheSize} MB
                </Label>
                <Slider
                  id="cache-size"
                  min={10}
                  max={500}
                  step={10}
                  value={[settings.maxCacheSize]}
                  onValueChange={(value) => handleChange('maxCacheSize', value[0])}
                />
                <p className="text-xs text-text-secondary">
                  Adjust how much storage can be used for offline data
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keep-data">Keep Offline Data</Label>
                <Select
                  value={settings.keepOfflineData.toString()}
                  onValueChange={(value) =>
                    handleChange('keepOfflineData', parseInt(value))
                  }
                >
                  <SelectTrigger id="keep-data">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-text-secondary">
                  How long to keep data cached offline
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">Status</h4>
              <ServiceWorkerStatus />
              <SyncStatus />
              <CacheManagement />
              <OfflineCapabilities />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
