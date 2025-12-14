'use client'

import { ShareSettings } from '@/types/social'
import { Card, CardContent, CardHeader, CardTitle, Switch, Label } from '@/components/ui'

interface PrivacySettingsProps {
  settings: ShareSettings
  onUpdate: (updates: Partial<ShareSettings>) => void
}

export function PrivacySettings({ settings, onUpdate }: PrivacySettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-achievements">Auto-share Achievements</Label>
            <p className="text-sm text-text-secondary">
              Automatically share when you unlock new achievements
            </p>
          </div>
          <Switch
            id="auto-achievements"
            checked={settings.autoShareAchievements}
            onCheckedChange={(checked) =>
              onUpdate({ autoShareAchievements: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-milestones">Auto-share Milestones</Label>
            <p className="text-sm text-text-secondary">
              Automatically share trip milestones and highlights
            </p>
          </div>
          <Switch
            id="auto-milestones"
            checked={settings.autoShareMilestones}
            onCheckedChange={(checked) =>
              onUpdate({ autoShareMilestones: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="watermark">Watermark</Label>
            <p className="text-sm text-text-secondary">
              Add Travel Copilot watermark to shared images
            </p>
          </div>
          <Switch
            id="watermark"
            checked={settings.watermarkEnabled}
            onCheckedChange={(checked) =>
              onUpdate({ watermarkEnabled: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="location">Include Location</Label>
            <p className="text-sm text-text-secondary">
              Show location information in shared content
            </p>
          </div>
          <Switch
            id="location"
            checked={settings.includeLocation}
            onCheckedChange={(checked) =>
              onUpdate({ includeLocation: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
