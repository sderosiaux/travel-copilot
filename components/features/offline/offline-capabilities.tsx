'use client'

import { Check, X } from 'lucide-react'
import { Card } from '@/components/ui'
import { mockOfflineCapabilities } from '@/data/offline'

export function OfflineCapabilities() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-1">
        Offline Capabilities
      </h3>
      <p className="text-sm text-text-secondary mb-4">
        Features available when you're offline
      </p>

      <div className="space-y-3">
        {mockOfflineCapabilities.map((capability) => (
          <div
            key={capability.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-secondary transition-colors"
          >
            <div
              className={`mt-0.5 ${
                capability.available
                  ? 'text-success'
                  : 'text-text-tertiary'
              }`}
            >
              {capability.available ? (
                <Check className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm text-text-primary">
                  {capability.feature}
                </h4>
                {capability.requiresSync && (
                  <span className="text-xs text-text-tertiary">(requires sync)</span>
                )}
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                {capability.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
