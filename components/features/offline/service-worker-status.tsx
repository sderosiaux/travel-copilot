'use client'

import { Cloud, Check, X } from 'lucide-react'
import { useOfflineStore } from '@/lib/store/offline-store'
import { Card, Badge } from '@/components/ui'

export function ServiceWorkerStatus() {
  const serviceWorker = useOfflineStore((state) => state.serviceWorker)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-text-primary">
              Service Worker
            </h3>
            <Badge
              variant={serviceWorker.active ? 'default' : 'default'}
              className="flex items-center gap-1"
            >
              {serviceWorker.active ? (
                <>
                  <Check className="h-3 w-3" />
                  Active
                </>
              ) : (
                <>
                  <X className="h-3 w-3" />
                  Inactive
                </>
              )}
            </Badge>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            Background service for offline functionality
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-secondary mb-1">Registration</p>
              <p className="text-sm font-medium text-text-primary">
                {serviceWorker.registered ? 'Registered' : 'Not Registered'}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">Version</p>
              <p className="text-sm font-medium text-text-primary">
                {serviceWorker.version}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-text-secondary mb-1">Last Updated</p>
              <p className="text-sm font-medium text-text-primary">
                {formatDate(serviceWorker.lastUpdate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
