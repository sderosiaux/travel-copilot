'use client'

import { Database, Trash2 } from 'lucide-react'
import { useOfflineStore } from '@/lib/store/offline-store'
import { Card, Button, Progress } from '@/components/ui'
import { useState } from 'react'

export function CacheManagement() {
  const cacheStats = useOfflineStore((state) => state.cacheStats)
  const clearCache = useOfflineStore((state) => state.clearCache)
  const isLoading = useOfflineStore((state) => state.isLoading)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleClearCache = async () => {
    await clearCache()
    setShowConfirm(false)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
          <Database className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            Cache Management
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            Manage offline cached data to free up storage space
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Storage Used</span>
                <span className="text-sm font-medium text-text-primary">
                  {cacheStats.totalSize} / {cacheStats.maxSize}
                </span>
              </div>
              <Progress value={cacheStats.usagePercentage} className="h-2" />
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-text-secondary">
                  {cacheStats.usagePercentage.toFixed(1)}% used
                </span>
                <span className="text-xs text-text-secondary">
                  {cacheStats.itemCount} items cached
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Last cleared
                </p>
                <p className="text-xs text-text-secondary">
                  {formatDate(cacheStats.lastCleared)}
                </p>
              </div>
              {showConfirm ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleClearCache}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Clearing...' : 'Confirm'}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
