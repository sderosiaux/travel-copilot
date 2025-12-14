'use client'

import { RefreshCw, Check, X, Cloud } from 'lucide-react'
import { useOfflineStore } from '@/lib/store/offline-store'
import { Card, Badge, Button, Progress } from '@/components/ui'
import type { SyncStatus as SyncStatusType } from '@/types/offline'

const STATUS_CONFIG: Record<
  SyncStatusType,
  { label: string; variant: 'default' | 'error' | 'default'; icon: any }
> = {
  synced: { label: 'Synced', variant: 'default', icon: Check },
  syncing: { label: 'Syncing...', variant: 'default', icon: RefreshCw },
  pending: { label: 'Pending', variant: 'default', icon: Cloud },
  failed: { label: 'Failed', variant: 'error', icon: X },
  offline: { label: 'Offline', variant: 'default', icon: X },
}

export function SyncStatus() {
  const dataSyncs = useOfflineStore((state) => state.dataSyncs)
  const isOnline = useOfflineStore((state) => state.isOnline)
  const syncData = useOfflineStore((state) => state.syncData)
  const syncAll = useOfflineStore((state) => state.syncAll)
  const isLoading = useOfflineStore((state) => state.isLoading)

  const formatTime = (dateString: string | null) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleSync = async (type: string) => {
    await syncData(type as any)
  }

  const handleSyncAll = async () => {
    await syncAll()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Data Sync Status</h3>
          <p className="text-sm text-text-secondary">
            Keep your data synchronized across devices
          </p>
        </div>
        <Button
          onClick={handleSyncAll}
          disabled={!isOnline || isLoading}
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Sync All
        </Button>
      </div>

      <div className="grid gap-3">
        {dataSyncs.map((sync) => {
          const config = STATUS_CONFIG[sync.status]
          const Icon = config.icon

          return (
            <Card key={sync.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-text-primary capitalize">
                      {sync.type}
                    </h4>
                    <Badge variant={config.variant} className="flex items-center gap-1">
                      <Icon
                        className={`h-3 w-3 ${
                          sync.status === 'syncing' ? 'animate-spin' : ''
                        }`}
                      />
                      {config.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>{sync.itemsCount} items</span>
                    <span>{sync.size}</span>
                    <span>Last sync: {formatTime(sync.lastSync)}</span>
                  </div>
                  {sync.status === 'syncing' && (
                    <Progress value={65} className="mt-2 h-1" />
                  )}
                </div>
                {sync.status !== 'syncing' && (
                  <Button
                    onClick={() => handleSync(sync.type)}
                    disabled={!isOnline}
                    variant="ghost"
                    size="sm"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
