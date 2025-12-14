// Offline Mode Types

export type SyncStatus = 'synced' | 'syncing' | 'pending' | 'failed' | 'offline'

export interface ServiceWorkerStatus {
  registered: boolean
  active: boolean
  lastUpdate: string | null
  version: string
}

export interface DataSync {
  id: string
  type: 'trips' | 'flights' | 'documents' | 'settings' | 'all'
  status: SyncStatus
  lastSync: string | null
  nextSync: string | null
  itemsCount: number
  size: string
  priority: 'low' | 'medium' | 'high'
}

export interface OfflineData {
  id: string
  type: string
  data: any
  cachedAt: string
  expiresAt: string
  size: number
}

export interface CacheStats {
  totalSize: string
  itemCount: number
  lastCleared: string | null
  maxSize: string
  usagePercentage: number
}

export interface OfflineCapability {
  id: string
  feature: string
  available: boolean
  requiresSync: boolean
  description: string
}

export interface OfflineSettings {
  enabled: boolean
  autoSync: boolean
  syncOnWifi: boolean
  syncInterval: number // minutes
  maxCacheSize: number // MB
  keepOfflineData: number // days
}
