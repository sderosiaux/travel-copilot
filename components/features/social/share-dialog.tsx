'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  RadioGroup,
  RadioGroupItem,
  Label,
} from '@/components/ui'
import { SharePrivacy, SharePlatform } from '@/types/social'
import { Globe, Lock, Users, Share2 } from 'lucide-react'

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onShare: (platform: SharePlatform, privacy: SharePrivacy) => void
  title: string
}

export function ShareDialog({ open, onOpenChange, onShare, title }: ShareDialogProps) {
  const [privacy, setPrivacy] = useState<SharePrivacy>('friends')

  const platforms = [
    { id: 'twitter' as const, name: 'Twitter', icon: Share2 },
    { id: 'facebook' as const, name: 'Facebook', icon: Share2 },
    { id: 'whatsapp' as const, name: 'WhatsApp', icon: Share2 },
    { id: 'copy-link' as const, name: 'Copy Link', icon: Share2 },
  ]

  const handleShare = (platform: SharePlatform) => {
    onShare(platform, privacy)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">Privacy</Label>
            <RadioGroup value={privacy} onValueChange={(v) => setPrivacy(v as SharePrivacy)}>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <Globe className="w-4 h-4 text-text-secondary" />
                  <div>
                    <div className="font-medium">Public</div>
                    <div className="text-xs text-text-secondary">Anyone can see this</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                <RadioGroupItem value="friends" id="friends" />
                <Label htmlFor="friends" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <Users className="w-4 h-4 text-text-secondary" />
                  <div>
                    <div className="font-medium">Friends</div>
                    <div className="text-xs text-text-secondary">Only friends can see this</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <Lock className="w-4 h-4 text-text-secondary" />
                  <div>
                    <div className="font-medium">Private</div>
                    <div className="text-xs text-text-secondary">Only you can see this</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Share to</Label>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((platform) => (
                <Button
                  key={platform.id}
                  variant="secondary"
                  onClick={() => handleShare(platform.id)}
                  className="justify-start"
                >
                  <platform.icon className="w-4 h-4 mr-2" />
                  {platform.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
